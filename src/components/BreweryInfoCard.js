import React from 'react';
import './BreweryInfoCard.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import BreweryDataService from '../services/BreweryService';
import { spinnerService } from '../services/SpinnerService';

class BreweryInfoCard extends React.Component {
  constructor(props) {
    super(props);
    var directionsUrlBase = "https://www.google.com/maps/dir/?api=1&origin=&destination=";
    var directionsUrl = directionsUrlBase + props.brewery.coords.lat + ", " + props.brewery.coords.lng;
    this.state = {
      brewery : props.brewery,
      breweryDirectionsUrl : directionsUrl,
      beers : []
    }
  }

  componentDidMount() {
    var breweryService = new BreweryDataService();
    spinnerService.show("brewerySearchSpinner");
    breweryService.getBreweryBeers(this.state.brewery.id).then((beers) => {
      if (beers) {
        this.setState( {
          beers : beers
        })
      } else {
        // Search returned no results
        console.log("brewery has no beers");
      }
      spinnerService.hide("brewerySearchSpinner");
    });
  }

  render() {
    return (
      <div>
        <div className="brewery-search-directions">
            <a target="#" href={this.state.breweryDirectionsUrl}>
              Directions
            </a> |
            <a target="#" href={this.state.brewery.url}>
              Website
            </a>
        </div>
        <div>
          <small>
            {this.state.brewery.description} <br/>
          </small>
        </div>
          <div>
          <hr />
          <Alert variant="primary">
            Beers:
          </Alert>
          <Container>
          {
            this.state.beers.map( (beer) => (
              <Row key={beer.name} className="show-grid" float="center">
                <Col className="beer-label-col" xs={3} md={2}>
                  {
                    beer.labels && beer.labels.icon &&
                    <img
                      src={beer.labels.icon}
                      alt={beer.name}
                    />
                  }
                </Col>
                <Col className="beer-text-col" xs={9} md={10}>
                  {beer.name} <small>({(beer.style && beer.style.shortName) ? beer.style.shortName : "unspecified"})</small>
                </Col>
              </Row>
              )
            )
          }
          </Container>
        </div>
      </div>



    )
  }
}

export default BreweryInfoCard;
