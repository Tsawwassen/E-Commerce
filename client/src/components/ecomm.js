import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import update from 'react-addons-update';

import Items from './items.js';
import Cart from './cart.js';

class EComm extends Component {
  constructor(props){
    super(props);
    this.state ={
      cart: [],
      items:[]
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount(){
    fetch('/api/items')
    .then(res => res.json())
    .then(items => {
      this.setState({items: items.data});
    });
  }

  handleAddToCart(event){

      let {sku, price} = JSON.parse(event.target[0].name);
      let qty = event.target[0].value

      let new_item = { sku: sku, price: Number(price), qty: Number(qty)};

      let added_flag = false; //boolean flag to determine if the event_item is in the cart already or not
  
      //Check if the new_item is in the cart.
      //  If it is, update the qty on cart.
      //  Else, add the new_item to cart.
      this.state.cart.some((item, i) => {
          if(item.sku === new_item.sku){
            //Not sure if this code can be reduced, just remember to step down the object to update the intended key
            this.setState(update(this.state, {
                cart: {
                    [i]: {
                        qty: {
                            $set: this.state.cart[i].qty + new_item.qty
                        }
                    }
                }
            }));
            added_flag = true;
            return true;
          }
          return false;
      });
  
      if(!added_flag){
          this.setState({cart: [...this.state.cart, new_item]})
      }
      event.preventDefault();
  }
 

  render () {
    return (
        <Router>
            <Switch>
            <Route path="/items">
                <Items onSubmit={this.handleAddToCart} items={this.state.items}/>
            </Route>
            <Route path="/cart">
                <Cart values={this.state.cart} />
            </Route>
            <Route path="/">
            <h1>home</h1>
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default EComm;