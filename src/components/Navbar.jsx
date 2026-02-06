import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap'; // <- nouveau import


const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    alert(`Profil : ${user.email}`);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-top"/> TelecomPro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/abonnes">Abonnés</Nav.Link>
            <Nav.Link href="/forfaits">Forfaits</Nav.Link>
            <Nav.Link href="/factures">Factures</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={<i className="fas fa-user"></i>} id="nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>Profil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer to="/admin">
                    <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
                </NavDropdown.Item>


            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
