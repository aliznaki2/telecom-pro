import React from 'react';
import StatCard from '../components/StatCard';
import { dashboardChartData, forfaitDistribution, activityData } from '../data/data';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <p style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 6, fontSize: '0.85rem' }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color, fontSize: '0.8rem', margin: '2px 0' }}>
            {entry.name}: <strong>{entry.value.toLocaleString('fr-FR')}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Bonjour, Admin 👋</h1>
        <p className="page-description">Voici un résumé de votre activité aujourd'hui</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Abonnés"
          value={1456}
          icon="fas fa-users"
          color="cyan"
          change="+12.5%"
          changeType="up"
        />
        <StatCard
          title="Revenus Mensuels"
          value="85600 DH"
          icon="fas fa-coins"
          color="green"
          change="+8.3%"
          changeType="up"
        />
        <StatCard
          title="Forfaits Actifs"
          value={6}
          icon="fas fa-sim-card"
          color="amber"
          change="+2"
          changeType="up"
        />
        <StatCard
          title="Tickets Ouverts"
          value={6}
          icon="fas fa-headset"
          color="rose"
          change="-23%"
          changeType="down"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Revenus & Abonnés</h3>
              <p className="panel-subtitle">Évolution sur 12 mois</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradientViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenus" stroke="#06b6d4" fill="url(#gradientCyan)" strokeWidth={2.5} name="Revenus (DH)" />
              <Area type="monotone" dataKey="abonnes" stroke="#8b5cf6" fill="url(#gradientViolet)" strokeWidth={2.5} name="Abonnés" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Répartition Forfaits</h3>
              <p className="panel-subtitle">Par nombre d'abonnés</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={forfaitDistribution}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {forfaitDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '-10px' }}>
            {forfaitDistribution.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#94a3b8' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, display: 'inline-block' }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 + Timeline */}
      <div className="charts-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Tickets Support</h3>
              <p className="panel-subtitle">Par mois</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dashboardChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tickets" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Tickets" barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Activité Récente</h3>
              <p className="panel-subtitle">Dernières actions</p>
            </div>
          </div>
          <div className="timeline">
            {activityData.map(item => (
              <div key={item.id} className="timeline-item">
                <div className={`timeline-dot ${item.color}`}>
                  <i className={item.icon}></i>
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">{item.text}</p>
                  <p className="timeline-time">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="panel" style={{ marginTop: '0' }}>
        <div className="panel-header">
          <h3 className="panel-title">Actions Rapides</h3>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn"><i className="fas fa-user-plus"></i>Ajouter un abonné</button>
          <button className="quick-action-btn"><i className="fas fa-file-invoice"></i>Créer une facture</button>
          <button className="quick-action-btn"><i className="fas fa-ticket"></i>Nouveau ticket</button>
          <button className="quick-action-btn"><i className="fas fa-sim-card"></i>Nouveau forfait</button>
          <button className="quick-action-btn"><i className="fas fa-chart-bar"></i>Rapport mensuel</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
