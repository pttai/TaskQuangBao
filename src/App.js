import React, { Component } from 'react';
import Login from './components/Login';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import Index from './components/Index';
import Charts from './components/Charts';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/admin' component={Index} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default App;
