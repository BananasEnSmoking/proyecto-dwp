import * as React from "react";
import logo from '../../img logo/isotipo/BES I11.png';
import car from '../../img logo/carrito.png';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { Link } from "react-router-dom";


export const NavbarBootstrap: React.FC = () =>{
  const urlCarrito = 'http://35.167.62.109/storeutags/cart/get_details';
  const urlDelete = 'http://35.167.62.109/storeutags/cart/remove_all'
  const [singIn,setSingIn] = React.useState<boolean>();
  const [customer,setCustomer]= React.useState<any>({
    "first_name":null
  });
  const [token,setToken]= React.useState<any>({
    "session_id":localStorage.token
  })
  const [carrito,setCarrito]= React.useState<any>('0');

  const closeSession =()=>{
    //clearCarrito()
    localStorage.clear()
  }

async function clearCarrito() {
  try {
    const body = JSON.stringify(token);
    const response = await fetch(urlDelete, { method: 'DELETE', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, body: body});

      const res = await response.json();
    if(res){
      setCarrito(0)
    }
      
} catch (error) {
    console.log(error)
}
}

  async function getCarrito() {
    try {
      const body = JSON.stringify(token);
      const response = await fetch(urlCarrito, { method: 'POST', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, body: body});
        const res = await response.json();
      if(res.status === "success"){
        setCarrito(res.data.items_quantity)
      }
        
  } catch (error) {
  }
  }

  React.useEffect(()=>{
    setInterval(()=>{
      if(localStorage.token){
        setToken({...token,['session_id']:localStorage.token})
        getCarrito()
      }
      if(localStorage.first_name){setSingIn(true);setCustomer({...customer,['first_name']:localStorage.first_name})}
      else{setSingIn(false);setCustomer({...customer,['first_name']:null})}

      
    },1000)
  },[])

  React.useEffect(()=>{
    getCarrito()
  },[token])

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
       {localStorage.token !== null && localStorage.token !== undefined?'':
         <Nav.Link as={Link} to="/createAccount">Create Account</Nav.Link>}

         {localStorage.token !== null && localStorage.token !== undefined?
         <Button onClick={closeSession}>Log out</Button>
         :''}
         {customer.first_name !== null && customer.first_name !== undefined?<Link to="/order"><Nav style={{ color:"#f3d75a" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome&nbsp;{customer.first_name}&nbsp;&nbsp;&nbsp;</Nav></Link>:<Nav.Link as={Link} to="/login">Login</Nav.Link>}

         {localStorage.token !== null && localStorage.token !== undefined?
         <Link to="/showCarrito">
           <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={car} style={{ width:40,height: 35 }} alt="" className="justify-content-end"/></div>
         </Link>
         :''}
         {localStorage.token !== null && localStorage.token !== undefined && carrito !== null && carrito !== undefined?<Nav style={{ color:"#f3d75a" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{carrito}</Nav>:''}
         
       
       </Nav>
       </Navbar.Collapse>
     </Navbar>
        
      </React.Fragment>
    )
}