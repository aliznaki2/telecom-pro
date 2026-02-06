import React from 'react';
import CardInfo from '../components/CardInfo';
import { Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', abonnés: 400, revenus: 8000 },
  { month: 'Feb', abonnés: 450, revenus: 9000 },
  { month: 'Mar', abonnés: 500, revenus: 9500 },
  { month: 'Apr', abonnés: 550, revenus: 11000 },
  { month: 'May', abonnés: 600, revenus: 12000 },
];

const Dashboard = () => {
  return (
    <div className="p-3">
      <h2 className="mb-4">Dashboard</h2>

      <Row className="mb-4">
        <Col><CardInfo title="Abonnés" value={600} icon="fas fa-users" color="primary" /></Col>
        <Col><CardInfo title="Forfaits" value={15} icon="fas fa-sim-card" color="success" /></Col>
        <Col><CardInfo title="Revenus" value="12k$" icon="fas fa-dollar-sign" color="warning" /></Col>
        <Col><CardInfo title="Tickets Support" value={5} icon="fas fa-headset" color="danger" /></Col>
      </Row>

      <h4>Évolution des abonnés et revenus</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="abonnés" stroke="#8884d8" />
          <Line type="monotone" dataKey="revenus" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
