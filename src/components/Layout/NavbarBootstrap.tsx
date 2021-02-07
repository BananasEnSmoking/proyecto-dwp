import * as React from "react";
import logo from '../../img logo/isotipo/BES I11.png';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { Link } from "react-router-dom";

export const NavbarBootstrap: React.FC = () =>{
    return (
      <React.Fragment>
       {/* Colores del Navbar */}
       <Navbar expand="md" bg="dark" variant="dark">

         {/**
          * las rutas deberan ser protegidas al momento de crear el usuario
          * por el momento todas estaran disponibles
          */}
       <Navbar.Brand as={Link} to="/"><img src={logo} className="App-logo" alt=""/></Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
       <Nav className="mr-auto">
         <Nav.Link as={Link} to="/createAccount">Create Account</Nav.Link>
         <Nav.Link as={Link} to="/login">Login</Nav.Link>
       </Nav>
       </Navbar.Collapse>
       <Form inline>
         <FormControl type="text" placeholder="do you want a banana?" className="mr-sm-2" />
         <Button variant="outline-info">Search</Button>
       </Form>
     </Navbar>
      </React.Fragment>
    )
}