import React, { Component } from 'react';


class Cart extends Component {

  render () {
      console.log(this.props.values);
    return (
      <div className="items">
          <h1> inside cart component</h1>
      </div>
    );
  }
}

export default Cart;