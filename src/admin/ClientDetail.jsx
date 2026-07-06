import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const ClientDetail = ({ client, onBack }) => {
  return (
    <div className="app-container animate-enter" style={{ padding: '1.5rem 1rem' }}>
      <button className="btn btn-secondary mb-4" onClick={onBack} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
        <ArrowLeft size={16} /> 戻る
      </button>

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

      <div className="glass-panel mb-4">
        <h3 style={{ marginBottom: '1.5rem' }}>スコア概要</h3>
        <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>総合スコア</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{client['総合スコア']} / 75</div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>緊急度スコア</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>{client['緊急度スコア']}</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3" style={{ fontSize: '0.875rem' }}>
          <div className="flex justify-between"><span>A. 環境・インフラ</span> <strong>{client['カテゴリA']}</strong></div>
          <div className="flex justify-between"><span>B. 業務フロー</span> <strong>{client['カテゴリB']}</strong></div>
          <div className="flex justify-between"><span>C. 属人化・スキル</span> <strong>{client['カテゴリC']}</strong></div>
          <div className="flex justify-between"><span>D. システム・IT</span> <strong>{client['カテゴリD']}</strong></div>
          <div className="flex justify-between"><span>E. マネジメント</span> <strong>{client['カテゴリE']}</strong></div>
        </div>
      </div>

      <div className="glass-panel mb-4" style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
        <h3 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertTriangle size={18} /> レッドフラグ
        </h3>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          {client['レッドフラグ'] || 'なし'}
        </p>
      </div>

      <div className="glass-panel mb-4">
        <h3 style={{ marginBottom: '1rem' }}>把握不足 (U) / クロスパターン</h3>
        <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Uフラグ:</strong> 
          {client['把握不足フラグ'] || 'なし'}
        </div>
        <div style={{ fontSize: '0.875rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>クロスパターン:</strong> 
          {client['クロスパターン'] || 'なし'}
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
        <div style={{ fontSize: '0.875rem', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>自由記述:</strong>
          {client['自由記述'] || 'なし'}
        </div>
        <div style={{ fontSize: '0.875rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <strong style={{ display: 'block', marginBottom: '1rem', fontSize: '1rem' }}>すべての回答詳細:</strong>
          <div className="flex flex-col gap-3">
            {client['全回答コード'] ? client['全回答コード'].split(' | ').map((ansStr, idx) => {
              const parts = ansStr.split(' => ');
              if (parts.length >= 2) {
                const questionPart = parts[0];
                const answerPart = parts.slice(1).join(' => '); // In case " => " exists in the answer text
                return (
                  <div key={idx} style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>{questionPart}</div>
                    <div style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>{answerPart}</div>
                  </div>
                );
              }
              return (
                <div key={idx} style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  {ansStr}
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
