import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/LoginPage';
import Homepage from './Homepage/Homepage';
import SearchResult from './SearchResult/SearchResult';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/search/" component={SearchResult} />
        </div>
      </Router>
    </div>
  );
}

export default App;
