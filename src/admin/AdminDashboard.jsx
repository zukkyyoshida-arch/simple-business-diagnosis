import React, { useEffect, useState } from 'react';
import { LogOut, RefreshCw, AlertCircle } from 'lucide-react';

const GAS_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbz1SMq2UNzN4RrJ5hGxvq3VRWzfa8XNfIsxOrDSVG6edpoepxZjPh8lGrRn7OKB539Mtw/exec";

const AdminDashboard = ({ token, onSelectClient, onLogout }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    const callbackName = 'gasCallback_' + Date.now();
    window[callbackName] = (json) => {
      if (json.status === 'success') {
        setData(json.data);
      } else {
        setError(json.message || 'データ取得に失敗しました。パスワードを確認してください。');
      }
      setLoading(false);
      delete window[callbackName];
      document.head.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = `${GAS_ENDPOINT_URL}?token=${encodeURIComponent(token)}&callback=${callbackName}`;
    script.onerror = () => {
      setError('通信エラーが発生しました');
      setLoading(false);
      delete window[callbackName];
      document.head.removeChild(script);
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className="app-container animate-enter" style={{ padding: '1.5rem 1rem' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Arino Shift mini 管理</h1>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={fetchData} style={{ padding: '0.5rem', width: 'auto' }}>
            <RefreshCw size={18} />
          </button>
          <button className="btn btn-secondary" onClick={onLogout} style={{ padding: '0.5rem', width: 'auto' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>読み込み中...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>データがありません</div>
          ) : (
            data.map(client => (
              <div 
                key={client.id} 
                className="glass-panel" 
                style={{ padding: '1rem', cursor: 'pointer', marginBottom: 0, transition: 'transform 0.2s' }}
                onClick={() => onSelectClient(client)}
              >
                <div className="flex justify-between items-start mb-2">
                  <strong style={{ fontSize: '1.1rem' }}>{client['会社名'] || '無記名'}</strong>
                  <span className="badge" style={{ margin: 0, background: client['緊急度スコア'] >= 15 ? '#fee2e2' : 'var(--background)', color: client['緊急度スコア'] >= 15 ? '#dc2626' : 'var(--text-main)' }}>
                    緊急度: {client['緊急度スコア']}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  担当: {client['氏名'] || '-'} / {client['業種']} / {client['従業員数']}
                </div>
                <div className="mt-2" style={{ fontSize: '0.875rem' }}>
                  優先領域: <strong>{client['最優先領域'] || '-'}</strong> ({client['最優先領域（症状）']})
                </div>
                <div className="mt-2 text-right" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(client['タイムスタンプ']).toLocaleString('ja-JP')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
