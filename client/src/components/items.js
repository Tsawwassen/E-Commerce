import React, { Component } from 'react';


class Items extends Component {

  componentDidMount(){
    fetch('/api/items')
    .then(res => res.json())
    .then(items => console.log(items));
  }


  render () {
    return (
      <div>
        <h1>Inside Items Component</h1>
      </div>
    );
  }
}

export default Items;