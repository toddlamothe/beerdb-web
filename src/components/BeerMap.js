import React, { Component } from "react";

class BeerMap extends React.Component {
  constructor(props) {
    super(props);
    console.log("props.breweries = ", props.breweries);
  };

  render() {
    console.log("[render]");
    return (
      <div>I'm a map!</div>
      )
    }

    componentDidMount() {
      console.log("[componentDidMount]");
    }
    
    componentDidUpdate() {
      console.log("[componentDidUpdate]");
      // const bounds = new window.google.maps.LatLngBounds();
      // const coordinates = this.props.breweries.map(brewery => {
      //   const latLng = new window.google.maps.LatLng(brewery.lat, brewery.lng);
      //   bounds.extend(latLng);
      //   return latLng;
      // });      
    }
}

export default BeerMap;