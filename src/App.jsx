import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiagnosisFlow from './DiagnosisFlow';
import AdminContainer from './admin/AdminContainer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiagnosisFlow />} />
        <Route path="/admin/*" element={<AdminContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
