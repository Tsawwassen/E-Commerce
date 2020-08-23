//Imports
import React from 'react';
import Navigation from './components/nav.js';
import EComm from './components/ecomm.js';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="app">
          <Navigation />
          <div className="container">
            <EComm />
          </div>
        </div>
    );
}

export default App;
