import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class BeerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries : props.breweries,
      markerClickHandler : props.onBreweryClick,
      center : props.center,
      zoom : 3
    }    
    
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  
  onGoogleApiLoaded(map, maps) {
    this.setState( {
      map : map,
      maps : maps
    })

    this.renderMarkers(map, maps);
  }
    
  renderMarkers(clickHandler) {
    var map = this.state.map;
    if (!(this.state.map && this.state.maps)) {
      console.log("GoogleApi not loaded, unable to render markers");
      return;
    }
    
    if (this.props.breweries) {
      var breweryMarker;
      var breweryId;

      const bounds = new window.google.maps.LatLngBounds();
      this.props.breweries.map( (brewery) => {
        bounds.extend(brewery.coords)
        breweryMarker = new this.state.maps.Marker({
          position: brewery.coords,
          map,
          title: 'Hello World!',
          snippet: "Population: 4,137,400",
          icon: require("../images/Icon-Small-40.png"),
        });
        
        breweryMarker.addListener('click', function() {
          breweryId = brewery.id;
          clickHandler(breweryId);
        });
        
        map.fitBounds(bounds);
      })
    }
  }; 

  onMarkerClick(breweryId) {
    // Call parent click handler
    this.state.markerClickHandler(breweryId);
  }

  render() {
    this.renderMarkers(this.onMarkerClick)
    return (
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default BeerMap;