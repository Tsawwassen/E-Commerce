import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//SCSS
import './cart.scss';


class Cart extends Component {

    displayCartItem(item, i){
        return (
            <div key={i}>
                <h3>Order Content</h3>
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
                    <div className="col-sm"><Button onClick={this.props.onClick.removeOne} value={i}>Remove 1 </Button></div>
                    <div className="col-sm"><Button onClick={this.props.onClick.addOne} value={i}>Add 1</Button></div>
                    <div className="col-sm"><Button onClick={this.props.onClick.removeAll} value={i}>Remove All</Button></div>
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
                <div className="row"><div className="col"><h3>Order Summary</h3></div></div>
                <div className="row"><div className="col"><p>Subtotal : {subTotal}</p></div></div>
                <div className="row"><div className="col"><p>Tax Total : {taxTotal}</p></div></div>
                <div className="row"><div className="col"><p>Grand Total : {subTotal + taxTotal}</p></div></div>
                <div className="row"><div className="col"><Button value='/billing' onClick={this.props.onClick.getBilling}>Continue with Order</Button></div></div>
               
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