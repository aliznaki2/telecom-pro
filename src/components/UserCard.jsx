import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card className="mb-3 shadow-sm" style={{ width: '18rem' }}>
      <Card.Body className="text-center">
        <Image src={user.photo} roundedCircle width={80} height={80} className="mb-3"/>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <i className="fas fa-envelope me-2"></i>{user.email}<br/>
          <i className="fas fa-phone me-2"></i>{user.phone}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(user)}>Modifier</Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>Supprimer</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
