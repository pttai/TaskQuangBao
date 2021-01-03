import React from 'react';
import Login from './components/Login/Login';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import Main from './components/UI/MainUI';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/admin' component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default App;
