import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Abonnes from './pages/Abonnes';
import Forfaits from './pages/Forfaits';
import Factures from './pages/Factures';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Composant qui protège les routes — redirige vers /login si pas connecté
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  // Pages Login / Signup — aucune protection
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  // Toutes les autres pages — protégées
  return (
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-wrapper">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/abonnes" element={<Abonnes />} />
              <Route path="/forfaits" element={<Forfaits />} />
              <Route path="/factures" element={<Factures />} />
              <Route path="/support" element={<Support />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ position: 'fixed', top: 18, left: 18, zIndex: 1001 }}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
