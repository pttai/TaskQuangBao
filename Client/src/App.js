import React, { Component } from 'react';
import Login from './components/Login';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import Index from './components/Index';
import Charts from './components/Charts';
import axios from "axios";
class App extends Component {
  state = {
    greeting: ''
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/helloworld')
    .then(result => this.setState({greeting: result.data.sayHi}))
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/admin' component={Index} />
          </Switch>
        </BrowserRouter>
        <h1>{this.state.greeting}</h1>
      </>
    );
  }
  
};
export default App;
