import React, { Component } from 'react';
import update from 'react-addons-update';

import Navigation from './nav.js';
import Items from './items.js';
import Cart from './cart.js';

class EComm extends Component {
  constructor(props){
    super(props);

    this.HOME = 0;
    this.ITEM = 1;
    this.CART = 2;

    this.state ={
        view: "",
        cart: [],
        items:[]
    }
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount(){
    fetch('/api/items')
    .then(res => res.json())
    .then(items => {
      this.setState({items: items.data});
    });
    this.setState({view: this.HOME});
  }

  handleViewChange(event){

    console.log(event.target.attributes.value.value);
    switch(event.target.attributes.value.value){
        case '/':this.setState({view: this.HOME});break;
        case '/cart':this.setState({view: this.CART});break;
        case '/item':this.setState({view: this.ITEM});break;
        default: console.log("code should never get here");
    }
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
        <div>
            <Navigation onClick={this.handleViewChange}/>
            <div className="container">
                { this.state.view === this.ITEM && <Items onSubmit={this.handleAddToCart} items={this.state.items}/>  }
                { this.state.view === this.CART && <Cart values={this.state.cart} /> }
                { this.state.view === this.HOME &&<h1>home</h1> }
            </div>
        </div>

    );
  }
}

export default EComm;