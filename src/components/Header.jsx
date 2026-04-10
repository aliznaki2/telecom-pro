import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Vue d\'ensemble de votre activité' },
  '/abonnes': { title: 'Abonnés', subtitle: 'Gérez vos clients et abonnements' },
  '/forfaits': { title: 'Forfaits', subtitle: 'Catalogue des offres disponibles' },
  '/factures': { title: 'Factures', subtitle: 'Suivi de facturation et paiements' },
  '/support': { title: 'Support', subtitle: 'Tickets et assistance technique' },
  '/admin': { title: 'Administration', subtitle: 'Gestion complète du système' },
};

const notificationsData = [
  { id: 1, icon: 'fas fa-user-plus', color: 'var(--accent-cyan)', text: 'Nouvel abonné : Leila Chraibi', time: 'Il y a 2h', read: false },
  { id: 2, icon: 'fas fa-check-circle', color: 'var(--accent-emerald)', text: 'Paiement reçu — Ali Znaki (299 DH)', time: 'Il y a 3h', read: false },
  { id: 3, icon: 'fas fa-exclamation-triangle', color: 'var(--accent-amber)', text: 'Facture impayée — Fatima Zahra', time: 'Il y a 5h', read: false },
  { id: 4, icon: 'fas fa-ticket', color: 'var(--accent-violet)', text: 'Nouveau ticket support #0005', time: 'Il y a 8h', read: true },
  { id: 5, icon: 'fas fa-sim-card', color: 'var(--accent-blue)', text: 'Forfait "Triple Play" mis à jour', time: 'Il y a 12h', read: true },
];

const messagesData = [
  { id: 1, sender: 'Ali Znaki', avatar: 'AZ', text: 'Bonjour, j\'ai un problème avec ma connexion...', time: 'Il y a 15 min', read: false },
  { id: 2, sender: 'Sara Benali', avatar: 'SB', text: 'Merci pour la résolution rapide !', time: 'Il y a 1h', read: false },
  { id: 3, sender: 'Omar Fassi', avatar: 'OF', text: 'Quand sera résolu mon ticket ?', time: 'Il y a 3h', read: true },
  { id: 4, sender: 'Karim Idrissi', avatar: 'KI', text: 'Je souhaite changer mon forfait...', time: 'Il y a 6h', read: true },
];

