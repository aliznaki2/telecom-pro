import React from 'react';

const statusConfig = {
  // Abonnés
  'Actif': { variant: 'success', label: 'Actif' },
  'Inactif': { variant: 'danger', label: 'Inactif' },
  'Suspendu': { variant: 'warning', label: 'Suspendu' },
  // Factures
  'Payé': { variant: 'success', label: 'Payé' },
  'Impayé': { variant: 'danger', label: 'Impayé' },
  'En attente': { variant: 'warning', label: 'En attente' },
  // Support
  'Ouvert': { variant: 'info', label: 'Ouvert' },
  'En cours': { variant: 'warning', label: 'En cours' },
  'Résolu': { variant: 'success', label: 'Résolu' },
  // Priorités
  'Haute': { variant: 'danger', label: 'Haute' },
  'Moyenne': { variant: 'warning', label: 'Moyenne' },
  'Basse': { variant: 'info', label: 'Basse' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || { variant: 'info', label: status };

  return (
    <span className={`badge-status ${config.variant}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
