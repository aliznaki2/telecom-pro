import React, { useState } from 'react';
import { abonnesData, forfaitsData, facturesData, ticketsData, getInitials, formatCurrency } from '../data/data';
import StatusBadge from '../components/StatusBadge';
import CustomModal from '../components/CustomModal';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('abonnes');
  const [abonnes, setAbonnes] = useState(abonnesData);
  const [forfaits, setForfaits] = useState(forfaitsData);
  const [factures, setFactures] = useState(facturesData);
  const [tickets, setTickets] = useState(ticketsData);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, type: '' });

  const tabs = [
    { key: 'abonnes', label: 'Abonnés', icon: 'fas fa-users', count: abonnes.length },
    { key: 'forfaits', label: 'Forfaits', icon: 'fas fa-sim-card', count: forfaits.length },
    { key: 'factures', label: 'Factures', icon: 'fas fa-file-invoice', count: factures.length },
    { key: 'tickets', label: 'Support', icon: 'fas fa-headset', count: tickets.length },
  ];

  const confirmDelete = (id, type) => {
    setDeleteTarget({ id, type });
    setShowDeleteModal(true);
  };

  const doDelete = () => {
    const { id, type } = deleteTarget;
    switch (type) {
      case 'abonnes': setAbonnes(abonnes.filter(a => a.id !== id)); break;
      case 'forfaits': setForfaits(forfaits.filter(f => f.id !== id)); break;
      case 'factures': setFactures(factures.filter(f => f.id !== id)); break;
      case 'tickets': setTickets(tickets.filter(t => t.id !== id)); break;
      default: break;
    }
    setShowDeleteModal(false);
  };

  const filterBySearch = (items, fields) => {
    if (!search) return items;
    return items.filter(item =>
      fields.some(f => item[f]?.toString().toLowerCase().includes(search.toLowerCase()))
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Administration</h1>
        <p className="page-description">Gestion complète de toutes les données</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-row">
        <div className="admin-stat">
          <div className="admin-stat-value" style={{ color: 'var(--accent-cyan)' }}>{abonnes.length}</div>
          <div className="admin-stat-label">Abonnés</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value" style={{ color: 'var(--accent-violet)' }}>{forfaits.length}</div>
          <div className="admin-stat-label">Forfaits</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value" style={{ color: 'var(--accent-emerald)' }}>{factures.length}</div>
          <div className="admin-stat-label">Factures</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-value" style={{ color: 'var(--accent-amber)' }}>{tickets.length}</div>
          <div className="admin-stat-label">Tickets</div>
        </div>
      </div>

      {/* Search */}
      <div className="toolbar" style={{ marginBottom: 8 }}>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Rechercher dans toutes les données..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Tabs */}
      <div className="custom-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`custom-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            <i className={t.icon} style={{ marginRight: 6 }}></i>
            {t.label}
            <span className="tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="panel">
        {/* Abonnés Tab */}
        {activeTab === 'abonnes' && (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>Abonné</th><th>Téléphone</th><th>Forfait</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {filterBySearch(abonnes, ['name', 'email', 'phone']).map(a => (
                  <tr key={a.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-cell-avatar">{getInitials(a.name)}</div>
                        <div className="user-cell-info">
                          <span className="user-cell-name">{a.name}</span>
                          <span className="user-cell-email">{a.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{a.phone}</td>
                    <td>{a.forfait}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <button className="btn-icon delete" onClick={() => confirmDelete(a.id, 'abonnes')} title="Supprimer"><i className="fas fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Forfaits Tab */}
        {activeTab === 'forfaits' && (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>Forfait</th><th>Catégorie</th><th>Prix</th><th>Abonnés</th><th>Actions</th></tr></thead>
              <tbody>
                {filterBySearch(forfaits, ['name', 'category']).map(f => (
                  <tr key={f.id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      <i className={f.icon} style={{ marginRight: 10, color: 'var(--accent-cyan)' }}></i>{f.name}
                    </td>
                    <td><span className={`forfait-category ${f.category}`}>{f.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(f.price)}/mois</td>
                    <td>{f.abonnes}</td>
                    <td>
                      <button className="btn-icon delete" onClick={() => confirmDelete(f.id, 'forfaits')} title="Supprimer"><i className="fas fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Factures Tab */}
        {activeTab === 'factures' && (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Abonné</th><th>Forfait</th><th>Montant</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filterBySearch(factures, ['abonne', 'forfait']).map(f => (
                  <tr key={f.id}>
                    <td style={{ color: 'var(--text-muted)' }}>#{String(f.id).padStart(4, '0')}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{f.abonne}</td>
                    <td>{f.forfait}</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(f.montant)}</td>
                    <td><StatusBadge status={f.status} /></td>
                    <td>{f.date}</td>
                    <td>
                      <button className="btn-icon delete" onClick={() => confirmDelete(f.id, 'factures')} title="Supprimer"><i className="fas fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Abonné</th><th>Sujet</th><th>Priorité</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filterBySearch(tickets, ['abonne', 'sujet']).map(t => (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--text-muted)' }}>#{String(t.id).padStart(4, '0')}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.abonne}</td>
                    <td>{t.sujet}</td>
                    <td><StatusBadge status={t.priorite} /></td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>{t.date}</td>
                    <td>
                      <button className="btn-icon delete" onClick={() => confirmDelete(t.id, 'tickets')} title="Supprimer"><i className="fas fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirmer la suppression"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowDeleteModal(false)}>Annuler</button>
            <button className="btn-primary-gradient" style={{ background: 'var(--gradient-danger)' }} onClick={doDelete}>Supprimer</button>
          </>
        }
      >
        <div className="confirm-dialog">
          <i className="fas fa-triangle-exclamation"></i>
          <h3>Êtes-vous sûr ?</h3>
          <p>Cet élément sera définitivement supprimé.</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Admin;
