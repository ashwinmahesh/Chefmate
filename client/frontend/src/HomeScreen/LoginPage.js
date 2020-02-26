import React from 'react';
import './homeScreen.css';
import Box from '@material-ui/core/Box';
import logo from '../images/logo.png';
import LoginBox from './LoginBox';
import HomeScreen from './HomeScreen';
import { makeStyles } from '@material-ui/core/styles';
import LoginCreds from './LoginCreds';

const useStyles = makeStyles(theme => ({
  img: {
    width: '650px',
    zIndex: '3',
    marginTop: '10px',
  }
}));

export default function Login(props) {
  const styles = useStyles();
  return (
    <>
      <HomeScreen></HomeScreen>
      <LoginBox>
        <img src={logo} className={styles.img} alt="Chefmate logo" />
        <button id="btn"> LOGIN </button> <br></br>
        <button id="btn"> SIGN UP </button>
      </LoginBox>
    </>
  )
}


