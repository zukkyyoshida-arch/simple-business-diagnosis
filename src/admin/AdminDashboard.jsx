import React, { useState, useMemo } from 'react';
import { LogOut, RefreshCw, AlertCircle, Search, Download } from 'lucide-react';

const AdminDashboard = ({ data, loading, error, onRefresh, onLogout, onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;
    if (searchTerm) {
      filtered = data.filter(client => 
        (client['会社名'] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'urgency_desc') {
        const urgA = parseInt(a['緊急度スコア']) || 0;
        const urgB = parseInt(b['緊急度スコア']) || 0;
        if (urgA !== urgB) return urgB - urgA;
      }
      return new Date(b['タイムスタンプ']) - new Date(a['タイムスタンプ']);
    });
  }, [data, searchTerm, sortBy]);

  const handleExportCSV = () => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).filter(k => k !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${(row[h] || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `arino_diagnosis_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = (score) => {
    if (score >= 15) return { bg: '#fee2e2', text: '#dc2626', label: '高' };
    if (score >= 10) return { bg: '#fef3c7', text: '#d97706', label: '中' };
    return { bg: '#dcfce3', text: '#16a34a', label: '低' };
  };

  return (
    <div className="app-container animate-enter" style={{ padding: '1.5rem 1rem' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>管理 | Arino Shift mini</h1>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={handleExportCSV} style={{ padding: '0.5rem', width: 'auto' }} aria-label="CSV出力" title="CSV出力">
            <Download size={18} />
          </button>
          <button className="btn btn-secondary" onClick={onRefresh} style={{ padding: '0.5rem', width: 'auto' }} aria-label="更新" title="更新" disabled={loading}>
            <RefreshCw size={18} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </button>
          <button className="btn btn-secondary" onClick={onLogout} style={{ padding: '0.5rem', width: 'auto' }} aria-label="ログアウト" title="ログアウト">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="glass-panel mb-4" style={{ padding: '1rem' }}>
        <div className="flex flex-col gap-3">
          <div className="input-group" style={{ margin: 0 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="会社名で検索..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              全 {filteredAndSortedData.length} 件
            </div>
            <select 
              className="input-field" 
              style={{ width: 'auto', padding: '0.5rem', fontSize: '0.875rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date_desc">新着順</option>
              <option value="urgency_desc">緊急度順</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {!loading && data.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>まだ診断結果がありません</div>
        ) : filteredAndSortedData.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>該当するデータが見つかりません</div>
        ) : (
          filteredAndSortedData.map(client => {
            const urgency = getUrgencyColor(client['緊急度スコア']);
            return (
              <button 
                key={client.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1rem', 
                  cursor: 'pointer', 
                  marginBottom: 0, 
                  transition: 'transform 0.2s',
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid var(--border)'
                }}
                onClick={() => onSelectClient(client)}
                aria-label={`${client['会社名']}の詳細を開く`}
              >
                <div className="flex justify-between items-start mb-2">
                  <strong style={{ fontSize: '1.1rem' }}>{client['会社名'] || '無記名'}</strong>
                  <span className="badge" style={{ margin: 0, background: urgency.bg, color: urgency.text }}>
                    緊急度: {urgency.label} ({client['緊急度スコア']})
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  担当: {client['氏名'] || '-'} / {client['業種']} / {client['従業員数']}
                </div>
                <div className="mt-2" style={{ fontSize: '0.875rem' }}>
                  優先領域: <strong>{client['最優先領域'] || '-'}</strong> ({client['最優先領域（症状）']})
                </div>
                <div className="mt-2 text-right" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {formatDate(client['タイムスタンプ'])}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
