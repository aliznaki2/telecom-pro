import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Factures = () => {
  const [factures, setFactures] = useState([
    { id: 1, abonne: 'Ali Znaki', forfait: 'Internet 100Go', montant: '20$', status: 'Payé' },
    { id: 2, abonne: 'Sara Ben', forfait: 'Mobile 50Min', montant: '10$', status: 'Impayé' },
  ]);

  const [showEdit, setShowEdit] = useState(false);
  const [editFacture, setEditFacture] = useState({});

  const handleEdit = (f) => { setEditFacture(f); setShowEdit(true); };
  const saveEdit = () => { setFactures(factures.map(f => f.id === editFacture.id ? editFacture : f)); setShowEdit(false); };
  const handleDelete = (id) => setFactures(factures.filter(f => f.id !== id));

  return (
    <div>
      <h2 className="mb-3">Factures</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Abonné</th>
            <th>Forfait</th>
            <th>Montant</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {factures.map(f => (
            <tr key={f.id}>
              <td>{f.abonne}</td>
              <td>{f.forfait}</td>
              <td>{f.montant}</td>
              <td>{f.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(f)}>Modifier</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Edit */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Abonné</Form.Label>
              <Form.Control value={editFacture.abonne || ''} onChange={e => setEditFacture({...editFacture, abonne: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Forfait</Form.Label>
              <Form.Control value={editFacture.forfait || ''} onChange={e => setEditFacture({...editFacture, forfait: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Montant</Form.Label>
              <Form.Control value={editFacture.montant || ''} onChange={e => setEditFacture({...editFacture, montant: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select value={editFacture.status || 'Payé'} onChange={e => setEditFacture({...editFacture, status: e.target.value})}>
                <option>Payé</option>
                <option>Impayé</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Annuler</Button>
          <Button variant="primary" onClick={saveEdit}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Factures;
