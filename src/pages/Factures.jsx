import React, { useState } from 'react';
import { facturesData, formatCurrency } from '../data/data';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import CustomModal from '../components/CustomModal';

const Factures = () => {
  const [factures, setFactures] = useState(facturesData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ abonne: '', forfait: '', montant: '', status: 'Payé', methode: 'Carte bancaire' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const totalMontant = factures.reduce((s, f) => s + f.montant, 0);
  const totalPaye = factures.filter(f => f.status === 'Payé').reduce((s, f) => s + f.montant, 0);
  const totalImpaye = factures.filter(f => f.status === 'Impayé').reduce((s, f) => s + f.montant, 0);
  const totalAttente = factures.filter(f => f.status === 'En attente').reduce((s, f) => s + f.montant, 0);

  const filtered = factures.filter(f => {
    const matchSearch = f.abonne.toLowerCase().includes(search.toLowerCase()) || f.forfait.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Tous' || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openEdit = (f) => {
    setEditItem(f);
    setFormData({ abonne: f.abonne, forfait: f.forfait, montant: f.montant.toString(), status: f.status, methode: f.methode });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setFormData({ abonne: '', forfait: '', montant: '', status: 'Payé', methode: 'Carte bancaire' });
    setShowModal(true);
  };

  const saveItem = () => {
    if (!formData.abonne || !formData.montant) return;
    if (editItem) {
      setFactures(factures.map(f => f.id === editItem.id ? { ...f, ...formData, montant: Number(formData.montant) } : f));
    } else {
      setFactures([...factures, { id: Date.now(), ...formData, montant: Number(formData.montant), date: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const doDelete = () => { setFactures(factures.filter(f => f.id !== deleteId)); setShowDeleteModal(false); };

  const statuses = ['Tous', 'Payé', 'Impayé', 'En attente'];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Factures</h1>
        <p className="page-description">Suivi de {factures.length} factures</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard title="Total Facturé" value={`${totalMontant} DH`} icon="fas fa-receipt" color="cyan" />
        <StatCard title="Total Payé" value={`${totalPaye} DH`} icon="fas fa-check-circle" color="green" />
        <StatCard title="Total Impayé" value={`${totalImpaye} DH`} icon="fas fa-exclamation-circle" color="rose" />
        <StatCard title="En Attente" value={`${totalAttente} DH`} icon="fas fa-clock" color="amber" />
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Rechercher une facture..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {statuses.map(s => (
            <button key={s} className={`filter-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary-gradient" onClick={openAdd}>
          <i className="fas fa-plus"></i> Nouvelle Facture
        </button>
      </div>

      <div className="panel">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Abonné</th>
                <th>Forfait</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Méthode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{String(f.id).padStart(4, '0')}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{f.abonne}</td>
                  <td>{f.forfait}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{formatCurrency(f.montant)}</td>
                  <td><StatusBadge status={f.status} /></td>
                  <td>{f.date}</td>
                  <td>{f.methode}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-icon edit" onClick={() => openEdit(f)} title="Modifier">
                        <i className="fas fa-pen-to-square"></i>
                      </button>
                      <button className="btn-icon delete" onClick={() => confirmDelete(f.id)} title="Supprimer">
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8"><div className="empty-state"><i className="fas fa-file-invoice"></i><p>Aucune facture trouvée</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal show={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Modifier la facture' : 'Nouvelle facture'}
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
          <label className="form-label">Forfait</label>
          <input className="form-input" value={formData.forfait} onChange={e => setFormData({ ...formData, forfait: e.target.value })} placeholder="Forfait concerné" />
        </div>
        <div className="form-field">
          <label className="form-label">Montant (DH)</label>
          <input className="form-input" type="number" value={formData.montant} onChange={e => setFormData({ ...formData, montant: e.target.value })} placeholder="299" />
        </div>
        <div className="form-field">
          <label className="form-label">Statut</label>
          <select className="form-select" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
            <option>Payé</option>
            <option>Impayé</option>
            <option>En attente</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Méthode de paiement</label>
          <select className="form-select" value={formData.methode} onChange={e => setFormData({ ...formData, methode: e.target.value })}>
            <option>Carte bancaire</option>
            <option>Prélèvement</option>
            <option>Virement</option>
            <option>Espèces</option>
            <option>-</option>
          </select>
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
          <h3>Supprimer cette facture ?</h3>
          <p>Cette action est irréversible.</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Factures;
