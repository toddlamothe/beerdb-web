import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class BeerMap extends Component {
  constructor(props) {
    super(props);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.handleApiLoaded = this.handleApiLoaded.bind(this);
  }
  
  static defaultProps = {
    center: {
      lat: 39.8283,
      lng: -98.5795
    },
    zoom: 3
  };
  
  renderMarkers() {
    // return (
    //   <BreweryMarker />
    // )
  }

  handleApiLoaded(map, maps) {
    // use map and maps objects
    console.log("[handleApiLoaded]");
    var image = '../images/Icon-Small-40.png';
    let marker = new maps.Marker({
      position: this.props.center,
      map,
      title: 'Hello World!',
      icon: require("../images/Icon-Small-40.png")
    });
  }; 


  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
        {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
  // {renderMarkers()}
  // <AnyReactComponent
  //     lat={39.955413}
  //     lng={-98.5795}
  //     text="<<MY MARKER>>"
  //   />

}
 
export default BeerMap;