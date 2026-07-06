import { sections, CROSS_PATTERNS } from '../data/questions';

/**
 * 回答データから各種スコア、フラグ、クロスパターンを計算する
 * @param {Object} rawAnswers { "A1": { options: [{code: "1", score: 3}, ...], note: "..." }, ... }
 * @param {Object} attributes { "industry": "製造", ... }
 */
export function calculateResults(rawAnswers, attributes) {
  let redFlags = [];
  let uFlags = [];
  let nFlags = [];
  let categoryScores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let rawScores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let questionScores = {}; // For cross pattern check

  let categoryDenominatorCount = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let categoryRFCount = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  // 1. 各設問のフラグ、素点集計
  sections.forEach(section => {
    const cat = section.id;
    section.questions.forEach(q => {
      const answerData = rawAnswers[q.id];
      if (!answerData || !answerData.options || answerData.options.length === 0) return;

      const options = answerData.options;

      // フラグの収集
      let hasN = false;
      options.forEach(opt => {
        if (opt.flag === "RF") {
          redFlags.push(`${q.id}-${opt.code}`);
          categoryRFCount[cat]++;
        }
        if (opt.flag === "U") {
          uFlags.push(`${q.id}-${opt.code}`);
        }
        if (opt.flag === "N") {
          nFlags.push(`${q.id}-${opt.code}`);
          hasN = true;
        }
      });

      // スコアの算出：選ばれた選択肢のうち「最も悪い（低い）スコア」を採用する
      let minScore = Infinity;
      options.forEach(opt => {
        if (opt.score !== null && opt.score !== undefined) {
          if (opt.score < minScore) {
            minScore = opt.score;
          }
        }
      });

      if (minScore === Infinity) {
        minScore = 0; // null のみの場合は0として扱う（ただしNやE5の場合は後続で除外される）
      }

      questionScores[q.id] = minScore;

      // E5は配点対象外。それ以外でN回答を含まないなら分母にカウント
      if (q.id !== "E5" && !hasN) {
        categoryDenominatorCount[cat]++;
        rawScores[cat] += minScore;
      }
    });
  });

  // 2. カテゴリスコアの正規化（15点満点）
  // round( 素点合計 ÷ (配点対象設問数 × 3) × 15 )
  ['A', 'B', 'C', 'D', 'E'].forEach(cat => {
    if (categoryDenominatorCount[cat] > 0) {
      categoryScores[cat] = Math.round((rawScores[cat] / (categoryDenominatorCount[cat] * 3)) * 15);
    } else {
      categoryScores[cat] = 0;
    }
  });

  // 総合スコア
  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);

  // 3. クロスパターン判定
  const conditionState = {
    uFlags: uFlags.length,
    scores: questionScores
  };
  
  let crossPatterns = [];
  CROSS_PATTERNS.forEach(pattern => {
    if (pattern.condition(conditionState)) {
      crossPatterns.push(pattern.id);
    }
  });

  // 4. 最優先領域の決定
  // E5は複数選択可のため、テキストをカンマ区切りで結合
  const e5Answer = rawAnswers["E5"] 
    ? rawAnswers["E5"].options.map(o => o.text).join("、")
    : "";
  
  // 同点時の優先度 (2) 経営インパクト順 C→A→D→B→E
  const impactOrder = ['C', 'A', 'D', 'B', 'E'];
  
  let lowestCategory = 'A';
  let minCatScore = 999;
  
  ['A', 'B', 'C', 'D', 'E'].forEach(cat => {
    if (categoryScores[cat] < minCatScore) {
      minCatScore = categoryScores[cat];
      lowestCategory = cat;
    } else if (categoryScores[cat] === minCatScore) {
      // (1) RF数が多い方
      if (categoryRFCount[cat] > categoryRFCount[lowestCategory]) {
        lowestCategory = cat;
      } else if (categoryRFCount[cat] === categoryRFCount[lowestCategory]) {
        // (2) インパクト順
        if (impactOrder.indexOf(cat) < impactOrder.indexOf(lowestCategory)) {
          lowestCategory = cat;
        }
      }
    }
  });

  const priorityArea = {
    domain: e5Answer,
    symptom_category: lowestCategory
  };

  // 5. 緊急度スコア
  // 緊急度 = (3 − E4素点) × 2 + min(RF数, 10) + min(U数, 4)
  // E4がU回答を含む場合は素点0として扱う
  const e4HasU = rawAnswers["E4"] && rawAnswers["E4"].options.some(o => o.flag === "U");
  const e4Score = e4HasU ? 0 : (questionScores["E4"] || 0);
  const urgencyScore = ((3 - e4Score) * 2) + Math.min(redFlags.length, 10) + Math.min(uFlags.length, 4);

  // 定量データの抽出 (C5, D3)
  const quant = {
    C5_monthly_closing_days: rawAnswers["C5"] ? rawAnswers["C5"].options.map(o => o.text).join("、") : "",
    D3_search_min_per_day: rawAnswers["D3"] ? rawAnswers["D3"].options.map(o => o.text).join("、") : ""
  };

  return {
    categoryScores,
    totalScore,
    redFlags,
    uFlags,
    nFlags,
    crossPatterns,
    priorityArea,
    urgencyScore,
    quant
  };
}
