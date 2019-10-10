import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { useState, Fragment } from "react";
import ReactDOM from "react-dom";

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
      onClick={e => props.onMapClick(e)}
    >
      {props.breweries.map((mark, index) => (
        <Marker position={{ lat : mark.lat, lng : mark.lng }} />
      ))}
    </GoogleMap>
  ))
);

class BeerMap extends React.Component {
  constructor(props) {
    super(props);
    console.log("props.breweries = ", props.breweries);
  };

  setMark = e => {
    this.setState({ marks: [...this.state.marks, e.latLng] });
  };

  deleteMarkS = () => {
    this.setState({
      marks: []
    });
  };

  render() {
    console.log("[render]");
    return (
        <Map
          googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapClick={this.setMark}
          breweries={this.props.breweries}
        />
      )
    }

    componentDidMount() {
      console.log("[componentDidMount]");
    }
    
    componentDidUpdate() {
      console.log("[componentDidUpdate]");
      const bounds = new window.google.maps.LatLngBounds();
      const coordinates = this.props.breweries.map(brewery => {
        const latLng = new window.google.maps.LatLng(brewery.lat, brewery.lng);
        bounds.extend(latLng);
        return latLng;
      });      
    }
}

export default BeerMap;