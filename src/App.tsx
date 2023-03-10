import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import Map from './components/Map';
import context, { ContextProps } from './context/context';

const App: React.FunctionComponent = () => {
  const contextData: ContextProps = useContext(context)

  return (
    <div id="app">
      <Map />
      <Header />
      <Body />
    </div>
  );
}

export default App
