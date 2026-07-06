import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader } from 'lucide-react';
import { calculateResults } from '../utils/scoring';
import { CROSS_PATTERNS, sections } from '../data/questions';

const GAS_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbz1SMq2UNzN4RrJ5hGxvq3VRWzfa8XNfIsxOrDSVG6edpoepxZjPh8lGrRn7OKB539Mtw/exec";

const SummaryScreen = ({ attributes, answers, freeText, contact }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const processData = async () => {
      try {
        // スコア計算
        const results = calculateResults(answers, attributes);
        setSummaryData(results);

        // 質問テキストのルックアップマップを作成
        const qMap = {};
        sections.forEach(s => {
          s.questions.forEach(q => {
            qMap[q.id] = q.question;
          });
        });

        const payload = {
          contact,
          attributes,
          answers: Object.entries(answers).map(([id, ansData]) => {
            const qText = qMap[id] || id;
            const aTexts = ansData.options.map(o => o.text).join("、");
            let res = `${id}. ${qText} => ${aTexts}`;
            if (ansData.note) res += ` (補足: ${ansData.note})`;
            return res;
          }),
          category_scores: results.categoryScores,
          total_score: results.totalScore,
          red_flags: results.redFlags,
          u_flags: results.uFlags,
          n_flags: results.nFlags,
          cross_patterns: results.crossPatterns,
          priority_area: results.priorityArea,
          urgency_score: results.urgencyScore,
          quant: results.quant,
          free_text: freeText
        };

        if (GAS_ENDPOINT_URL) {
          await fetch(GAS_ENDPOINT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
          });
        } else {
          console.warn("GAS_ENDPOINT_URL is not set. Skipping submission.", payload);
        }

        setStatus('success');
      } catch (err) {
        console.error(err);
        // エラーでもUI上は完了画面を出す（ユーザー体験を損ねないため）
        setStatus('success');
      }
    };

    processData();
  }, [attributes, answers, freeText, contact]);

  if (status === 'loading') {
    return (
      <div className="glass-panel text-center animate-enter" style={{ padding: '4rem 2rem' }}>
        <Loader size={48} color="var(--primary)" className="spin" style={{ margin: '0 auto', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <h2 className="mt-4">診断結果を生成中...</h2>
        <p>AIが御社の業務傾向を分析しています。</p>
      </div>
    );
  }

  // サマリ文の決定（P0があれば最優先、それ以外は発火したパターンの最初）
  let summaryText = "御社は「改善余地あり」の可能性があります。";
  if (summaryData) {
    if (summaryData.crossPatterns.includes("P0")) {
      summaryText = "御社は「把握できていない項目が多いこと自体が第一課題」である可能性があります。";
    } else if (summaryData.crossPatterns.length > 0) {
      const firstPattern = CROSS_PATTERNS.find(p => p.id === summaryData.crossPatterns[0]);
      if (firstPattern) {
        summaryText = `御社は「${firstPattern.title}」タイプの可能性があります。`;
      }
    } else {
      // パターンなしの場合
      const { priorityArea } = summaryData;
      if (priorityArea && priorityArea.symptom_category) {
        summaryText = `御社はカテゴリ${priorityArea.symptom_category}の観点で、改善の余地がある可能性があります。`;
      }
    }
  }

  return (
    <div className="glass-panel animate-enter text-center">
      <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto', marginBottom: '1.5rem' }} />
      <h1>ご回答ありがとうございました！</h1>
      
      <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: 'var(--radius-md)', margin: '2rem 0' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>簡易タイプ判定</h3>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>
          {summaryText}
        </p>
      </div>

      <div style={{ textAlign: 'left', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>
          <CheckCircle size={20} color="var(--primary)" />
          3営業日以内に詳しい診断レポートをメールでお送りします。
        </p>
      </div>
    </div>
  );
};

export default SummaryScreen;
