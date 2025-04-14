import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../index.css'; 

export default function NavTabs() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">A Music Diary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Navbar.Text>
            <a href="#login">Welcome back, Musician!</a>
          </Navbar.Text>
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/About">About</Link>
            <Link className="nav-link" to="/Practice">My Practice</Link>
            <Link className="nav-link" to="/Signup">Create New Account</Link>
            <Link className="nav-link" to="/Login">Log In</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
