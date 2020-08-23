import React, { Component } from 'react';
import {Form, Button, Container, Row, Col } from 'react-bootstrap';

//SCSS
import './items.scss';

//I question if this componenet should even have a state values
//// In my head, I expected this componenet to only have JSX functions, but I was having trouble finding where the /api/items fetch call should be called to populate hte screen
class Items extends Component {


  //TODO : I would like to clean up this code and improve how I handle div layouts
  displayItem(item){
    return (
            <div className="itemBlock" key={item._id}>
              <div className="image"></div>
              <div><h2 className="name">{item.name}</h2></div>
              <div className="desc"><p>{item.desc}</p></div>
              <div> <p className="price">${item.price} each</p> <p className="inventory"> Available : {item.inv_level}</p></div>
              <div>
              <Container>
                <Form onSubmit={this.props.onSubmit}>
                  <Row>
                    <Col md={1.2}>
                    <Form.Control as="select" custom className="col-sm" name={JSON.stringify(item)}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                    </Col>
                    <Col>
                    <Button variant="primary" type="submit"> Add to Cart </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
              </div>
              <hr />
            </div>
          );
  }

  render () {
    return (
      <div className="items">
      <h1>Please select items to add you cart</h1>
        {this.props.items.map( (item) => this.displayItem(item) )}
      </div>
    );
  }
}

export default Items;