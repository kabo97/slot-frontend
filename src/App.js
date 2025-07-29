import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import DeleteSlotsPage from './pages/DeleteSlots';
import UpdateSlotPage from './pages/UpdateSlot';
import ViewSlotsPage from './pages/ViewSlot';
import AddSlotPage from './pages/AddSlot';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />
        <Route path="/delete-slot" element={<ProtectedRoute adminOnly={true}><DeleteSlotsPage /></ProtectedRoute>} />
        <Route path="/view-slots" element={<ViewSlotsPage />} />
        <Route path="/update-slot" element={<ProtectedRoute adminOnly={true}><UpdateSlotPage /></ProtectedRoute>} />
        <Route path="/add-slot" element={<ProtectedRoute adminOnly={true}><AddSlotPage /></ProtectedRoute>} />    
      </Routes>
    </Router>
  );
}

export default App;
