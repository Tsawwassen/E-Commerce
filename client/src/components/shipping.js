import React from 'react';
import {Form, Button } from 'react-bootstrap';
import AddressForm from './address_form.js';

function Shipping({onSubmit, onChange, shipping, onClick})  {
    return (<div>
        <h1>Enter Shipping info</h1>
        <Form onSubmit={onSubmit}>
            <AddressForm onChange={onChange} value={shipping} />

            <Button variant="primary" type="submit"> Continue to Payment </Button>  
            <Button onClick={onClick.useBilling}>Use billing Address</Button>  
            <Button onClick={onClick.usePickup}>Pickup in store</Button>   
        </Form>
    </div>);
}
export default Shipping;