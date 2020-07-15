import React from 'react';
import './BreweryInfoCard.css';

class BreweryInfoCard extends React.Component {
  constructor(props) {
    super(props);
    var directionsUrlBase = "https://www.google.com/maps/dir/?api=1&origin=&destination=";
    var directionsUrl = directionsUrlBase + props.brewery.coords.lat + ", " + props.brewery.coords.lng;
    this.state = {
      brewery : props.brewery,
      breweryDirectionsUrl : directionsUrl
    }
  }
  
  render() {
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
      </div>
    )
  }
}

export default BreweryInfoCard;