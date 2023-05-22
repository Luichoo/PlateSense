import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from './logo.png';
import './Navbar.css';
//import axios from "axios";
function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  
  const handleLogout = () => {
    
    localStorage.clear()
    setIsLoggedIn(false);
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{'maxWidth':'100%'}}>
    <Container className="ms-3 me-3" style={{ 'maxWidth':'100%'}}>
      <Navbar.Brand eventkey={1}> <img
      
                src={logo}
                width="40 px"
                height="40 px"
                className=" me-3 mt-0"
                alt=""
                style={{'borderRadius': '50%'}}
              />{' '}
              <Link to="/" style={{'textDecoration': 'none','color':'#FFFFFFC8'}}> PlateSense</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" >

        <Nav className="me-auto justify-content-between ms-0 " style={{'maxWidth':'100%', 'width':'100%'}}>
          <div >
          <Nav.Link eventkey={1} as={Link} to='/' className="l-nav">Inicio</Nav.Link>
        <Nav.Link eventkey={2} as={Link} to='/informacion' className="l-nav">Quienes somos</Nav.Link>
          </div>
          
          {isLoggedIn ? (
            <>
        <div >

          <Nav.Link eventkey={5} as={Link} to='/login' className="r-nav" onClick={handleLogout}>Logout</Nav.Link>

        </div>
            </>
            ) : (
              <>
         <div >
        <Nav.Link eventkey={3} as={Link} to='/register' className="r-nav"> Registrate</Nav.Link>
          <Nav.Link eventkey={4} as={Link} to='/login' className="r-nav">Iniciar Sesión</Nav.Link>
        </div>
            </>
            )}

       
        </Nav>
  
      </Navbar.Collapse>
    </Container>
  </Navbar>

    // <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" className="pb-3">
    //       <Container className="ms-2">
    //     <Navbar.Brand>    
    //     <img
              
    //           src={logo}
    //           width="40 px"
    //           height="40 px"
    //           className=" me-3 mt-0"
    //           alt=""
    //           style={{'border-radius': '50%'}}
    //         />{' '}
    //         <Link to="/" style={{'text-decoration': 'none','color':'#FFFFFFC8'}}> PlateSense</Link>
    //         </Navbar.Brand>

    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto nav_link">
    //         <Nav.Link><Link to='/'>Inicio</Link></Nav.Link>
    //         <Nav.Link><Link to='/informacion' >Quienes somos</Link></Nav.Link>
    //       </Nav>
    //       <Nav className="ms-auto nav_link">
    //          <Nav.Link><Link to='/register' >Registrate</Link></Nav.Link>
    //         <Nav.Link><Link to='/login' >Iniciar Sesión</Link></Nav.Link>
    //       </Nav>
 
    //     </Navbar.Collapse>
    //     </Container>
    // </Navbar>
    
  );
}

export default NavBar;

