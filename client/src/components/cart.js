import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//SCSS
import './cart.scss';

class Cart extends Component {

    displayCartItem(item, i){
        return (
            <div key={i}>
                <h1> Order Content </h1>
                <div className="row">
                    <div className="col-sm">
                        <p>{item.sku}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm"><p>{item.price} each</p></div>
                    <div className="col-sm"><p>Quantity : {item.qty}</p></div>
                    <div className="col-sm"><p>Total : {item.price * item.qty}</p></div>
                </div>
                <div className="row">
                    <div className="col-sm"><Button>Remove 1 </Button></div>
                    <div className="col-sm"><Button>Add 1</Button></div>
                    <div className="col-sm"><Button>Remove All</Button></div>
                </div>
                <div className="row"><div className="col-md"><hr /></div></div>
                
            </div>
        );
    }

    displayOrderSummary(order){
        let subTotal = 0; 
        let taxTotal = 0;
   
        order.forEach((item) => {
            let t_price = item.qty * item.price;
            subTotal += t_price;
            taxTotal += t_price * item.tax;
        });
        
        return (
            <div>
                <h1>Order Summary</h1>
                <div className="row"><div className="col"><p>Subtotal : {subTotal}</p></div></div>
                <div className="row"><div className="col"><p>Tax Total : {taxTotal}</p></div></div>
                <div className="row"><div className="col"><p>Grand Total : {subTotal + taxTotal}</p></div></div>
            </div>

        );
    }

    render () {
        //console.log(this.props.values);
        return (
            <div className="items">
                <div className="itemList">{this.props.values.map( (item, index) => this.displayCartItem(item, index) )}</div>
                <div className="orderSummary">{ this.displayOrderSummary(this.props.values) }</div>
            </div>
        );
    }
}

export default Cart;