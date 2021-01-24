import * as React from "react";
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { Link } from "react-router-dom";

export const NavbarBootstrap: React.FC = () =>{
    return (
      <React.Fragment>
       {/* Colores del Navbar */}
       <Navbar expand="md" bg="dark" variant="dark">
       <Navbar.Brand as={Link} to="/nv">LOGO</Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
       <Nav className="mr-auto">
         <Nav.Link as={Link} to="/">Home</Nav.Link>
         <Nav.Link as={Link} to="/F">Features</Nav.Link>
       </Nav>
       </Navbar.Collapse>
       <Form inline>
         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
         <Button variant="outline-info">Search</Button>
       </Form>
     </Navbar>
      </React.Fragment>
    )
}