import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ClientDetail from './ClientDetail';

const GAS_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbz1SMq2UNzN4RrJ5hGxvq3VRWzfa8XNfIsxOrDSVG6edpoepxZjPh8lGrRn7OKB539Mtw/exec";

const ClientDetailWrapper = ({ data, onBack }) => {
  const { id } = useParams();
  const client = data.find(c => c.id.toString() === id);
  
  if (!client) {
    return (
      <div className="app-container" style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
        <p>データを読み込み中、または対象のデータが見つかりません。</p>
        <button className="btn btn-secondary mt-4" onClick={onBack} style={{ width: 'auto' }}>
          一覧に戻る
        </button>
      </div>
    );
  }
  
  return <ClientDetail client={client} onBack={onBack} />;
};

const AdminContainer = () => {
  const getStoredToken = () => {
    try { return localStorage.getItem('adminToken') || null; } catch (e) { return null; }
  };
  
  const [token, setToken] = useState(getStoredToken());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    try { localStorage.setItem('adminToken', newToken); } catch (e) {}
    setToken(newToken);
  };

  const handleLogout = () => {
    try { localStorage.removeItem('adminToken'); } catch (e) {}
    setToken(null);
    setData([]);
  };

  const fetchData = () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    const callbackName = 'gasCallback_' + Date.now();
    window[callbackName] = (json) => {
      if (json.status === 'success') {
        setData(json.data);
      } else {
        setError(json.message || 'データ取得に失敗しました。パスワードを確認してください。');
        if (json.message === 'Unauthorized') handleLogout();
      }
      setLoading(false);
      delete window[callbackName];
      const scriptEl = document.getElementById(callbackName);
      if (scriptEl) document.head.removeChild(scriptEl);
    };

    const script = document.createElement('script');
    script.id = callbackName;
    script.src = `${GAS_ENDPOINT_URL}?token=${encodeURIComponent(token)}&callback=${callbackName}`;
    script.onerror = () => {
      setError('通信エラーが発生しました');
      setLoading(false);
      delete window[callbackName];
      const scriptEl = document.getElementById(callbackName);
      if (scriptEl) document.head.removeChild(scriptEl);
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (token && data.length === 0) {
      fetchData();
    }
  }, [token]);

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const handleSelectClient = (client) => {
    navigate(`/admin/${client.id}`);
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <Routes>
      <Route index element={<AdminDashboard data={data} loading={loading} error={error} onRefresh={fetchData} onLogout={handleLogout} onSelectClient={handleSelectClient} />} />
      <Route path=":id" element={<ClientDetailWrapper data={data} onBack={handleBack} />} />
    </Routes>
  );
};

export default AdminContainer;
