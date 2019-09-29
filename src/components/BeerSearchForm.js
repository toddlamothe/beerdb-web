import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class BeerSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city : "",
      state : "", 
      zip : ""
    }
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    console.log("beer search!");
    event.preventDefault();
  } 
  
  render() {
    return (
      <Form>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" size="sm" placeholder="enter city" />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" size="sm" placeholder="enter state" />
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" size="sm" placeholder="enter zip" />
        </Form.Group>
        <Button variant="primary" type="submit">Search</Button>&nbsp;
        <Button variant="primary" type="submit">Near Me</Button>
      </Form>
    );
  } 
}

export default BeerSearchForm