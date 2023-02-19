import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import PlacesList from './components/PlacesList';

export interface Position {
  latitude: number,
  longitude: number,
  fetched: boolean
}

const App: React.FunctionComponent = () => {
  const [displayBody, setDisplayBody] = useState<boolean>(true)
  const [displayMap, setDisplayMap] = useState<boolean>(false)
  const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)
  const [userPosition, setUserPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
    fetched: false
  })

  const toggleBody = () => {
    setDisplayBody(!displayBody)
    setDisplayPlacesList(!displayPlacesList)
  }

  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  let map
  mapboxgl.accessToken = 
    `pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0
    .5AXUHhsjd3pfaGVQObJ72w` as string;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        fetched: true
      })
      map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 13,
      })
      setDisplayMap(true)
    })
  }, [])

  return (
    <div id="app">
      <div id='mapContainer' className={
        displayMap ?
          (displayBody ? '' : 'open')
          :
          'hidden'
      }></div>
      <Header
        displayBody={displayBody}
        toggleBody={toggleBody}
      />
      <div id='body' className={displayBody ? 'open' : ''}>
        <PlacesList
          displayPlacesList={displayPlacesList}
          userPosition={userPosition}
          map={map}
        />
      </div>
    </div>
  );
}

export default App
