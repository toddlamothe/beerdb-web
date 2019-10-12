import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class BeerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries : props.breweries
    }
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  }
  
  static defaultProps = {
    center: {
      lat: 39.8283,
      lng: -98.5795
    },
    zoom: 3
  };
  
  onGoogleApiLoaded(map, maps) {
    console.log("[onGoogleApiLoaded]");
    this.setState( {
      map : map,
      maps : maps
    })
    this.renderMarkers(map, maps);
  }
  
  renderMarkers() {
    console.log("[renderMarkers]");
    var map = this.state.map;
    if (!(this.state.map && this.state.maps)) {
      console.log("GoogleApi not loaded");
      return;
    }
    
    if (this.props.breweries) {
      // console.log("this.props.breweries = ", this.props.breweries);
      const bounds = new window.google.maps.LatLngBounds();
      this.props.breweries.map( (brewery) => {
        bounds.extend(brewery.coords)
        new this.state.maps.Marker({
          position: brewery.coords,
          map,
          title: 'Hello World!',
          icon: require("../images/Icon-Small-40.png")
        });
        map.fitBounds(bounds);
      })
    }
  }; 

  render() {
    console.log("[render BeerMap]");
    this.renderMarkers()
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default BeerMap;