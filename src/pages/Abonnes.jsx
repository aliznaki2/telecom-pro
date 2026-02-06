import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import user1 from '../assets/users/user1.jpg';
import user2 from '../assets/users/user2.jpg';

const Abonnes = () => {
  const [abonnes, setAbonnes] = useState([
    { id: 1, name: 'Ali Znaki', email: 'ali@example.com', phone: '0600000000', photo: user1 },
    { id: 2, name: 'Sara Ben', email: 'sara@example.com', phone: '0611111111', photo: user2 },
  ]);

  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({});

  const handleEdit = (user) => {
    setEditUser(user);
    setShowEdit(true);
  };

  const saveEdit = () => {
    setAbonnes(abonnes.map(a => a.id === editUser.id ? editUser : a));
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    setAbonnes(abonnes.filter(a => a.id !== id));
  };

  return (
    <div>
      <h2 className="mb-3">Abonnés</h2>
      <Row>
        {abonnes.map(user => (
          <Col md={4} key={user.id}>
            <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>

      {/* Modal Edit */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Abonné</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nom</Form.Label>
              <Form.Control value={editUser.name || ''} onChange={e => setEditUser({...editUser, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control value={editUser.email || ''} onChange={e => setEditUser({...editUser, email: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control value={editUser.phone || ''} onChange={e => setEditUser({...editUser, phone: e.target.value})} />
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

export default Abonnes;
