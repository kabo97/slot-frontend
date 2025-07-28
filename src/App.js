// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import UserPage from './pages/User';
import ViewSlots from './pages/ViewSlot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/view-slots" element={<ViewSlots />} />
      </Routes>
    </Router>
  );
}

export default App;
