import React from 'react';
import TelaLogin from './Login';
import TelaCadastro from "./Cadastro";
import Home from "./Home"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./config";


function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={TelaLogin}/>
              <Route path="/cadastrar" component={TelaCadastro}/>
              <Route path="/Home">
                  {isAuthenticated() ? <Home/> : <Redirect to='/'/>}
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
