import React from 'react';
import {Form, Button } from 'react-bootstrap';
import AddressForm from './address_form.js';

function Shipping({onSubmit, onChange, shipping})  {
    return (<div>
        <h1>Enter Shipping info</h1>
        <Form onSubmit={onSubmit}>
            <AddressForm onChange={onChange} value={shipping} />

            <Button variant="primary" type="submit"> Continue to Payment </Button>       
        </Form>
    </div>);
}
export default Shipping;