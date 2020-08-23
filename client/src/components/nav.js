import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class Navigation extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand value='/' onClick={this.props.onClick}>E-Commerce</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link value='/item' onClick={this.props.onClick}>Items</Nav.Link>
            <Nav.Link value='/cart' onClick={this.props.onClick}>View Cart</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;