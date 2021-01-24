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
import { Home } from "./components/Home";
import { Features } from "./components/Features";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <NavbarBootstrap />
       <Container>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/F" component={Features}/>
            <Route exact={true} path="/nv" component={Home}/>
          </Switch>
       </Container>
      </Router>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
