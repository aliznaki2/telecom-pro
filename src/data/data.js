// === TelecomPro — Centralized Mock Data ===

export const abonnesData = [
  { id: 1, name: 'Ali Znaki', email: 'ali.znaki@gmail.com', phone: '+212 600-000-001', forfait: 'Fibre Pro 200Mb', status: 'Actif', dateInscription: '2024-01-15', consommation: 78 },
  { id: 2, name: 'Sara Benali', email: 'sara.benali@gmail.com', phone: '+212 611-111-002', forfait: 'Mobile Premium', status: 'Actif', dateInscription: '2024-02-20', consommation: 65 },
  { id: 3, name: 'Youssef Amrani', email: 'y.amrani@outlook.com', phone: '+212 622-222-003', forfait: 'Internet 100Go', status: 'Actif', dateInscription: '2024-03-10', consommation: 92 },
  { id: 4, name: 'Fatima Zahra', email: 'f.zahra@gmail.com', phone: '+212 633-333-004', forfait: 'Triple Play', status: 'Suspendu', dateInscription: '2023-11-05', consommation: 15 },
  { id: 5, name: 'Karim Idrissi', email: 'k.idrissi@yahoo.com', phone: '+212 644-444-005', forfait: 'Mobile Essentiel', status: 'Actif', dateInscription: '2024-04-01', consommation: 45 },
  { id: 6, name: 'Nadia Tazi', email: 'nadia.tazi@gmail.com', phone: '+212 655-555-006', forfait: 'Fibre Pro 200Mb', status: 'Inactif', dateInscription: '2023-08-22', consommation: 0 },
  { id: 7, name: 'Omar Fassi', email: 'omar.f@hotmail.com', phone: '+212 666-666-007', forfait: 'Internet 100Go', status: 'Actif', dateInscription: '2024-05-12', consommation: 55 },
  { id: 8, name: 'Leila Chraibi', email: 'leila.c@gmail.com', phone: '+212 677-777-008', forfait: 'TV + Internet', status: 'Actif', dateInscription: '2024-06-08', consommation: 82 },
];

export const forfaitsData = [
  {
    id: 1,
    name: 'Internet 100Go',
    price: 99,
    category: 'internet',
    icon: 'fas fa-wifi',
    popular: false,
    features: ['100 Go de data 4G/5G', 'Débit jusqu\'à 50 Mbps', 'Appels illimités nationaux', 'SMS illimités', 'Hotspot WiFi inclus'],
    abonnes: 156,
  },
  {
    id: 2,
    name: 'Mobile Premium',
    price: 149,
    category: 'mobile',
    icon: 'fas fa-mobile-screen-button',
    popular: true,
    features: ['Data illimitée', 'Débit jusqu\'à 100 Mbps', 'Appels internationaux 5h', 'SMS/MMS illimités', 'Roaming 10 Go/mois', 'Smartphone subventionné'],
    abonnes: 234,
  },
  {
    id: 3,
    name: 'Fibre Pro 200Mb',
    price: 299,
    category: 'internet',
    icon: 'fas fa-bolt',
    popular: false,
    features: ['Fibre optique 200 Mbps', 'Upload 50 Mbps', 'IP fixe dédiée', 'Support prioritaire 24/7', 'Router WiFi 6 inclus', 'Installation gratuite'],
    abonnes: 89,
  },
  {
    id: 4,
    name: 'Mobile Essentiel',
    price: 49,
    category: 'mobile',
    icon: 'fas fa-phone',
    popular: false,
    features: ['20 Go de data', 'Appels nationaux 3h', 'SMS illimités', 'Messagerie vocale'],
    abonnes: 312,
  },
  {
    id: 5,
    name: 'TV + Internet',
    price: 199,
    category: 'tv',
    icon: 'fas fa-tv',
    popular: false,
    features: ['Fibre 100 Mbps', '150+ chaînes HD', 'Replay 7 jours', 'VOD incluse', 'Décodeur 4K inclus', '2 écrans simultanés'],
    abonnes: 127,
  },
  {
    id: 6,
    name: 'Triple Play',
    price: 349,
    category: 'bundle',
    icon: 'fas fa-layer-group',
    popular: true,
    features: ['Fibre 300 Mbps', 'Mobile data illimitée', '200+ chaînes TV', 'Appels fixes illimités', 'Support VIP', 'Multi-SIM famille'],
    abonnes: 198,
  },
];

