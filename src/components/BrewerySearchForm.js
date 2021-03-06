import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BrewerySearchForm.css';
import BrewerySearchFormError from './BrewerySearchFormError';
import GeoService from '../services/GeoService';
import { spinnerService } from '../services/SpinnerService';
import ReactGA from 'react-ga';
import {Link} from 'react-router-dom';


import Carousel from 'react-bootstrap/Carousel';


class BrewerySearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city : "",
      state : "",
      zip : "",
      lat : "",
      lng : "" ,
      showError : false
    }

    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleBrewerySearch = this.handleBrewerySearch.bind(this);
    this.handleNearMeSearch = this.handleNearMeSearch.bind(this);
  }

  handleBrewerySearch(e) {
    e.preventDefault();
    ReactGA.event({category: 'Search',action: 'Standard Search'});
    if(!this.searchCriteriaIsValid(this.state)) {
        console.error("Invalid search criteria")
        this.setState({
          showError : true,
          errorMessage : "Invalid search criteria"
        });
        return false;
    } else {
      this.setState({
        showError : false,
        errorMessage : ""
      });
    };

    this.setState({
      lat : "",
      lng : "",
      showError : false
    });

    // City/State/Zip should already be set by
    // the change handlers for those input controls
    this.props.onSearchSubmitted(this.state)
  }

  handleNearMeSearch(e) {
    e.preventDefault();
    spinnerService.show("brewerySearchSpinner");
    ReactGA.event({category: 'Search',action: 'Search Near Me'});

    navigator.geolocation.getCurrentPosition((position) => {
      const geoService = new GeoService();
      geoService.getLocationData(position.coords.latitude, position.coords.longitude, (geoData) => {
        if (geoData && geoData.results) {

          const zipCode = geoData.results[0].address_components.find((element) => {
            return element.types[0] === "postal_code";
          });

          this.setState({zip: zipCode.short_name});
          this.props.onSearchSubmitted(this.state);
        };
      })
      spinnerService.hide("brewerySearchSpinner");
    });

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
      <div>
      <BrewerySearchFormError
        visible={this.state.showError}
        message={this.state.errorMessage}
      />
      <BrewerySearchFormError
        visible={this.props.showError}
        message={this.props.errorMessage}
      />
      </div>
    )
  }

  render() {
    const styles = {
        grid: {
            paddingLeft: 0,
            paddingRight: 0
        },
        col: {
            paddingLeft: 0,
            paddingRight: 0
        }
    };
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col style={styles.col}>
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
                <Button variant="primary" type="submit" onClick={(e) => this.handleNearMeSearch(e)}>Near Me</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <div><hr /></div>
          </Row>
          <Row>
            <small>
              <Link to="/about">About Beerlvr</Link>
            </small>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default BrewerySearchForm
