import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import PlacesList from './components/PlacesList';
import context, { ContextProps } from './context/context';

const App: React.FunctionComponent = () => {
  const contextData: ContextProps = useContext(context)

  return (
    <div id="app">
      <Map />
      <Header />
      <div id='body' className={contextData.displayBody ? 'open' : ''}>
        <PlacesList />
      </div>
    </div>
  );
}

export default App
