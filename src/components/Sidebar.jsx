import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/telecom-logo.png';

const navItems = [
  { label: 'PRINCIPAL', type: 'section' },
  { path: '/', icon: 'fas fa-chart-pie', label: 'Dashboard' },
  { path: '/abonnes', icon: 'fas fa-users', label: 'Abonnés' },
  { path: '/forfaits', icon: 'fas fa-sim-card', label: 'Forfaits' },
  { label: 'GESTION', type: 'section' },
  { path: '/factures', icon: 'fas fa-file-invoice-dollar', label: 'Factures' },
  { path: '/support', icon: 'fas fa-headset', label: 'Support' },
  { path: '/admin', icon: 'fas fa-shield-halved', label: 'Administration' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src={logo} alt="TelecomPro Logo" />
          <h1>TelecomPro</h1>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            if (item.type === 'section') {
              return <div key={idx} className="sidebar-section-title">{item.label}</div>;
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
                onClick={onClose}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleLogout} title="Déconnexion">
            <div className="sidebar-user-avatar">AZ</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Administrateur</div>
            </div>
            <i className="fas fa-right-from-bracket" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}></i>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