const Header = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const page = pageTitles[location.pathname] || { title: 'TelecomPro', subtitle: '' };

  const [openDropdown, setOpenDropdown] = useState(null);
  const [notifications, setNotifications] = useState(notificationsData);
  const [messages, setMessages] = useState(messagesData);
  const dropdownRef = useRef(null);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMsgs = messages.filter(m => !m.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const markAllNotifsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAllMsgsRead = () => {
    setMessages(messages.map(m => ({ ...m, read: true })));
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-toggle" onClick={onToggleSidebar} style={{ display: 'none' }}>
          <i className="fas fa-bars"></i>
        </button>
        <div>
          <h1 className="header-title">{page.title}</h1>
          <p className="header-subtitle">{page.subtitle}</p>
        </div>
      </div>

      <div className="header-search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Rechercher un abonné, forfait, ticket..." />
      </div>

      <div className="header-right" ref={dropdownRef}>

        {/* --- Notifications --- */}
        <div className="header-dropdown-wrapper">
          <button
            className={`header-icon-btn ${openDropdown === 'notifs' ? 'active' : ''}`}
            title="Notifications"
            onClick={() => toggleDropdown('notifs')}
          >
            <i className="fas fa-bell"></i>
            {unreadNotifs > 0 && <span className="badge-dot"></span>}
          </button>

          {openDropdown === 'notifs' && (
            <div className="header-dropdown">
              <div className="header-dropdown-head">
                <h4>Notifications</h4>
                {unreadNotifs > 0 && (
                  <button className="header-dropdown-action" onClick={markAllNotifsRead}>
                    Tout marquer lu
                  </button>
                )}
              </div>
              <div className="header-dropdown-body">
                {notifications.map(n => (
                  <div key={n.id} className={`header-dropdown-item ${!n.read ? 'unread' : ''}`}>
                    <div className="header-dropdown-item-icon" style={{ color: n.color, background: `${n.color}15` }}>
                      <i className={n.icon}></i>
                    </div>
                    <div className="header-dropdown-item-content">
                      <p className="header-dropdown-item-text">{n.text}</p>
                      <span className="header-dropdown-item-time">{n.time}</span>
                    </div>
                    {!n.read && <span className="header-dropdown-unread-dot"></span>}
                  </div>
                ))}
              </div>
              <div className="header-dropdown-foot" onClick={() => { setOpenDropdown(null); navigate('/support'); }}>
                Voir toutes les notifications
              </div>
            </div>
          )}
        </div>

        {/* --- Messages --- */}
        <div className="header-dropdown-wrapper">
          <button
            className={`header-icon-btn ${openDropdown === 'msgs' ? 'active' : ''}`}
            title="Messages"
            onClick={() => toggleDropdown('msgs')}
          >
            <i className="fas fa-envelope"></i>
            {unreadMsgs > 0 && <span className="badge-dot"></span>}
          </button>

          {openDropdown === 'msgs' && (
            <div className="header-dropdown">
              <div className="header-dropdown-head">
                <h4>Messages</h4>
                {unreadMsgs > 0 && (
                  <button className="header-dropdown-action" onClick={markAllMsgsRead}>
                    Tout marquer lu
                  </button>
                )}
              </div>
              <div className="header-dropdown-body">
                {messages.map(m => (
                  <div key={m.id} className={`header-dropdown-item ${!m.read ? 'unread' : ''}`}>
                    <div className="header-dropdown-msg-avatar">{m.avatar}</div>
                    <div className="header-dropdown-item-content">
                      <p className="header-dropdown-item-text">
                        <strong>{m.sender}</strong>
                      </p>
                      <p className="header-dropdown-msg-preview">{m.text}</p>
                      <span className="header-dropdown-item-time">{m.time}</span>
                    </div>
                    {!m.read && <span className="header-dropdown-unread-dot"></span>}
                  </div>
                ))}
              </div>
              <div className="header-dropdown-foot" onClick={() => { setOpenDropdown(null); navigate('/support'); }}>
                Voir tous les messages
              </div>
            </div>
          )}
        </div>

        {/* --- Settings --- */}
        <div className="header-dropdown-wrapper">
          <button
            className={`header-icon-btn ${openDropdown === 'settings' ? 'active' : ''}`}
            title="Paramètres"
            onClick={() => toggleDropdown('settings')}
          >
            <i className="fas fa-gear"></i>
          </button>

          {openDropdown === 'settings' && (
            <div className="header-dropdown" style={{ minWidth: '220px' }}>
              <div className="header-dropdown-head">
                <h4>Paramètres</h4>
              </div>
              <div className="header-dropdown-body" style={{ padding: 0 }}>
                <div className="header-dropdown-menu-item" onClick={() => { setOpenDropdown(null); navigate('/admin'); }}>
                  <i className="fas fa-shield-halved"></i>
                  <span>Administration</span>
                </div>
                <div className="header-dropdown-menu-item" onClick={() => { setOpenDropdown(null); }}>
                  <i className="fas fa-user-circle"></i>
                  <span>Mon Profil</span>
                </div>
                <div className="header-dropdown-menu-item" onClick={() => { setOpenDropdown(null); }}>
                  <i className="fas fa-palette"></i>
                  <span>Apparence</span>
                </div>
                <div className="header-dropdown-menu-item" onClick={() => { setOpenDropdown(null); }}>
                  <i className="fas fa-bell"></i>
                  <span>Préférences de notif.</span>
                </div>
                <div className="header-dropdown-menu-item" onClick={() => { setOpenDropdown(null); }}>
                  <i className="fas fa-database"></i>
                  <span>Exporter les données</span>
                </div>
                <div className="header-dropdown-separator"></div>
                <div
                  className="header-dropdown-menu-item danger"
                  onClick={() => { localStorage.removeItem('user'); navigate('/login'); setOpenDropdown(null); }}
                >
                  <i className="fas fa-right-from-bracket"></i>
                  <span>Déconnexion</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
