import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'

const BeerMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 44.475883, lng: -73.212074 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -44.475883, lng: -73.212074 }} />}
  </GoogleMap>
))

export default BeerMap;