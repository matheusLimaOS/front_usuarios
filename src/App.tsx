import React from 'react';
import TelaLogin from './Login';
import TelaCadastro from "./Cadastro";
import Home from "./Home"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./config";
import Inserir from "./inserir";


function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  {isAuthenticated() ? <Redirect to='/Home'/> : <TelaLogin/> }
              </Route>
              <Route path="/cadastrar">
                  {isAuthenticated() ? <Redirect to='/Home'/> : <TelaCadastro/>}
              </Route>
              <Route path="/Home">
                  {isAuthenticated() ? <Home/> : <Redirect to='/'/>}
              </Route>
              <Route path="/inserir">
                  {isAuthenticated() ? <Inserir/> : <Redirect to='/'/>}
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
