import React from 'react';
import { ArrowLeft, AlertTriangle, Lightbulb } from 'lucide-react';
import { sections, CROSS_PATTERNS } from '../data/questions';

// 古い記号データからテキストを復元するためのルックアップ用関数
const getQuestionAndOptionText = (qId, codesStr) => {
  let qText = qId;
  let oTexts = codesStr;

  for (const section of sections) {
    const q = section.questions.find(q => q.id === qId);
    if (q) {
      qText = q.question;
      const codes = codesStr.split(',');
      const texts = codes.map(c => {
        const opt = q.options.find(o => o.code === c.trim());
        return opt ? `・${opt.text}` : `・${c}`;
      });
      oTexts = `\n${texts.join('\n')}`;
      break;
    }
  }
  return { qText, oTexts };
};

// フラグの翻訳関数（A1-1などを「A1: 質問 -> 回答」に変換）
const translateFlag = (flagCode) => {
  const match = flagCode.trim().match(/^([A-E]\d+)-([a-z0-9]+)$/i);
  if (!match) return flagCode;
  
  const qId = match[1];
  const optCode = match[2];
  
  for (const section of sections) {
    const q = section.questions.find(q => q.id === qId);
    if (q) {
      const opt = q.options.find(o => o.code === optCode);
      if (opt) {
        return `${qId}: ${q.question} \n  → ${opt.text}`;
      }
    }
  }
  return flagCode;
};

// クロスパターンの翻訳関数（P1などをタイトルと説明文に変換）
const translatePattern = (patternId) => {
  const pId = patternId.trim();
  const pattern = CROSS_PATTERNS.find(p => p.id === pId);
  if (pattern) {
    return `【${pattern.title}】 ${pattern.description}`;
  }
  return pId;
};

const parseAllAnswers = (rawAnswersStr) => {
  if (!rawAnswersStr) return [];
  const items = rawAnswersStr.split(' | ');
  
  return items.map(item => {
    const legacyMatch = item.match(/^([A-E]\d+)-\[(.*?)\](?: \(補足: (.*?)\))?$/);
    if (legacyMatch) {
      const qId = legacyMatch[1];
      const codes = legacyMatch[2];
      const note = legacyMatch[3] || null;
      const { qText, oTexts } = getQuestionAndOptionText(qId, codes);
      const options = oTexts.split('\n').map(s => s.trim().replace(/^・/, '')).filter(Boolean);
      return { question: `${qId}. ${qText}`, options, note, raw: item };
    }
    
    const parts = item.split(' => ');
    if (parts.length >= 2) {
      const questionPart = parts[0].trim();
      let answerPart = parts.slice(1).join(' => ');

      let note = null;
      const noteMatch = answerPart.match(/\n?\(補足: (.*?)\)$/);
      if (noteMatch) {
        note = noteMatch[1];
        answerPart = answerPart.replace(noteMatch[0], '');
      }

      let options = [];
      if (answerPart.includes('\n')) {
        options = answerPart.split('\n').map(s => s.trim().replace(/^・/, '')).filter(Boolean);
      } else {
        options = answerPart.split('、').map(s => s.trim().replace(/^・/, '')).filter(Boolean);
      }

      return { question: questionPart, options, note, raw: item };
    }

    return { question: null, options: [], note: null, raw: item };
  });
};

