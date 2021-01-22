import React from 'react';
import TelaLogin from './Login';
import TelaCadastro from "./Cadastro";
import Home from "./Home"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./config";
import Inserir from "./inserir";
import Venda from "./Venda";


function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  <TelaLogin/>
              </Route>
              <Route path="/cadastrar">
                  <TelaCadastro/>
              </Route>
              <Route path="/Home">
                  <Home/>
              </Route>
              <Route path="/inserir">
                  <Inserir/>
              </Route>
              <Route path="/Venda">
                  <Venda/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
