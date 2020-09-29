import React from 'react';
import './BreweryInfoCard.css';
import Carousel from 'react-bootstrap/Carousel';
import BreweryDataService from '../services/BreweryService';
import { spinnerService } from '../services/SpinnerService';

class BreweryInfoCard extends React.Component {
  constructor(props) {
    super(props);
    var beersJson = require('./beers.json');
    var directionsUrlBase = "https://www.google.com/maps/dir/?api=1&origin=&destination=";
    var directionsUrl = directionsUrlBase + props.brewery.coords.lat + ", " + props.brewery.coords.lng;
    this.state = {
      brewery : props.brewery,
      breweryDirectionsUrl : this.directionsUrl,
      beers : []
    }
  }

  componentDidMount() {
    var breweryService = new BreweryDataService();
    breweryService.getBreweryBeers(this.state.brewery.id).then((beers) => {
      if (beers) {
        console.log("beers = ", beers);
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
    console.log('render() -> beers = ', this.state.beers);
    if (this.state.beers) {
      console.log("there are ", this.state.beers.length, " beers");
      this.state.beers.map( (beer) => {
        console.log(beer.name);
      })
    }
    return (
      <div>
        <div class="brewery-search-directions">
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

        <Carousel>
          {
            this.state.beers.map( (beer) => (
              <Carousel.Item>
                {
                  beer.labels && beer.labels.medium ? (
                    <img className="d-block w-100" src={beer.labels.medium} alt={beer.name} />
                  ) : (
                    <small>Beer label not available</small>
                  )
                }
                Beer name = {beer.name}
                <Carousel.Caption>
                  <h3>The name of the beer is {beer.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            )
          )
          }
          </Carousel>
        </div>
      </div>
    )
  }
}

export default BreweryInfoCard;
