import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import PlacesList from './components/PlacesList';

const App: React.FunctionComponent = () => {
  const [displayBody, setDisplayBody] = useState<boolean>(true)
  const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)

  const toggleBody = () => {
    setDisplayBody(!displayBody)
    setDisplayPlacesList(!displayPlacesList)
  }

  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  let map
  mapboxgl.accessToken = 'pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w' as string;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3'
    });
  }, [])

  return (
    <div id="app">
      <div id='mapContainer' className={displayBody ? '' : 'open'}></div>
      <Header
        displayBody={displayBody}
        toggleBody={toggleBody}
      />
      <div id='body' className={displayBody ? 'open' : ''}>
        <PlacesList
          displayPlacesList={displayPlacesList}
        />
      </div>
    </div>
  );
}

export default App