export const facturesData = [
  { id: 1, abonne: 'Ali Znaki', forfait: 'Fibre Pro 200Mb', montant: 299, status: 'Payé', date: '2024-06-01', methode: 'Carte bancaire' },
  { id: 2, abonne: 'Sara Benali', forfait: 'Mobile Premium', montant: 149, status: 'Payé', date: '2024-06-01', methode: 'Prélèvement' },
  { id: 3, abonne: 'Youssef Amrani', forfait: 'Internet 100Go', montant: 99, status: 'Impayé', date: '2024-06-01', methode: '-' },
  { id: 4, abonne: 'Fatima Zahra', forfait: 'Triple Play', montant: 349, status: 'Impayé', date: '2024-05-01', methode: '-' },
  { id: 5, abonne: 'Karim Idrissi', forfait: 'Mobile Essentiel', montant: 49, status: 'Payé', date: '2024-06-01', methode: 'Virement' },
  { id: 6, abonne: 'Nadia Tazi', forfait: 'Fibre Pro 200Mb', montant: 299, status: 'En attente', date: '2024-06-01', methode: '-' },
  { id: 7, abonne: 'Omar Fassi', forfait: 'Internet 100Go', montant: 99, status: 'Payé', date: '2024-06-01', methode: 'Carte bancaire' },
  { id: 8, abonne: 'Leila Chraibi', forfait: 'TV + Internet', montant: 199, status: 'Payé', date: '2024-06-01', methode: 'Prélèvement' },
  { id: 9, abonne: 'Ali Znaki', forfait: 'Fibre Pro 200Mb', montant: 299, status: 'Payé', date: '2024-05-01', methode: 'Carte bancaire' },
  { id: 10, abonne: 'Sara Benali', forfait: 'Mobile Premium', montant: 149, status: 'Payé', date: '2024-05-01', methode: 'Prélèvement' },
];

export const ticketsData = [
  { id: 1, abonne: 'Ali Znaki', sujet: 'Débit internet très lent', priorite: 'Haute', status: 'Ouvert', date: '2024-06-15', description: 'Le débit ne dépasse pas 10 Mbps depuis 3 jours.' },
  { id: 2, abonne: 'Sara Benali', sujet: 'Facture incorrecte - double prélèvement', priorite: 'Haute', status: 'En cours', date: '2024-06-14', description: 'Deux prélèvements effectués pour le mois de mai.' },
  { id: 3, abonne: 'Fatima Zahra', sujet: 'Demande de réactivation de ligne', priorite: 'Moyenne', status: 'En cours', date: '2024-06-13', description: 'Souhaite réactiver sa ligne après suspension.' },
  { id: 4, abonne: 'Karim Idrissi', sujet: 'Changement de forfait', priorite: 'Basse', status: 'Résolu', date: '2024-06-12', description: 'Migration du forfait Essentiel vers Premium.' },
  { id: 5, abonne: 'Omar Fassi', sujet: 'Problème de connexion WiFi', priorite: 'Moyenne', status: 'Ouvert', date: '2024-06-15', description: 'Déconnexions fréquentes du WiFi le soir.' },
  { id: 6, abonne: 'Leila Chraibi', sujet: 'Chaînes TV manquantes', priorite: 'Basse', status: 'Résolu', date: '2024-06-10', description: 'Certaines chaînes du bouquet ne s\'affichent plus.' },
];

export const dashboardChartData = [
  { month: 'Jan', abonnes: 820, revenus: 45200, tickets: 12 },
  { month: 'Fév', abonnes: 890, revenus: 48500, tickets: 15 },
  { month: 'Mar', abonnes: 950, revenus: 52100, tickets: 10 },
  { month: 'Avr', abonnes: 1020, revenus: 56800, tickets: 8 },
  { month: 'Mai', abonnes: 1080, revenus: 61200, tickets: 14 },
  { month: 'Jun', abonnes: 1116, revenus: 64800, tickets: 11 },
  { month: 'Jul', abonnes: 1180, revenus: 68500, tickets: 9 },
  { month: 'Aug', abonnes: 1230, revenus: 71200, tickets: 13 },
  { month: 'Sep', abonnes: 1290, revenus: 74800, tickets: 7 },
  { month: 'Oct', abonnes: 1350, revenus: 78200, tickets: 16 },
  { month: 'Nov', abonnes: 1400, revenus: 81500, tickets: 10 },
  { month: 'Déc', abonnes: 1456, revenus: 85600, tickets: 6 },
];

export const forfaitDistribution = [
  { name: 'Internet 100Go', value: 156, color: '#06b6d4' },
  { name: 'Mobile Premium', value: 234, color: '#8b5cf6' },
  { name: 'Fibre Pro', value: 89, color: '#10b981' },
  { name: 'Mobile Essentiel', value: 312, color: '#f59e0b' },
  { name: 'TV + Internet', value: 127, color: '#f43f5e' },
  { name: 'Triple Play', value: 198, color: '#6366f1' },
];

export const activityData = [
  { id: 1, type: 'user', text: 'Nouvel abonné : Leila Chraibi', time: 'Il y a 2 heures', color: 'cyan', icon: 'fas fa-user-plus' },
  { id: 2, type: 'payment', text: 'Paiement reçu de Ali Znaki — 299 DH', time: 'Il y a 3 heures', color: 'green', icon: 'fas fa-check-circle' },
  { id: 3, type: 'ticket', text: 'Ticket #5 ouvert par Omar Fassi', time: 'Il y a 5 heures', color: 'amber', icon: 'fas fa-ticket' },
  { id: 4, type: 'alert', text: 'Facture impayée — Fatima Zahra (349 DH)', time: 'Il y a 8 heures', color: 'rose', icon: 'fas fa-exclamation-triangle' },
  { id: 5, type: 'forfait', text: 'Forfait "Triple Play" — nouvel abonnement', time: 'Il y a 12 heures', color: 'violet', icon: 'fas fa-star' },
];

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'decimal' }).format(amount) + ' DH';
};
