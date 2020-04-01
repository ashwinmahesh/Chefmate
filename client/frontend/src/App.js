import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/LoginPage';
import Homepage from './Homepage/Homepage';
import SearchResult from './SearchResult/SearchResult';
import Likes from './likes/Likes';
import Dislikes from './likes/Dislikes';
import History from './history/History';
import PageNotFound from './PageNotFound/PageNotFound';
import BeautifulLogin from './BeautifulLogin/BeautifulLogin';
import Voice from './voice/Voice';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/intro" component={LoginPage} />
            <Route exact path="/login" component={BeautifulLogin} />
            <Route path="/result/:query" component={SearchResult} />
            <Route exact path="/history" component={History} />
            <Route exact path="/likes" component={Likes} />
            <Route exact path="/dislikes" component={Dislikes} />
            <Route exact path="/voice" component={Voice} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
