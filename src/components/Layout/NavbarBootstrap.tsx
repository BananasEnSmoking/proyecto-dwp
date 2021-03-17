import * as React from "react";
import logo from '../../img logo/isotipo/BES I11.png';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { Link } from "react-router-dom";

export const NavbarBootstrap: React.FC = () =>{
  const [singIn,setSingIn] = React.useState<boolean>();
  const [customer,setCustomer]= React.useState<any>({
    "first_name":null
  });

  React.useEffect(()=>{
    setInterval(()=>{
      if(localStorage.first_name){setSingIn(true);setCustomer({...customer,['first_name']:localStorage.first_name})}
      else{setSingIn(false);setCustomer({...customer,['first_name']:null})}
    },500)
  },[])

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
         {customer.first_name !== null && customer.first_name !== undefined?<Nav style={{ color:"#f3d75a" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome&nbsp;{customer.first_name}&nbsp;&nbsp;&nbsp;</Nav>:<Nav.Link as={Link} to="/login">Login</Nav.Link>}
       </Nav>
       </Navbar.Collapse>
     </Navbar>
        
      </React.Fragment>
    )
}