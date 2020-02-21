import React from 'react';
import './App.css';
import HomepageSimple from './homepageSimple/HomepageSimple';
import HomeScreen from './HomeScreen/HomeScreen'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="wrapper">
        <HomeScreen/>
      </div>
    </div>
  );
}

export default App;
