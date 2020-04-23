import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import LoginBox from '../Login/LoginBox';
import { Redirect } from 'react-router-dom';
import HomepageBackground from '../Login/HomepageBackground';
import AboutUs from './AboutUs'
import Teammates from './Teammates'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group'


const useStyles = makeStyles((theme) => ({
  img: {
    width: '650px',
    zIndex: '3',
    marginTop: '10px',
  },
}));

export default function BeautifulHomepage(props) {
  const styles = useStyles();

  const [loginRedirect, changeLoginRedirect] = useState(false);

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      {loginRedirect && <Redirect to="/" />}
      {/* <Transition in={prop} timeout={500}> */}
      <HomepageBackground />
      <LoginBox>
        <img src={logo} className={styles.img} alt="Chefmate logo" />
        <br />
        <a href="/login">
          <button id="btn">Continue</button> <br></br>
        </a>
        <button id="btn">About us!</button>
      </LoginBox>
      <div>
        <AboutUs />
      </div>
      <div>
        <Teammates />
      </div>
      {/* </Transition> */}
    </>
  );
}
