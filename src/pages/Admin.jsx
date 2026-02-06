import React, { useState } from 'react';
import { Tab, Tabs, Row, Col, Card, Button, Modal, Form, Table, Image } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import user1 from '../assets/users/user1.jpg';
import user2 from '../assets/users/user2.jpg';
import internet from '../assets/forfaits/internet.png';
import mobile from '../assets/forfaits/telephone.jpg';

const Admin = () => {
  // === Données initiales ===
  const [abonnes, setAbonnes] = useState([
    { id: 1, name: 'Ali Znaki', email: 'ali@example.com', phone: '0600000000', photo: user1 },
    { id: 2, name: 'Sara Ben', email: 'sara@example.com', phone: '0611111111', photo: user2 },
  ]);

  const [forfaits, setForfaits] = useState([
    { id: 1, name: 'Internet 100Go', price: '20$', img: internet },
    { id: 2, name: 'Mobile 50Min', price: '10$', img: mobile },
  ]);

  const [factures, setFactures] = useState([
    { id: 1, abonne: 'Ali Znaki', forfait: 'Internet 100Go', montant: '20$', status: 'Payé' },
    { id: 2, abonne: 'Sara Ben', forfait: 'Mobile 50Min', montant: '10$', status: 'Impayé' },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, abonne: 'Ali Znaki', sujet: 'Problème Internet', priorité: 'Haute', status: 'Ouvert' },
    { id: 2, abonne: 'Sara Ben', sujet: 'Facture incorrecte', priorité: 'Moyenne', status: 'En cours' },
  ]);

  // === Modals pour Edition ===
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [editType, setEditType] = useState(''); // "abonnes", "forfaits", "factures", "tickets"

  const handleEdit = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setShowEdit(true);
  };

  const saveEdit = () => {
    switch(editType){
      case 'abonnes':
        setAbonnes(abonnes.map(a => a.id === editItem.id ? editItem : a));
        break;
      case 'forfaits':
        setForfaits(forfaits.map(f => f.id === editItem.id ? editItem : f));
        break;
      case 'factures':
        setFactures(factures.map(f => f.id === editItem.id ? editItem : f));
        break;
      case 'tickets':
        setTickets(tickets.map(t => t.id === editItem.id ? editItem : t));
        break;
      default:
        break;
    }
    setShowEdit(false);
  };

  const handleDelete = (id, type) => {
    switch(type){
      case 'abonnes': setAbonnes(abonnes.filter(a => a.id !== id)); break;
      case 'forfaits': setForfaits(forfaits.filter(f => f.id !== id)); break;
      case 'factures': setFactures(factures.filter(f => f.id !== id)); break;
      case 'tickets': setTickets(tickets.filter(t => t.id !== id)); break;
      default: break;
    }
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <Tabs defaultActiveKey="abonnes" id="admin-tabs" className="mb-3">
        {/* ===== Abonnés ===== */}
        <Tab eventKey="abonnes" title="Abonnés">
          <Row>
            {abonnes.map(user => (
              <Col md={4} key={user.id}>
                <UserCard user={user} onEdit={(u)=>handleEdit(u,'abonnes')} onDelete={(id)=>handleDelete(id,'abonnes')} />
              </Col>
            ))}
          </Row>
        </Tab>

        {/* ===== Forfaits ===== */}
        <Tab eventKey="forfaits" title="Forfaits">
          <Row>
            {forfaits.map(f => (
              <Col md={4} key={f.id}>
                <Card className="mb-3 shadow-sm">
                  <Image src={f.img} width="100%" height={150} />
                  <Card.Body>
                    <Card.Title>{f.name}</Card.Title>
                    <Card.Text>{f.price}</Card.Text>
                    <Button variant="warning" size="sm" className="me-2" onClick={()=>handleEdit(f,'forfaits')}>Modifier</Button>
                    <Button variant="danger" size="sm" onClick={()=>handleDelete(f.id,'forfaits')}>Supprimer</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* ===== Factures ===== */}
        <Tab eventKey="factures" title="Factures">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Abonné</th><th>Forfait</th><th>Montant</th><th>Status</th><th>Actions</th>
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
                    <Button variant="warning" size="sm" className="me-2" onClick={()=>handleEdit(f,'factures')}>Modifier</Button>
                    <Button variant="danger" size="sm" onClick={()=>handleDelete(f.id,'factures')}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* ===== Support ===== */}
        <Tab eventKey="tickets" title="Support">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Abonné</th><th>Sujet</th><th>Priorité</th><th>Status</th><th>Actions</th>
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
                    <Button variant="warning" size="sm" className="me-2" onClick={()=>handleEdit(t,'tickets')}>Modifier</Button>
                    <Button variant="danger" size="sm" onClick={()=>handleDelete(t.id,'tickets')}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* Modal Edition */}
      <Modal show={showEdit} onHide={()=>setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier {editType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editType === 'abonnes' && (
              <>
                <Form.Group className="mb-2"><Form.Label>Nom</Form.Label>
                  <Form.Control type="text" value={editItem.name || ''} onChange={e=>setEditItem({...editItem,name:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={editItem.email || ''} onChange={e=>setEditItem({...editItem,email:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Téléphone</Form.Label>
                  <Form.Control type="text" value={editItem.phone || ''} onChange={e=>setEditItem({...editItem,phone:e.target.value})}/>
                </Form.Group>
              </>
            )}
            {editType === 'forfaits' && (
              <>
                <Form.Group className="mb-2"><Form.Label>Nom</Form.Label>
                  <Form.Control type="text" value={editItem.name || ''} onChange={e=>setEditItem({...editItem,name:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Prix</Form.Label>
                  <Form.Control type="text" value={editItem.price || ''} onChange={e=>setEditItem({...editItem,price:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" value={editItem.img || ''} onChange={e=>setEditItem({...editItem,img:e.target.value})}/>
                </Form.Group>
              </>
            )}
            {editType === 'factures' && (
              <>
                <Form.Group className="mb-2"><Form.Label>Abonné</Form.Label>
                  <Form.Control type="text" value={editItem.abonne || ''} onChange={e=>setEditItem({...editItem,abonne:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Forfait</Form.Label>
                  <Form.Control type="text" value={editItem.forfait || ''} onChange={e=>setEditItem({...editItem,forfait:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Montant</Form.Label>
                  <Form.Control type="text" value={editItem.montant || ''} onChange={e=>setEditItem({...editItem,montant:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Status</Form.Label>
                  <Form.Select value={editItem.status || ''} onChange={e=>setEditItem({...editItem,status:e.target.value})}>
                    <option>Payé</option>
                    <option>Impayé</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
            {editType === 'tickets' && (
              <>
                <Form.Group className="mb-2"><Form.Label>Abonné</Form.Label>
                  <Form.Control type="text" value={editItem.abonne || ''} onChange={e=>setEditItem({...editItem,abonne:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Sujet</Form.Label>
                  <Form.Control type="text" value={editItem.sujet || ''} onChange={e=>setEditItem({...editItem,sujet:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Priorité</Form.Label>
                  <Form.Select value={editItem.priorité || ''} onChange={e=>setEditItem({...editItem,priorité:e.target.value})}>
                    <option>Haute</option><option>Moyenne</option><option>Basse</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2"><Form.Label>Status</Form.Label>
                  <Form.Select value={editItem.status || ''} onChange={e=>setEditItem({...editItem,status:e.target.value})}>
                    <option>Ouvert</option><option>En cours</option><option>Résolu</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowEdit(false)}>Annuler</Button>
          <Button variant="primary" onClick={saveEdit}>Sauvegarder</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
