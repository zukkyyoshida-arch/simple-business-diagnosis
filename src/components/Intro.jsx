import React from 'react';
import { ArrowRight, ClipboardCheck } from 'lucide-react';

const Intro = ({ onStart }) => {
  return (
    <div className="glass-panel animate-enter">
      <div className="text-center mb-4">
        <ClipboardCheck size={48} color="var(--primary)" style={{ margin: '0 auto' }} />
      </div>
      <h1 className="text-center">Arino Shift mini</h1>
      <p className="text-center" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>
        御社の業務、どこに手間が眠っているか。<br/>25問で棚卸しします。
      </p>

      <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--secondary)' }}>✓</span> 
            <span>所要時間は<strong>約7分</strong>。すべてタップで回答でき、文字入力はほぼ不要です</span>
          </li>
          <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--secondary)' }}>✓</span> 
            <span>正解はありません。よその会社と比べて格好をつける必要もありません。実態にいちばん近いものをお選びください</span>
          </li>
          <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--secondary)' }}>✓</span> 
            <span>「分からない」も立派な回答です。正直にお選びいただくほど、診断は正確になります</span>
          </li>
          <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--secondary)' }}>✓</span> 
            <span>結果は3営業日以内に、A4数ページの診断レポート（PDF）でメールにてお送りします</span>
          </li>
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)' }}>✓</span> 
            <strong style={{ color: 'var(--accent)' }}>営業のお電話はいたしません</strong>
          </li>
        </ul>
      </div>

      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem', padding: '1rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>無料である理由</p>
        <p style={{ margin: 0 }}>
          この診断は、当社の業務見える化サービスの入口として無料でご提供しています。 ご回答は匿名の統計データとして診断精度の向上に活用させていただきます。 診断レポートをご覧いただき、必要と感じた方にだけ、次のステップ（有料）をご案内します。 営業のお電話はいたしません。 ご連絡はレポート送付のメールのみです。
        </p>
      </div>

      <button className="btn btn-primary" onClick={onStart}>
        診断を始める <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Intro;
