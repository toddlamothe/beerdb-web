import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'

const BeerMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -44.475883, lng: -73.212074 }} />}
  </GoogleMap>
))

export default BeerMap;