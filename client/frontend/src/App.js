import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/LoginPage';
import Homepage from './Homepage/Homepage';
import SearchResult from './SearchResult/SearchResult';
import Likes from './likes/Likes';
import Dislikes from './likes/Dislikes';
import History from './history/History';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/result/:query" component={SearchResult} />
          <Route exact path="/history" component={History} />
          <Route exact path="/likes" component={Likes} />
          <Route exact path="/dislikes" component={Dislikes} />
        </div>
      </Router>
    </div>
  );
}

export default App;
