import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Route, Link} from 'react-router-dom';

class BeerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter : props.center,
      mapZoom : props.zoom,
      fitBounds : props.fitBounds,
      mapStateChanged : props.mapStateChanged,
      breweries : props.breweries,
      markerClickHandler : props.onBreweryClick
    }

    this.renderMarkers = this.renderMarkers.bind(this);
  }

  onGoogleApiLoaded(map, maps) {
    map.addListener('dragend', () => {
      this.state.mapStateChanged(this.mapState(map), false);
    });

    map.addListener('zoom_changed', () => {
      this.state.mapStateChanged(this.mapState(map));
    });

    this.setState( {
      map : map,
      maps : maps
    });

  }

  mapState(map) {
    return {
      center : {
        lat: map.center.lat(),
        lng : map.center.lng()
      },
      zoom : map.zoom
    };
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
        var breweryIcon = (brewery.images && brewery.images.icon) ?  brewery.images.icon : require("../images/Icon-Small-40.png")
        bounds.extend(brewery.coords)
        breweryMarker = new this.state.maps.Marker({
          position: brewery.coords,
          map,
          title: '[BREWERY NAME]',
          snippet: "[BREWERY SNIPPET]",
          icon: breweryIcon,
        });

        breweryMarker.addListener('click', function() {
          breweryId = brewery.id;
          map.panTo(this.getPosition());
          clickHandler(breweryId);
        });
      });
      if (this.props.fitBounds) {
        map.fitBounds(bounds);
      }
      this.state.mapStateChanged(this.mapState(map));
    };
  };

  componentDidUpdate() {
    this.renderMarkers(this.state.markerClickHandler);
  }

  render() {
    return (
      <div style={{ height: '89vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw" }}
          center={this.state.mapCenter}
          defaultZoom={this.state.mapZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default BeerMap;
