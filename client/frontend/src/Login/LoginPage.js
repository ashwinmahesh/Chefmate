import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import LoginBox from './LoginBox';
import { Redirect } from 'react-router-dom';
import HomepageBackground from './HomepageBackground';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '650px',
    zIndex: '3',
    marginTop: '10px',
  },
}));

export default function Login(props) {
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
      <HomepageBackground />
      <LoginBox>
        <img src={logo} className={styles.img} alt="Chefmate logo" />
        <br />
        <a href="/login">
          <button id="btn">Continue</button>
        </a>
      </LoginBox>
    </>
  );
}
