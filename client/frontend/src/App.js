import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import LoginPage from './Login/LoginPage';
import Homepage from './Homepage/Homepage';
import SearchResult from './SearchResult/SearchResult';
import Likes from './likes/Likes';
import Dislikes from './likes/Dislikes';
import History from './history/History';
import PageNotFound from './PageNotFound/PageNotFound';
import BeautifulLogin from './BeautifulLogin/BeautifulLogin';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from './redux/actions/user';
import { updateTheme } from './redux/actions/theme';
import BeautifulSignup from './BeautifulLogin/BeautifulSignup';
import Timeout from './SearchResult/Timeout'
import BeautifulHomepage from './PreLogin/BeautifulHomepage';
import Videos from './Videos/Videos';



// import ReactPlayer from "react-player";
// import { FaFileExcel } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  music: {
    display: 'flex',
  },
}));

function App(props) {
  const styles = useStyles();
  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/intro" component={LoginPage} />
            <Route exact path="/login" component={BeautifulLogin} />
            <Route exact path="/about" component={BeautifulHomepage} />
            <Route exact path="/signup" component={BeautifulSignup} />
            <Route path="/result/:query" component={SearchResult} />
            <Route exact path="/history" component={History} />
            <Route exact path="/videos" component={Videos} />
            <Route exact path="/timeout" component={Timeout} />
            <Route exact path="/likes" component={Likes} />
            <Route exact path="/dislikes" component={Dislikes} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    user: state.user,
  };
};

const mapActionsToProps = {
  onUpdateUser: updateUser,
  onUpdateTheme: updateTheme,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
