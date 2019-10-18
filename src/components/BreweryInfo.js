import React from 'react';
import './BreweryInfo.css';

class BreweryInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log("props = ", props);
    var mapUrlBase = "https://www.google.com/maps/dir/?api=1&origin=&destination=";
    var mapUrl = mapUrlBase + props.brewery.coords.lat + ", " + props.brewery.coords.lng;
    this.state = {
      brewery : props.brewery,
      breweryDirectionsMapUrl : mapUrl
    }
  }
  
  render() {
    return (
      <div>
        <div class="brewery-search-directions">
            <a target="#" href={this.state.breweryDirectionsMapUrl}>
              <img width="40" height="40" src={require("../images/e2c92dcca549e10c8ecf8049fddda317.webp")} />
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

export default BreweryInfo;