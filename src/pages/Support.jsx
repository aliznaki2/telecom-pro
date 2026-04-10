import React, { useState } from 'react';
import { ticketsData } from '../data/data';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import CustomModal from '../components/CustomModal';

const Support = () => {
  const [tickets, setTickets] = useState(ticketsData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ abonne: '', sujet: '', priorite: 'Moyenne', status: 'Ouvert', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDetail, setShowDetail] = useState(null);

  const totalOpen = tickets.filter(t => t.status === 'Ouvert').length;
  const totalInProgress = tickets.filter(t => t.status === 'En cours').length;
  const totalResolved = tickets.filter(t => t.status === 'Résolu').length;
  const totalHigh = tickets.filter(t => t.priorite === 'Haute').length;

  const filtered = tickets.filter(t => {
    const matchSearch = t.abonne.toLowerCase().includes(search.toLowerCase()) || t.sujet.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Tous' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setEditItem(null);
    setFormData({ abonne: '', sujet: '', priorite: 'Moyenne', status: 'Ouvert', description: '' });
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditItem(t);
    setFormData({ abonne: t.abonne, sujet: t.sujet, priorite: t.priorite, status: t.status, description: t.description || '' });
    setShowModal(true);
  };

  const saveItem = () => {
    if (!formData.abonne || !formData.sujet) return;
    if (editItem) {
      setTickets(tickets.map(t => t.id === editItem.id ? { ...t, ...formData } : t));
    } else {
      setTickets([...tickets, { id: Date.now(), ...formData, date: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const doDelete = () => { setTickets(tickets.filter(t => t.id !== deleteId)); setShowDeleteModal(false); };

  const statuses = ['Tous', 'Ouvert', 'En cours', 'Résolu'];


  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Support</h1>
        <p className="page-description">Gestion de {tickets.length} tickets de support</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard title="Tickets Ouverts" value={totalOpen} icon="fas fa-folder-open" color="blue" />
        <StatCard title="En Cours" value={totalInProgress} icon="fas fa-spinner" color="amber" />
        <StatCard title="Résolus" value={totalResolved} icon="fas fa-check-double" color="green" />
        <StatCard title="Priorité Haute" value={totalHigh} icon="fas fa-fire" color="rose" />
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Rechercher un ticket..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {statuses.map(s => (
            <button key={s} className={`filter-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary-gradient" onClick={openAdd}>
          <i className="fas fa-plus"></i> Nouveau Ticket
        </button>
      </div>

      <div className="panel">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Abonné</th>
                <th>Sujet</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{String(t.id).padStart(4, '0')}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.abonne}</td>
                  <td>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--accent-cyan)', fontWeight: 500 }}
                      onClick={() => setShowDetail(t)}
                    >
                      {t.sujet}
                    </span>
                  </td>
                  <td><StatusBadge status={t.priorite} /></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>{t.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-icon" onClick={() => setShowDetail(t)} title="Détails" style={{ color: 'var(--accent-cyan)' }}>
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon edit" onClick={() => openEdit(t)} title="Modifier">
                        <i className="fas fa-pen-to-square"></i>
                      </button>
                      <button className="btn-icon delete" onClick={() => confirmDelete(t.id)} title="Supprimer">
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7"><div className="empty-state"><i className="fas fa-headset"></i><p>Aucun ticket trouvé</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <CustomModal show={!!showDetail} onClose={() => setShowDetail(null)} title={showDetail ? `Ticket #${String(showDetail.id).padStart(4, '0')}` : ''}>
        {showDetail && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 16 }}>
              <div>
                <p className="form-label" style={{ margin: 0 }}>Abonné</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{showDetail.abonne}</p>
              </div>
              <div>
                <p className="form-label" style={{ margin: 0 }}>Date</p>
                <p style={{ color: 'var(--text-primary)' }}>{showDetail.date}</p>
              </div>
              <div>
                <p className="form-label" style={{ margin: 0 }}>Priorité</p>
                <StatusBadge status={showDetail.priorite} />
              </div>
              <div>
                <p className="form-label" style={{ margin: 0 }}>Statut</p>
                <StatusBadge status={showDetail.status} />
              </div>
            </div>
            <div>
              <p className="form-label">Sujet</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 12 }}>{showDetail.sujet}</p>
              <p className="form-label">Description</p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, background: 'var(--bg-glass)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {showDetail.description || 'Aucune description disponible.'}
              </p>
            </div>
          </div>
        )}
      </CustomModal>

      {/* Add/Edit Modal */}
      <CustomModal show={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Modifier le ticket' : 'Nouveau ticket'}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
            <button className="btn-primary-gradient" onClick={saveItem}>{editItem ? 'Sauvegarder' : 'Créer'}</button>
          </>
        }
      >
        <div className="form-field">
          <label className="form-label">Abonné</label>
          <input className="form-input" value={formData.abonne} onChange={e => setFormData({ ...formData, abonne: e.target.value })} placeholder="Nom de l'abonné" />
        </div>
        <div className="form-field">
          <label className="form-label">Sujet</label>
          <input className="form-input" value={formData.sujet} onChange={e => setFormData({ ...formData, sujet: e.target.value })} placeholder="Description du problème" />
        </div>
        <div className="form-field">
          <label className="form-label">Priorité</label>
          <select className="form-select" value={formData.priorite} onChange={e => setFormData({ ...formData, priorite: e.target.value })}>
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Statut</label>
          <select className="form-select" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
            <option>Ouvert</option>
            <option>En cours</option>
            <option>Résolu</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Détails du problème..."
            style={{ resize: 'vertical' }}
          />
        </div>
      </CustomModal>

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
          <h3>Supprimer ce ticket ?</h3>
          <p>Cette action est irréversible.</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Support;
