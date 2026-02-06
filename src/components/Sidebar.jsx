import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: '220px' }}>
      <h4 className="mb-4">Menu</h4>
      <Nav className="flex-column">
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/abonnes">Abonnés</Nav.Link>
        <Nav.Link href="/forfaits">Forfaits</Nav.Link>
        <Nav.Link href="/factures">Factures</Nav.Link>
        <Nav.Link href="/support">Support</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
