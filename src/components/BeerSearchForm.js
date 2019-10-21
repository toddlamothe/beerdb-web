import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BeerSearchForm.css';
import BeerSearchFormInvalidCriteriaError from './BeerSearchFormInvalidCriteriaError';

class BeerSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city : "",
      state : "", 
      zip : "",
      lat : "",
      lon : "" ,
      showInvalidCriteriaError : false
    }
        
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleBrewerySearch = this.handleBrewerySearch.bind(this);
  }
  
  handleBrewerySearch(e) {
    e.preventDefault();
    if(!this.searchCriteriaIsValid(this.state)) {
        console.error("Invalid search criteria")
        this.setState({
          showInvalidCriteriaError : true
        });
        return false;
    };

    this.setState({
      lat : null,
      lon : null,
      showInvalidCriteriaError : false
    });
    this.props.onSearchSubmitted(this.state)    
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
  
  searchCriteriaIsValid(searchCriteria) {
      if ( 
          (searchCriteria.city == "" || searchCriteria.city == null) &&
          (searchCriteria.state == "" || searchCriteria.state == null) &&
          (searchCriteria.zip == "" || searchCriteria.zip == null)
      ) {
          // Required form elements are not filled out
          return false;
      }
      return true;
  }
    
  renderError() {
    return (
      <BeerSearchFormInvalidCriteriaError
        visible={this.state.showInvalidCriteriaError} 
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <Container>
        <Row>
          <Col>
            {this.renderError()}
          </Col>
        </Row>
        <Row>
          <Col>          
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
              <Button variant="primary" type="submit" onClick={(e) => this.handleBrewerySearch(e)}>Search</Button>&nbsp;
              <Button variant="primary">Near Me</Button>
            </Form>              
          </Col>
        </Row>
        </Container>
      </React.Fragment>
    );
  } 
}

export default BeerSearchForm


