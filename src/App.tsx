import React from 'react';
import './App.css';
import PlacesList from './components/PlacesList';

const App = () => {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w';
  var map = new mapboxgl.Map({
    container: 'mapContainer',
    style: 'mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3'
  });

  return (
    <div className="app">
      <div id='mapContainer'></div>
      <div className='header outlined'>

      </div>
      <div className='body'>
        <PlacesList />
      </div>
    </div>
  );
}

export default App;
