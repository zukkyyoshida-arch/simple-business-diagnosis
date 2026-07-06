import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'arino-admin') {
      onLogin(password);
    } else {
      setError('パスワードが正しくありません');
    }
  };

  return (
    <div className="app-container animate-enter" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-6">
          <Lock size={48} color="var(--primary)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <h2>管理画面ログイン</h2>
        </div>
        
        {error && (
          <div style={{ color: '#dc2626', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.875rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">パスワード</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="パスワードを入力してください"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
