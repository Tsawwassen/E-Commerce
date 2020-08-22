//Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/nav.js';
import Items from './components/items.js';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
    

    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />
          <div className="container">
            <Switch>
              <Route path="/items">
                <Items />
              </Route>
              <Route path="/orders">
                <h1>Orders</h1>
              </Route>
              <Route path="/">
                <h1>home</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
