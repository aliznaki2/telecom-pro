import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Image } from 'react-bootstrap';
import internet from '../assets/forfaits/internet.png';
import mobile from '../assets/forfaits/telephone.jpg';

const Forfaits = () => {
  const [forfaits, setForfaits] = useState([
    { id: 1, name: 'Internet 100Go', price: '20$', img: internet },
    { id: 2, name: 'Mobile 50Min', price: '10$', img: mobile },
  ]);

  const [showEdit, setShowEdit] = useState(false);
  const [editForfait, setEditForfait] = useState({});

  const handleEdit = (f) => { setEditForfait(f); setShowEdit(true); };
  const saveEdit = () => { setForfaits(forfaits.map(f => f.id === editForfait.id ? editForfait : f)); setShowEdit(false); };
  const handleDelete = (id) => setForfaits(forfaits.filter(f => f.id !== id));

  return (
    <div>
      <h2 className="mb-3">Forfaits</h2>
      <Row>
        {forfaits.map(f => (
          <Col md={4} key={f.id}>
            <Card className="mb-3 shadow-sm text-center">
              <Image src={f.img} width={80} height={80} className="mt-3"/>
              <Card.Body>
                <Card.Title>{f.name}</Card.Title>
                <Card.Text>{f.price}</Card.Text>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(f)}>Modifier</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}>Supprimer</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Edit */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Forfait</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nom</Form.Label>
              <Form.Control value={editForfait.name || ''} onChange={e => setEditForfait({...editForfait, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Prix</Form.Label>
              <Form.Control value={editForfait.price || ''} onChange={e => setEditForfait({...editForfait, price: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={editForfait.img || ''} onChange={e => setEditForfait({...editForfait, img: e.target.value})} />
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

export default Forfaits;
