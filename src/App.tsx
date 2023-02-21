import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import PlacesList from './components/PlacesList';
import { generateMap } from './lib/generateMap';
import { fetchPlacesList } from './request';

export interface Position {
  latitude: number,
  longitude: number,
  fetched: boolean
}

export interface PlaceProps {
  id: number
  name: string
  latitude: number
  longitude: number
  distance?: number
  type: string
  quiet: boolean
  solo: boolean
  gathering: boolean
  wifi: number
  outlet: boolean
}

const App: React.FunctionComponent = () => {
  const [displayBody, setDisplayBody] = useState<boolean>(true)
  
  const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)

  const [userPosition, setUserPosition] = useState<Position>({
    latitude: 49.60833406110522,
    longitude: 6.127097420426896,
    fetched: false
  })

  const [placesList, setPlacesList] = useState<PlaceProps[]>([])
  const [selected, setSelected] = useState<number | undefined>(undefined)

  const toggleBody = () => {
    setDisplayBody(!displayBody)
    setDisplayPlacesList(!displayPlacesList)
  }
  const forceOpenBody = () => {
    setDisplayBody(true)
    setDisplayPlacesList(true)
  }

  const fetchPlacesAndSetState = async () => {
    const result: PlaceProps[] = await fetchPlacesList(userPosition.latitude, userPosition.longitude)
    setPlacesList(result)
  }

  /* useEffect(() => {
    generateMap(setUserPosition, setDisplayMap, placesList, setSelected, forceOpenBody)
  }, [placesList]) */

  useEffect(() => {
    fetchPlacesAndSetState()
  }, [userPosition.fetched])

  return (
    <div id="app">
      <Map
        displayBody={displayBody}
        userPosition={userPosition}
        setUserPosition={setUserPosition}
        placesList={placesList}
        selected={selected}
        setSelected={setSelected}
        toggleBody={toggleBody}
      />
      <Header
        displayBody={displayBody}
        toggleBody={toggleBody}
      />
      <div id='body' className={displayBody ? 'open' : ''}>
        <PlacesList
          placesList={placesList}
          displayPlacesList={displayPlacesList}
          selected={selected}
          setSelected={setSelected}
          userPosition={userPosition}
        />
      </div>
    </div>
  );
}

export default App
