import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import TelaLogin from './Login';



function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/Home"><TelaLogin/></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
