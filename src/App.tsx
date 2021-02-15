import React from 'react';
import TelaLogin from './Login';
import TelaCadastro from "./Cadastro";
import Home from "./Home"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Inserir from "./inserir";
import Venda from "./Venda";
import Carrinho from "./Carrinho";
import HistoricoVendas from "./HistoricoVendas";
import DetalheVenda from "./DetalheVenda";

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
              <Route path="/carrinho">
                  <Carrinho/>
              </Route>
              <Route path="/Venda">
                  <Venda/>
              </Route>
              <Route exact path="/HistVendas">
                  <HistoricoVendas/>
              </Route>
              <Route path="/HistVendas/venda/:id">
                  <DetalheVenda/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
