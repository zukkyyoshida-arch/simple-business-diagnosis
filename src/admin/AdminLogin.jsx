import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass-panel animate-enter" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-6">
          <Lock size={40} color="var(--primary)" style={{ margin: '0 auto' }} />
        </div>
        <h2 className="text-center mb-6">管理画面ログイン</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input-field"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary mt-4">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
