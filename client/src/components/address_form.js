import React from 'react';
import {Form } from 'react-bootstrap';

function AddressForm({ onChange, value})  {

    return (
        <div>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Your address" value={value.address} onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" placeholder="Your city" value={value.city} onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="province">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" name="province" placeholder="Your province" value={value.province} onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" name="country" placeholder="Your country" value={value.country} onChange={onChange}/>
            </Form.Group>
        </div>);
}
  

export default AddressForm;