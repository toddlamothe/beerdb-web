import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import queryString from 'query-string';
import {Route, Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom'

class BeerMap extends Component {
  constructor(props) {
    super(props);
    console.log("BEERMAP CONSTRUCTOR");
    // Parse querystring parameters first
    const querystringParameters = queryString.parse(props.location.search)
    // var defaultMapState = {
    //     center: {
    //       lat: 39.8283,
    //       lng: -98.5795        
    //     },
    //     zoom : 7
    //   }
    var mapCenter = props.mapState ? props.mapState.center : defaultMapState.center;
    var mapZoom = props.mapState ? props.mapState.zoom : defaultMapState.zoom;

    var parameters = this.parseQueryStringParams(querystringParameters, props);
    
    this.state = {
      // breweries : props.breweries,
      // markerClickHandler : props.onBreweryClick,
      mapStateChangedHandler : props.onMapStateChange,
      center : props.mapState ? props.mapState.center : defaultMapState.center,
      zoom : props.mapState ? props.mapState.zoom : defaultMapState.zoom,
      defaultCenter : defaultMapState.center
    }
    
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    // this.renderMarkers = this.renderMarkers.bind(this);
    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  
  parseQueryStringParams(querystringParameters, props) {
    // If parent passed a center location use it, otherwise use defalt center
    var parameters = {};
    var mapCenter = {};    
    if (querystringParameters.lat && querystringParameters.lng) {
      mapCenter.lat = Number(querystringParameters.lat);
      mapCenter.lng = Number(querystringParameters.lng);
    }
    else {
      // Set an arbitrary default center for now
      mapCenter = {
        lat: 39.8283,
        lng: -98.5795        
      }
    }
    parameters.mapCenter = mapCenter;
    parameters.zoom = querystringParameters.zoom ? Number(querystringParameters.zoom) : 6;
    return parameters;
  }

  onGoogleApiLoaded(map, maps) {    
    map.addListener('dragend', () => {
      console.log("[DRAG END]");
      var newMapCenter = {
        lat: map.center.lat(),
        lng : map.center.lng()
      };
      var newMapZoom = map.zoom;
      this.setQueryStringParams(map)
      this.state.mapStateChangedHandler(newMapCenter, newMapZoom);
    })
    
    this.setState( {
      map : map,
      maps : maps
    })

    // this.renderMarkers(map, maps);
  }
  
  setQueryStringParams(map) {
    // Store the map's current center and zoom level as query 
    // parameters and add to location history
    // console.log("[setQueryParameters]");
    var newRoute = "/?lat=" + map.center.lat() + "&lng=" + map.center.lng() + "&zoom=11";
    this.props.history.push(newRoute);
  }
      
  render() {
    console.log("[MAP RENDER]");
    // this.renderMarkers(this.onMarkerClick)
    return (
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw" }}
          center={this.state.center}
          // defaultCenter={this.state.defaultCenter}
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


// renderMarkers(clickHandler) {
//   var map = this.state.map;
//   if (!(this.state.map && this.state.maps)) {
//     console.log("GoogleApi not loaded, unable to render markers");
//     return;
//   }
// 
//   if (this.props.breweries) {
//     var breweryMarker;
//     var breweryId;
// 
//     const bounds = new window.google.maps.LatLngBounds();
//     this.props.breweries.map( (brewery) => {
//       bounds.extend(brewery.coords)
//       breweryMarker = new this.state.maps.Marker({
//         position: brewery.coords,
//         map,
//         title: '[BREWERY NAME]',
//         snippet: "[BREWERY SNIPPET]",
//         icon: require("../images/Icon-Small-40.png"),
//       });
// 
//       breweryMarker.addListener('click', function() {
//         breweryId = brewery.id;
//         map.panTo(this.getPosition());
//         clickHandler(breweryId);
//       });
//     });
//     console.log("calling fitbounds");
//     map.fitBounds(bounds);
//   }
// }; 
// 
// onMarkerClick(breweryId) {
//   // Call parent click handler
//   this.state.markerClickHandler(breweryId);
// }