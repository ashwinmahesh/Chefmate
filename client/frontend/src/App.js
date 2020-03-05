import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Login/LoginPage';
// import LoginCreds from './HomeScreen/LoginCreds';
// import SignUp from './HomeScreen/SignUp';
import Homepage from './Homepage/Homepage';
import SearchResult from './SearchResult/SearchResult';
// import Result from './SearchResultPage/Result';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={LoginPage} />
          <Route path='/search/' component={SearchResult} />
        </div>
      </Router>
    </div>
  );
}

export default App;
