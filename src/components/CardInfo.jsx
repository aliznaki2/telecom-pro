import React from 'react';
import { Card } from 'react-bootstrap';

const CardInfo = ({ title, value, icon, color }) => {
  return (
    <Card className={`text-white mb-3 bg-${color}`} style={{ minWidth: '12rem' }}>
      <Card.Body>
        <div className="d-flex align-items-center">
          <i className={`${icon} fa-2x me-3`}></i>
          <div>
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {value}
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardInfo;
