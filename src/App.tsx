import React from 'react';
import './App.css';
import PlacesList from './components/PlacesList';

const App = () => {
  return (
    <div className="app">
      <div className='header'>

      </div>
      <div className='body'>
        <PlacesList />
      </div>
    </div>
  );
}

export default App;