const generateInsight = (client) => {
  const score = client['総合スコア'] || 0;
  const urgency = client['緊急度スコア'] || 0;
  const priorityDomain = client['最優先領域'] || '';
  const prioritySymptom = client['最優先領域（症状）'] || '';
  const redFlags = client['レッドフラグ'] ? client['レッドフラグ'].split(',').map(s => s.trim()).filter(Boolean) : [];
  const uFlags = client['把握不足フラグ'] ? client['把握不足フラグ'].split(',').map(s => s.trim()).filter(Boolean) : [];
  const crossPatterns = client['クロスパターン'] ? client['クロスパターン'].split(',').map(s => s.trim()).filter(Boolean) : [];

  let evaluation = `総合スコアは 75点満点中 ${score}点（緊急度スコア: ${urgency}）です。`;
  if (urgency >= 15) {
    evaluation += ` 緊急度が非常に高く、業務体制に深刻なボトルネックが発生している可能性が高いです。`;
  } else if (urgency >= 10) {
    evaluation += ` 放置すると業務効率の悪化やミスの多発を招く課題が顕在化しつつあります。`;
  } else {
    evaluation += ` 致命的な状況ではないものの、生産性を高めるための改善余地が残されています。`;
  }

  let bottleneck = ``;
  if (prioritySymptom) {
    bottleneck += `データから読み取れる最も優先して着手すべき領域は「${prioritySymptom}」に関する課題です。`;
    if (priorityDomain) {
      bottleneck += `（特に「${priorityDomain}」の業務において顕著です）。`;
    }
  }

  let risks = [];
  if (redFlags.length > 0) {
    risks.push(`【致命的リスク】${redFlags.length}件のレッドフラグが検出されました。これらは即座に業務停止や属人化の限界を引き起こすリスクがあります。`);
  }
  if (uFlags.length > 0) {
    risks.push(`【実態のブラックボックス化】${uFlags.length}件の項目で「状況を把握していない」と回答されており、経営・管理者層と現場の実態に乖離がある（ブラックボックス化している）ことが懸念されます。`);
  }
  if (crossPatterns.length > 0) {
    risks.push(`【複合的課題】「${crossPatterns.join('」「')}」といった構造的な課題の兆候が見られます。`);
  }

  let recommendation = `まずは${prioritySymptom ? `最優先領域である「${prioritySymptom}」について現場のヒアリングを行い` : `特定された課題について深掘りし`}、`;
  if (redFlags.length > 0) {
    recommendation += `レッドフラグの解消に向けた具体的な改善策（ツールの導入や業務フローの再設計）を検討することを推奨します。`;
  } else if (uFlags.length > 0) {
    recommendation += `ブラックボックス化している業務の「可視化（棚卸し）」から着手することを推奨します。`;
  } else {
    recommendation += `小さな業務改善（スモールサクセス）を積み重ねていくことを推奨します。`;
  }

  return { evaluation, bottleneck, risks, recommendation };
};

