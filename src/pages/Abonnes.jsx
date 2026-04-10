import React, { useState } from 'react';
import { abonnesData, getInitials } from '../data/data';
import StatusBadge from '../components/StatusBadge';
import CustomModal from '../components/CustomModal';

const Abonnes = () => {
  const [abonnes, setAbonnes] = useState(abonnesData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', forfait: '', status: 'Actif' });

  const filtered = abonnes.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);
    const matchStatus = filterStatus === 'Tous' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setEditItem(null);
    setFormData({ name: '', email: '', phone: '', forfait: '', status: 'Actif' });
    setShowModal(true);
  };

  const openEdit = (a) => {
    setEditItem(a);
    setFormData({ name: a.name, email: a.email, phone: a.phone, forfait: a.forfait, status: a.status });
    setShowModal(true);
  };

  const saveItem = () => {
    if (!formData.name || !formData.email) return;
    if (editItem) {
      setAbonnes(abonnes.map(a => a.id === editItem.id ? { ...a, ...formData } : a));
    } else {
      setAbonnes([...abonnes, { id: Date.now(), ...formData, dateInscription: new Date().toISOString().split('T')[0], consommation: 0 }]);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const doDelete = () => {
    setAbonnes(abonnes.filter(a => a.id !== deleteId));
    setShowDeleteModal(false);
  };

  const statuses = ['Tous', 'Actif', 'Inactif', 'Suspendu'];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Abonnés</h1>
        <p className="page-description">Gérez vos {abonnes.length} clients</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Rechercher un abonné..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {statuses.map(s => (
            <button
              key={s}
              className={`filter-btn ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="btn-primary-gradient" onClick={openAdd}>
          <i className="fas fa-plus"></i> Ajouter
        </button>
      </div>

      <div className="panel">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Abonné</th>
                <th>Téléphone</th>
                <th>Forfait</th>
                <th>Statut</th>
                <th>Inscription</th>
                <th>Consommation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
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
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.forfait}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>{a.dateInscription}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        flex: 1, height: 6, background: 'rgba(255,255,255,0.06)',
                        borderRadius: '3px', overflow: 'hidden', minWidth: 60
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${a.consommation}%`,
                          background: a.consommation > 80 ? 'var(--accent-rose)' : a.consommation > 50 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: '32px' }}>{a.consommation}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-icon edit" onClick={() => openEdit(a)} title="Modifier">
                        <i className="fas fa-pen-to-square"></i>
                      </button>
                      <button className="btn-icon delete" onClick={() => confirmDelete(a.id)} title="Supprimer">
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <i className="fas fa-search"></i>
                      <p>Aucun abonné trouvé</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editItem ? 'Modifier l\'abonné' : 'Ajouter un abonné'}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
            <button className="btn-primary-gradient" onClick={saveItem}>
              {editItem ? 'Sauvegarder' : 'Ajouter'}
            </button>
          </>
        }
      >
        <div className="form-field">
          <label className="form-label">Nom complet</label>
          <input className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nom et prénom" />
        </div>
        <div className="form-field">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@exemple.com" />
        </div>
        <div className="form-field">
          <label className="form-label">Téléphone</label>
          <input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+212 6XX-XXX-XXX" />
        </div>
        <div className="form-field">
          <label className="form-label">Forfait</label>
          <input className="form-input" value={formData.forfait} onChange={e => setFormData({ ...formData, forfait: e.target.value })} placeholder="Forfait attribué" />
        </div>
        <div className="form-field">
          <label className="form-label">Statut</label>
          <select className="form-select" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
            <option>Actif</option>
            <option>Inactif</option>
            <option>Suspendu</option>
          </select>
        </div>
      </CustomModal>

      {/* Delete Confirmation */}
      <CustomModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
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
          <p>Cette action est irréversible. L'abonné sera définitivement supprimé.</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Abonnes;
