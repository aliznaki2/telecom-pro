import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if(email && password) {
      localStorage.setItem("user", JSON.stringify({email}));
      alert("Compte créé avec succès !");
      navigate("/");
    } else {
      alert("Remplissez tous les champs !");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '350px' }}>
        <h3 className="text-center mb-3">Signup</h3>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="w-100 mt-2" onClick={handleSignup}>Créer un compte</Button>
          <Button className="w-100 mt-2" variant="link" onClick={() => navigate('/login')}>Déjà un compte ?</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
