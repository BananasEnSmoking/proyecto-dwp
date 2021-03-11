import React from 'react';
import { Container } from 'react-bootstrap';

import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//componentes layout
import { NavbarBootstrap } from "./components/Layout/NavbarBootstrap";
import { Footer } from "./components/Layout/Footer";

//componentes router
import { CreateAccount } from "./components/CreateAccount";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/RecoveryPassword/ForgotPassword";
import { RecoveryPassword } from "./components/RecoveryPassword/RecoveryPassword";
import { HomeDepot } from "./components/HomeDepot";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <NavbarBootstrap />
       <Container>
          <Switch>
            <Route exact={true} path="/" component={HomeDepot}/>
            <Route exact={true} path="/login" component={Login}/>
            <Route exact={true} path="/createAccount" component={CreateAccount}/>
            <Route exact={true} path="/forgotPsw" component={ForgotPassword}/>
            <Route exact={true} path="/recoveryPsw/:email" component={RecoveryPassword}/>
          </Switch>
       </Container>
      </Router>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
