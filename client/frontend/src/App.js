import React from 'react';
import logo from './logo.svg';
import './App.css';
import Template from './template/template';
import HomepageSimple from './homepageSimple/HomepageSimple';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="wrapper">
        <HomepageSimple />
      </div>
    </div>
  );
}

export default App;
