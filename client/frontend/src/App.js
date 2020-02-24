import React from 'react';
import './App.css';
import HomepageSimple from './homepageSimple/HomepageSimple';
import HomeScreen from './HomeScreen/HomeScreen'
import LoginPage from './HomeScreen/LoginPage'
import LoginCreds from './HomeScreen/LoginCreds';
import SignUp from './HomeScreen/SignUp';
import LandingPage from './WebPage/LandingPage';


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="wrapper">
        <LandingPage/>
      </div>
    </div>
  );
}

export default App;
