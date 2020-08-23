import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

//SCSS
import './items.scss';

class Items extends Component {
  constructor(props){
    super(props);
    this.state ={
      itemList: [],
    }

    
    
    this.displayItem = this.displayItem.bind(this);
  }

  componentDidMount(){
    fetch('/api/items')
    .then(res => res.json())
    .then(items => {
      this.setState({itemList: items.data});
    });
  }

  displayItem(item){
  
    return (<div className="itemBlock" key={item._id}>
              <div className="image"></div>
              <div><h2 className="name">{item.name}</h2></div>
              <div className="desc"><p>{item.desc}</p></div>
              <div> <p className="price">${item.price} each</p> <p className="inventory"> Available : {item.inv_level}</p></div>
              <Button variant="primary" type="submit" > Add to Cart </Button>
              <hr />
            </div>
          );
  }

  render () {
 
    return (
      <div className="items">
      <h1>Please select items to add you cart</h1>
        {this.state.itemList.map( (item) => this.displayItem(item) )}
      
      </div>
    );
  }
}

export default Items;