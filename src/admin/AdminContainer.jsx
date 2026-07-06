import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import ClientDetail from './ClientDetail';

const AdminContainer = () => {
  // ログイン画面をスキップするため、直接固定トークンをセット
  const token = 'arino-admin';
  const [selectedClient, setSelectedClient] = useState(null);

  if (selectedClient) {
    return <ClientDetail client={selectedClient} onBack={() => setSelectedClient(null)} />;
  }

  return <AdminDashboard token={token} onSelectClient={setSelectedClient} />;
};

export default AdminContainer;
