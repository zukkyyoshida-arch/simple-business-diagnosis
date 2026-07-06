import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ClientDetail from './ClientDetail';

const AdminContainer = () => {
  const [token, setToken] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  if (selectedClient) {
    return <ClientDetail client={selectedClient} onBack={() => setSelectedClient(null)} />;
  }

  return <AdminDashboard token={token} onSelectClient={setSelectedClient} onLogout={() => setToken(null)} />;
};

export default AdminContainer;
