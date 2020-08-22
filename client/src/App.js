//Imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/nav.js';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
    <Router>
      <div className="app">
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/items">
              <h1>Items</h1>
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
    
  );
}

export default App;
