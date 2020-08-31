import React from 'react';
import Paypal from './paypal.js';
import { Button } from 'react-bootstrap';


function Payment({cart, shipping, pickup, onClick, onSuccess})  {
    console.table(cart);
    console.table(shipping);

    let subTotal = 0; 
    let taxTotal = 0;

    cart.forEach((item) => {
        let t_price = item.qty * item.price;
        subTotal += t_price;
        taxTotal += t_price * item.tax;
    });

    let shipTotal = 8;

    return (<div>
        <h1>Payment</h1>
        <p>Sub Total : {subTotal}</p>
        <p>Tax Total : {taxTotal}</p>
        <p>Shipping : {shipTotal}</p>
        <p>Amount Due : {subTotal + taxTotal + shipTotal}</p>
        <Paypal due={subTotal + taxTotal + shipTotal} onSuccess={onSuccess}/>
        {(pickup) && <Button onClick={onClick.payAtPickup}>Pay at Pickup</Button>}
    </div>);
}

export default Payment;