const ClientDetail = ({ client, onBack }) => {
  const parsedAnswers = parseAllAnswers(client['全回答コード']);
  const insight = generateInsight(client);

  return (
    <div className="app-container animate-enter" style={{ padding: '1.5rem 1rem' }}>
      <div className="sticky-header">
        <button className="btn btn-secondary" onClick={onBack} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> 戻る
        </button>
      </div>

      <div className="glass-panel mb-4">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{client['会社名'] || '無記名'}</h2>
        <div className="flex flex-col gap-2" style={{ fontSize: '0.875rem' }}>
          <div><strong>氏名:</strong> {client['氏名'] || '-'}</div>
          <div><strong>メール:</strong> {client['メールアドレス'] || '-'}</div>
          <div><strong>業種:</strong> {client['業種'] || '-'}</div>
          <div><strong>従業員数:</strong> {client['従業員数'] || '-'}</div>
          <div><strong>立場:</strong> {client['回答者の立場'] || '-'}</div>
        </div>
      </div>

      {/* AI自動分析パネル */}
      <div className="glass-panel mb-4" style={{ borderColor: 'var(--primary)', background: 'rgba(14, 165, 233, 0.05)' }}>
        <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb size={18} /> {client['Ollama分析結果'] ? '詳細分析レポート' : '詳細分析レポート準備中'}
        </h3>
        
        {client['Ollama分析結果'] ? (
          <div style={{ fontSize: '0.875rem', lineHeight: '1.7', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
            {client['Ollama分析結果']}
          </div>
        ) : (
          <div style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', background: '#e0f2fe', padding: '0.5rem', borderRadius: '4px' }}>
              ※詳細レポートは現在生成処理中です。以下はスコアに基づく簡易レポートです。
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong>【総評】</strong><br/>{insight.evaluation} {insight.bottleneck}</p>
            {insight.risks.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>【特記事項・リスク】</strong>
                <ul style={{ paddingLeft: '1.25rem', margin: '0.25rem 0 0 0' }}>
                  {insight.risks.map((risk, idx) => <li key={idx} style={{ marginBottom: '0.25rem' }}>{risk}</li>)}
                </ul>
              </div>
            )}
            <p style={{ margin: 0 }}><strong>【推奨アクション】</strong><br/>{insight.recommendation}</p>
          </div>
        )}
      </div>

      <div className="glass-panel mb-4">
        <h3 style={{ marginBottom: '1.5rem' }}>スコア概要</h3>
        <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>総合スコア</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{client['総合スコア']} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>/ 75</span></div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>緊急度スコア</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>{client['緊急度スコア']}</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3" style={{ fontSize: '0.875rem' }}>
          <div className="flex justify-between"><span>A. 環境・インフラ</span> <strong>{client['カテゴリA']} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal'}}>/ 15</span></strong></div>
          <div className="flex justify-between"><span>B. 業務フロー</span> <strong>{client['カテゴリB']} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal'}}>/ 15</span></strong></div>
          <div className="flex justify-between"><span>C. 属人化・スキル</span> <strong>{client['カテゴリC']} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal'}}>/ 15</span></strong></div>
          <div className="flex justify-between"><span>D. システム・IT</span> <strong>{client['カテゴリD']} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal'}}>/ 15</span></strong></div>
          <div className="flex justify-between"><span>E. マネジメント</span> <strong>{client['カテゴリE']} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal'}}>/ 15</span></strong></div>
        </div>
      </div>

      <div className="glass-panel mb-4" style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
        <h3 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertTriangle size={18} /> レッドフラグ
        </h3>
        {client['レッドフラグ'] ? (
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#dc2626', fontSize: '0.875rem', lineHeight: '1.6' }}>
            {client['レッドフラグ'].split(',').map((flag, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>{translateFlag(flag)}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-muted)' }}>なし</p>
        )}
      </div>

      <div className="glass-panel mb-4">
        <h3 style={{ marginBottom: '1rem' }}>把握不足 (U) / クロスパターン</h3>
        
        <div style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Uフラグ（状況把握不足）:</strong>
          {client['把握不足フラグ'] ? (
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-muted)' }}>
              {client['把握不足フラグ'].split(',').map((flag, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>{translateFlag(flag)}</li>
              ))}
            </ul>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>なし</div>
          )}
        </div>
        
        <div style={{ fontSize: '0.875rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>クロスパターン:</strong>
          {client['クロスパターン'] ? (
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-muted)' }}>
              {client['クロスパターン'].split(',').map((pattern, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{translatePattern(pattern)}</li>
              ))}
            </ul>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>なし</div>
          )}
        </div>
      </div>

      <div className="glass-panel mb-8">
        <h3 style={{ marginBottom: '1rem' }}>定量・自由記述</h3>
        <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>月次締め日数:</strong> 
          {client['定例事務日数'] || '-'}
        </div>
        <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>探しもの時間:</strong> 
          {client['探しもの時間'] || '-'}
        </div>
        <div style={{ fontSize: '0.875rem', marginBottom: '1.5rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>自由記述:</strong>
          {client['自由記述'] || 'なし'}
        </div>
        
        <div style={{ fontSize: '0.875rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <strong style={{ display: 'block', marginBottom: '1rem', fontSize: '1rem' }}>すべての回答詳細:</strong>
          <div className="flex flex-col gap-4">
            {parsedAnswers.length > 0 ? parsedAnswers.map((ans, idx) => {
              if (ans.question && ans.options.length > 0) {
                return (
                  <div key={idx} style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      {ans.question}
                    </div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                      {ans.options.map((opt, oIdx) => (
                        <li key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                    {ans.note && (
                      <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <strong style={{ color: 'var(--text-main)' }}>補足:</strong> {ans.note}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={idx} style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  {ans.raw}
                </div>
              );
            }) : (
              <div style={{ color: 'var(--text-muted)' }}>回答データがありません</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
