import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BeerSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city : "",
      state : "", 
      zip : "",
      lat : "",
      lon : "" ,
    }
    
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
  }
  
  handleChangeCity(event) {
    this.setState({city: event.target.value});
  }
  
  handleChangeState(event) {
    this.setState({state: event.target.value});
  }
  
  handleChangeZip(event) {
    this.setState({zip: event.target.value});
  }
    
  render() {
    return (
      <Form>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control 
            type="text" 
            size="sm" 
            placeholder="enter city" 
            onChange={this.handleChangeCity}
            />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control 
            type="text" 
            size="sm" 
            placeholder="enter state"             
            onChange={this.handleChangeState}
            />
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control 
            type="text" 
            size="sm" 
            placeholder="enter zip"
            onChange={this.handleChangeZip}
            />
        </Form.Group>
        <Button variant="primary" onClick={() => this.props.onSearchSubmitted(this.state)}>Search</Button>&nbsp;
        <Button variant="primary" type="submit">Near Me</Button>
      </Form>
    );
  } 
}

export default BeerSearchForm