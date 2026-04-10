import React, { useState } from 'react';
import { forfaitsData, formatCurrency } from '../data/data';
import CustomModal from '../components/CustomModal';

const categoryColors = {
  internet: 'cyan',
  mobile: 'violet',
  tv: 'amber',
  bundle: 'green',
};

const Forfaits = () => {
  const [forfaits, setForfaits] = useState(forfaitsData);
  const [filterCat, setFilterCat] = useState('Tous');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'internet', features: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const categories = ['Tous', 'internet', 'mobile', 'tv', 'bundle'];
  const categoryLabels = { Tous: 'Tous', internet: 'Internet', mobile: 'Mobile', tv: 'TV', bundle: 'Bundle' };

  const filtered = forfaits.filter(f => filterCat === 'Tous' || f.category === filterCat);

  const openAdd = () => {
    setEditItem(null);
    setFormData({ name: '', price: '', category: 'internet', features: '' });
    setShowModal(true);
  };

  const openEdit = (f) => {
    setEditItem(f);
    setFormData({ name: f.name, price: f.price.toString(), category: f.category, features: f.features.join('\n') });
    setShowModal(true);
  };

  const saveItem = () => {
    if (!formData.name || !formData.price) return;
    const features = formData.features.split('\n').filter(f => f.trim());
    if (editItem) {
      setForfaits(forfaits.map(f => f.id === editItem.id
        ? { ...f, name: formData.name, price: Number(formData.price), category: formData.category, features }
        : f));
    } else {
      setForfaits([...forfaits, {
        id: Date.now(), name: formData.name, price: Number(formData.price),
        category: formData.category, features, icon: 'fas fa-sim-card',
        popular: false, abonnes: 0,
      }]);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const doDelete = () => { setForfaits(forfaits.filter(f => f.id !== deleteId)); setShowDeleteModal(false); };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Forfaits</h1>
        <p className="page-description">Catalogue de {forfaits.length} offres disponibles</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${filterCat === c ? 'active' : ''}`} onClick={() => setFilterCat(c)}>
              {categoryLabels[c]}
            </button>
          ))}
        </div>
        <button className="btn-primary-gradient" onClick={openAdd}>
          <i className="fas fa-plus"></i> Nouveau Forfait
        </button>
      </div>

      <div className="forfait-grid">
        {filtered.map(f => (
          <div key={f.id} className={`forfait-card ${f.popular ? 'popular' : ''}`}>
            <span className={`forfait-category ${f.category}`}>
              {categoryLabels[f.category]}
            </span>
            <div className="forfait-icon" style={{ background: `var(--gradient-${categoryColors[f.category] === 'cyan' ? 'primary' : categoryColors[f.category] === 'green' ? 'success' : categoryColors[f.category] === 'amber' ? 'warning' : 'info'})` }}>
              <i className={f.icon}></i>
            </div>
            <h3 className="forfait-name">{f.name}</h3>
            <div className="forfait-price">
              {formatCurrency(f.price)} <span>/mois</span>
            </div>
            <ul className="forfait-features">
              {f.features.map((feat, i) => (
                <li key={i}><i className="fas fa-check"></i>{feat}</li>
              ))}
            </ul>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              <i className="fas fa-users" style={{ marginRight: 6 }}></i>{f.abonnes} abonnés
            </p>
            <div className="forfait-actions">
              <button className="btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => openEdit(f)}>
                <i className="fas fa-pen"></i> Modifier
              </button>
              <button className="btn-icon delete" onClick={() => confirmDelete(f.id)}>
                <i className="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editItem ? 'Modifier le forfait' : 'Nouveau forfait'}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
            <button className="btn-primary-gradient" onClick={saveItem}>
              {editItem ? 'Sauvegarder' : 'Créer'}
            </button>
          </>
        }
      >
        <div className="form-field">
          <label className="form-label">Nom du forfait</label>
          <input className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Internet Pro 500Go" />
        </div>
        <div className="form-field">
          <label className="form-label">Prix mensuel (DH)</label>
          <input className="form-input" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="199" />
        </div>
        <div className="form-field">
          <label className="form-label">Catégorie</label>
          <select className="form-select" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
            <option value="internet">Internet</option>
            <option value="mobile">Mobile</option>
            <option value="tv">TV</option>
            <option value="bundle">Bundle</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Fonctionnalités (une par ligne)</label>
          <textarea
            className="form-input"
            rows={5}
            value={formData.features}
            onChange={e => setFormData({ ...formData, features: e.target.value })}
            placeholder="100 Go de data&#10;Appels illimités&#10;Support 24/7"
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
          <h3>Supprimer ce forfait ?</h3>
          <p>Cette action est irréversible.</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default Forfaits;
