import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import Map from './components/Map';
import Modal from './components/Modal';
import { DataContext, ContextProps } from './context/DataContext';

const App: React.FunctionComponent = () => {
  const contextData: ContextProps = useContext(DataContext)

  return (
    <div id="app">
      <Map />
      <Header />
      <Body />
      {contextData.modal && <Modal />}
    </div>
  );
}

export default App
