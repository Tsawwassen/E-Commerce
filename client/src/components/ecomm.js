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
	this.handleRemoveOne = this.handleRemoveOne.bind(this);
	this.handleRemoveAll = this.handleRemoveAll.bind(this);
	this.handleAddOne = this.handleAddOne.bind(this);
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
    switch(event.target.attributes.value.value){
        case '/':this.setState({view: this.HOME});break;
        case '/cart':this.setState({view: this.CART});break;
        case '/item':this.setState({view: this.ITEM});break;
        default: console.log("code should never get here");
    }
  }

  handleAddToCart(event){
      // Dev Note, I like how I get the sku, price, and tax, but I'm note sure if it works in this scenario when I create new_item
      //  Q? Can I extract the values from event and create the new_item object in one line
      let {sku, price, tax} = JSON.parse(event.target[0].name);
      let qty = Number(event.target[0].value);
      let new_item = { sku: sku, price: price, qty: qty, tax: tax};
 
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

  handleRemoveOne(event){

    if((this.state.cart[event.target.value].qty - 1) === 0){ 
      	//Not sure if using the filter method is a good way of removing an item from the array, but it works
      	this.setState({cart: this.state.cart.filter((item, index) =>  index !== Number(event.target.value) )});
      	return ; 
	}
	
    this.setState(update(this.state, {
        cart: {
            [event.target.value]: {
                qty: {
                    $set: this.state.cart[event.target.value].qty - 1
                }
            }
        }
    }));
  }

  handleRemoveAll(event){
	this.setState({cart: this.state.cart.filter((item, index) =>  index !== Number(event.target.value) )});
  }

  handleAddOne(event){
	this.setState(update(this.state, {
        cart: {
            [event.target.value]: {
                qty: {
                    $set: this.state.cart[event.target.value].qty + 1
                }
            }
        }
    }));
  }

  render () {
    return (
        <div>
            <Navigation onClick={this.handleViewChange}/>
            <div className="container">
                { this.state.view === this.ITEM && <Items onSubmit={this.handleAddToCart} items={this.state.items}/>  }
                { this.state.view === this.CART && <Cart values={this.state.cart} onClick={{removeOne: this.handleRemoveOne, removeAll:this.handleRemoveAll, addOne: this.handleAddOne}}/> }
                { this.state.view === this.HOME &&<h1>home</h1> }
            </div>
        </div>

    );
  }
}

export default EComm;