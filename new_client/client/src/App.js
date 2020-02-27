import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import LandingPage from "./components/profile/LandingPage";
import Landing from "./components/landing/Landing";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import PostForm from "./components/posts/PostForm";
import Posts from "./components/posts/Posts";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/LandingPage" component={LandingPage} />
              <Route exact path="/create" component={PostForm} />
              <Route exact path="/all-posts" component={Posts} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
