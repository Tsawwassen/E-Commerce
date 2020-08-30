import React, { Component } from 'react';
import update from 'react-addons-update';

import Navigation from './nav.js';
import Items from './items.js';
import Cart from './cart.js';
import Billing from './billing.js';
import Shipping from './shipping.js';

class EComm extends Component {
  constructor(props){
    super(props);

    this.HOME = 0;
    this.ITEM = 1;
	this.CART = 2;
	this.BILLING = 3;
	this.SHIPPING = 4;
	this.PAYMENT = 5;
	this.PICKUP_ADDRESS = {address: "5413 7th ave", city:"Tsawwassen", province:"BC", country:"CAN"};

    this.state ={
        view: "",
        cart: [],
		items:[],
		contact: {name: "", email: ""},		
		billInfo: {address: "", city:"", province:"", country:""},
    	shipInfo: {address: "", city:"", province:"", country:""},
    }
    this.handleViewChange = this.handleViewChange.bind(this);
	this.handleAddToCart = this.handleAddToCart.bind(this);
	
	//Cart component Functions
	this.handleRemoveOne = this.handleRemoveOne.bind(this);
	this.handleRemoveAll = this.handleRemoveAll.bind(this);
	this.handleAddOne = this.handleAddOne.bind(this);

	//Billing component functions
	this.handleSubmitBillingAddress = this.handleSubmitBillingAddress.bind(this);
	this.handleChangeBillingAddress = this.handleChangeBillingAddress.bind(this);

	//Shipping component functions
	this.handleSubmitShippingAddress = this.handleSubmitShippingAddress.bind(this);
	this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
	this.useBilling = this.useBilling.bind(this);
	this.usePickup = this.usePickup.bind(this);

	

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
	/**
	* 	Dev Note
	*	Because the React navbar component is sending link values in event.target.attributes.value.value
	*	and the React billing component button is sending link values in event.target.value
	*	Need to check if one is undefined, and set the link variable to the link value to change the view
	* 		   
	**/
	let link = "";
	if(event.target.value === undefined){
		link = event.target.attributes.value.value;
	} else {
		link = event.target.value;
	}
    switch(link){
        case '/':this.setState({view: this.HOME});break;
        case '/cart':this.setState({view: this.CART});break;
		case '/item':this.setState({view: this.ITEM});break;
		case '/billing':this.setState({view: this.BILLING});break;
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
                cart: {[i]: { qty: {$set: this.state.cart[i].qty + new_item.qty}}}
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
        cart: {[event.target.value]: {qty: {$set: this.state.cart[event.target.value].qty - 1}}}
    }));
  }

  handleRemoveAll(event){
	this.setState({cart: this.state.cart.filter((item, index) =>  index !== Number(event.target.value) )});
  }

  handleAddOne(event){
	this.setState(update(this.state, 
		{cart: {[event.target.value]: {qty: {$set: this.state.cart[event.target.value].qty + 1}}}
    }));
  }
  


  handleSubmitBillingAddress(event){
	this.setState({view: this.SHIPPING});
	event.preventDefault();
  }

  handleChangeBillingAddress(event){

	//Dev Note, Tried to put this code to use a variable as a key, but it didn't seem to like it
	// Not sure why since i've use an index variable for arrays, need to figure out how to use variable for keys
	//   this.setState(update(this.state, 
	// 						{contact: {event.target.name: {$set: event.target.value}}}
	// 						));
	
	switch(event.target.name){
		case 'name': this.setState(update(this.state, 
	 					{contact: {name: {$set: event.target.value}}}
					)); break;
		case 'email': this.setState(update(this.state, 
						{contact: {email: {$set: event.target.value}}}
					)); break;
		case 'address': this.setState(update(this.state, 
						{billInfo: {address: {$set: event.target.value}}}
					)); break;
		case 'city': this.setState(update(this.state, 
						{billInfo: {city: {$set: event.target.value}}}
					)); break;
		case 'province': this.setState(update(this.state, 
						{billInfo: {province: {$set: event.target.value}}}
					)); break;
		case 'country': this.setState(update(this.state, 
						{billInfo: {country: {$set: event.target.value}}}
					)); break;
		default: console.log("code should never get here");
	  }
	  //billInfo: {address: "", city:"", province:"", country:""},
  }

  handleSubmitShippingAddress(event){
	this.setState({ view: this.PAYMENT });
	event.preventDefault();
  }

  handleChangeShippingAddress(event){

	switch(event.target.name){
		case 'address': this.setState(update(this.state, 
						{shipInfo: {address: {$set: event.target.value}}}
					)); break;
		case 'city': this.setState(update(this.state, 
						{shipInfo: {city: {$set: event.target.value}}}
					)); break;
		case 'province': this.setState(update(this.state, 
						{shipInfo: {province: {$set: event.target.value}}}
					)); break;
		case 'country': this.setState(update(this.state, 
						{shipInfo: {country: {$set: event.target.value}}}
					)); break;
		default: console.log("code should never get here");
	  }
	  //shipInfo: {address: "", city:"", province:"", country:""},
  }

  useBilling(){
	  this.setState({ shipInfo: this.state.billInfo});
	  this.setState({ view: this.PAYMENT });
  }

  usePickup(){
	  this.setState({ shipInfo: this.PICKUP_ADDRESS });
	  this.setState({ view: this.PAYMENT });
  }

  render () {
    return (
        <div>
            <Navigation onClick={this.handleViewChange}/>
            <div className="container">
                { this.state.view === this.ITEM && <Items onSubmit={this.handleAddToCart} items={this.state.items}/>  }
                { this.state.view === this.CART && <Cart values={this.state.cart} onClick={{removeOne: this.handleRemoveOne, removeAll:this.handleRemoveAll, addOne: this.handleAddOne, getBilling: this.handleViewChange}}/> }
                { this.state.view === this.HOME && <h1>home</h1> }
				{ this.state.view === this.BILLING && <Billing onSubmit={this.handleSubmitBillingAddress} onChange={this.handleChangeBillingAddress} contact={this.state.contact} billing ={this.state.billInfo} /> }
				{ this.state.view === this.SHIPPING && <Shipping onSubmit={this.handleSubmitShippingAddress} onChange={this.handleChangeShippingAddress} shipping={this.state.shipInfo} onClick ={{useBilling: this.useBilling, usePickup: this.usePickup}}/> }
				{ this.state.view === this.PAYMENT && <h1>PAYMENT</h1> }
			</div>
        </div>

    );
  }
}

export default EComm;