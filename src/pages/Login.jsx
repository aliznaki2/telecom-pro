import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if(email === "admin@telecom.com" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({email}));
      navigate("/");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '350px' }}>
        <h3 className="text-center mb-3">Login</h3>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="w-100 mt-2" onClick={handleLogin}>Se connecter</Button>
          <Button className="w-100 mt-2" variant="link" onClick={() => navigate('/signup')}>Créer un compte</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
