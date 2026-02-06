import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Abonnes from './pages/Abonnes';
import Forfaits from './pages/Forfaits';
import Factures from './pages/Factures';
import Support from './pages/Support';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

import { Container, Row, Col } from 'react-bootstrap';

// PrivateRoute pour protéger les pages
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<PrivateRoute>

          <div>
            <Route path="/admin" element={
  <PrivateRoute>
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0 d-none d-md-block">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4">
            <Admin />
          </Col>
        </Row>
      </Container>
    </div>
  </PrivateRoute>
}/>

            <NavbarComponent />
            <Container fluid>
              <Row>
                <Col md={2} className="p-0 d-none d-md-block">
                  <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                  <Dashboard />
                </Col>
              </Row>
            </Container>
          </div>
        </PrivateRoute>} />
        <Route path="/abonnes" element={<PrivateRoute>
          <div>
            <NavbarComponent />
            <Container fluid>
              <Row>
                <Col md={2} className="p-0 d-none d-md-block">
                  <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                  <Abonnes />
                </Col>
              </Row>
            </Container>
          </div>
        </PrivateRoute>} />
        <Route path="/forfaits" element={<PrivateRoute>
          <div>
            <NavbarComponent />
            <Container fluid>
              <Row>
                <Col md={2} className="p-0 d-none d-md-block">
                  <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                  <Forfaits />
                </Col>
              </Row>
            </Container>
          </div>
        </PrivateRoute>} />
        <Route path="/factures" element={<PrivateRoute>
          <div>
            <NavbarComponent />
            <Container fluid>
              <Row>
                <Col md={2} className="p-0 d-none d-md-block">
                  <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                  <Factures />
                </Col>
              </Row>
            </Container>
          </div>
        </PrivateRoute>} />
        <Route path="/support" element={<PrivateRoute>
          <div>
            <NavbarComponent />
            <Container fluid>
              <Row>
                <Col md={2} className="p-0 d-none d-md-block">
                  <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                  <Support />
                </Col>
              </Row>
            </Container>
          </div>
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
