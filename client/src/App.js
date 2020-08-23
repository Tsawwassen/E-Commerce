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
      cart:[],
    
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(event){
    //console.log(`Dropdown Value ${event.target[0].value}\n SKU Name ${event.target[0].name}`);
    //console.table(JSON.parse(event.target[0].name)); //Access to the full item object
    //console.log(event.target[0].value); //Access to the dropdown list value

    let selected_item = JSON.parse(event.target[0].name)
    let event_item = {
      sku: selected_item.sku,
      price: Number(selected_item.price),
      qty: Number(event.target[0].value)
    }
    
    let t_cart = this.state.cart;
    let added_flag = false; //boolean flag to determine if the event_item is in the cart already or not

    //Check if the event_item is in the cart.
    //  If it is, update the qty on cart.
    //  Else, add the event_item to cart.
    t_cart.some((item, index) => {
        if(item.sku === event_item.sku){
          item.qty += event_item.qty;
          added_flag = true;
          return true;
        }
        return false;
    });

    if(!added_flag){
      t_cart.push(event_item);
    }
    
    this.setState({cart: t_cart});
    event.preventDefault();
  }



  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />
          <div className="container">
            <Switch>
              <Route path="/items">
                <Items onSubmit={this.handleAddToCart} />
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
