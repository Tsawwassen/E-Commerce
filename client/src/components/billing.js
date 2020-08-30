import React from 'react';
import {Form, Button } from 'react-bootstrap';
import AddressForm from './address_form.js';

function Billing({onSubmit, onChange, contact, billing})  {
    return (<div>
        <h1>Enter Billing info</h1>
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={contact.email} onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Your name" value={contact.name} onChange={onChange}/>
            </Form.Group>
            <AddressForm onChange={onChange} value={billing} />

            {/* 
            <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              /> */}

        <Button variant="primary" type="submit"> Continue to Shipping Address </Button>       
        </Form>
    </div>);
}
export default Billing;