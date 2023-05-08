import { Link } from "react-router-dom";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from './logo.png';
import './Navbar.css';
function NavBar() {
  return (

    <Navbar bg="dark" expand="lg" variant="dark" className="pb-3">
          <Container className="ms-2">
        <Navbar.Brand>    
        <img
              
              src={logo}
              width="40 px"
              height="40 px"
              className="d-inline-block align-top me-3 mt-0"
              alt=""
              style={{'border-radius': '50%'}}
            />{' '}
            <Link to="/" style={{'text-decoration': 'none','color':'#FFFFFFC8'}}> PlateSense</Link>
            </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_link">
            <Nav.Link><Link to='/'>Inicio</Link></Nav.Link>
            <Nav.Link href="/waw">Quienes somos</Nav.Link>
            <Nav.Link><Link to='/register' >Registrate</Link></Nav.Link>
            <Nav.Link><Link to='/login' >Iniciar Sesión</Link></Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    
  );
}

export default NavBar;

