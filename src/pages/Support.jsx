import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Support = () => {
  const [tickets, setTickets] = useState([
    { id: 1, abonne: 'Ali Znaki', sujet: 'Problème Internet', priorité: 'Haute', status: 'Ouvert' },
    { id: 2, abonne: 'Sara Ben', sujet: 'Facture incorrecte', priorité: 'Moyenne', status: 'En cours' },
  ]);

  const [show, setShow] = useState(false);
  const [newTicket, setNewTicket] = useState({ abonne: '', sujet: '', priorité: '', status: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTicket = () => {
    setTickets([...tickets, { id: tickets.length + 1, ...newTicket }]);
    setNewTicket({ abonne: '', sujet: '', priorité: '', status: '' });
    handleClose();
  };

  return (
    <div className="p-3">
      <h2>Support / Tickets</h2>
      <Button className="mb-3" onClick={handleShow}>Ajouter un ticket</Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Abonné</th>
            <th>Sujet</th>
            <th>Priorité</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>{t.abonne}</td>
              <td>{t.sujet}</td>
              <td>{t.priorité}</td>
              <td>{t.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                <Button variant="danger" size="sm">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Abonné</Form.Label>
              <Form.Control type="text" value={newTicket.abonne} onChange={e => setNewTicket({...newTicket, abonne: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Sujet</Form.Label>
              <Form.Control type="text" value={newTicket.sujet} onChange={e => setNewTicket({...newTicket, sujet: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Priorité</Form.Label>
              <Form.Select value={newTicket.priorité} onChange={e => setNewTicket({...newTicket, priorité: e.target.value})}>
                <option>Haute</option>
                <option>Moyenne</option>
                <option>Basse</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select value={newTicket.status} onChange={e => setNewTicket({...newTicket, status: e.target.value})}>
                <option>Ouvert</option>
                <option>En cours</option>
                <option>Résolu</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={addTicket}>Ajouter</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Support;
