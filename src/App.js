import React from 'react';
import logo from './logo.svg';
import BeerMap from './BeerMap';
import './App.css';

function App() {
  return (
    <div className="App">

    <BeerMap
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />

    </div>
  );
}

export default App;