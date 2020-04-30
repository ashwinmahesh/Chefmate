import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';
import logo from '../images/logo.png';
import clsx from 'clsx';
import { green, red } from '@material-ui/core/colors';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import GoogleButton from './GoogleButton';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: '450px',
  },
  cardContent: {
    paddingTop: '30px',
  },
  logo: {
    height: '40px',
  },
  header: {
    fontSize: '14pt',
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  emailField: {
    width: '375px',
    marginTop: '30px',
  },
  passwordField: {
    marginTop: '20px',
    width: '375px',
  },
  buttonSuccess: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12 + 108,
    marginLeft: -12,
  },
  button: {
    marginTop: '15px',
    width: '275px',
    fontSize: '12pt',
    height: '50px',
  },
  signup: {
    display: 'block',
    marginTop: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '13pt',
    '&:hover': {
      textDecoration: 'underline',
    },
    marginBottom: '15px',
  },
  googleButtonDiv: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '25px',
  },
  linearProgress: {
    backgroundColor: 'rgb(230, 95, 85)',
  },
  linearProgressBg: {
    backgroundColor: 'rgb(232, 180, 176)',
  },
  linearProgressRoot: {
    height: 5,
  },
}));

export default function BeautifulLogin() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [usernameErr, changeUsernameErr] = useState(false);
  const [passwordErr, changePasswordErr] = useState(false);
  const [loginRedirect, changeRedirect] = useState(false);

  const timer = useRef();

  const buttonClassname = clsx({
    [styles.buttonSuccess]: success,
  });

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    clearTimeout(timer.current);
  }, []);

  async function handleLoginClick() {
    setLoading(true);
    setSuccess(false);
    const { data } = await axios.post('/processLogin', {
      username: username,
      password: password,
    });
    if (data['success'] === 1) changeRedirect(true);
    else {
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        changeUsernameErr(true);
        changePasswordErr(true);
      }, 1000);
    }
  }

  function handleUsernameChange(event) {
    changeUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    changePassword(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <Card raised className={styles.card}>
        <LinearProgress
          classes={{
            root: styles.linearProgressRoot,
            barColorPrimary: styles.linearProgress,
            colorPrimary: styles.linearProgressBg,
          }}
          variant={loading ? 'indeterminate' : 'determinate'}
          value={100}
        />
        <CardContent className={styles.cardContent}>
          <img src={logo} alt="Chefmate Logo" className={styles.logo} />
          <p className={styles.header}>Sign in to Continue</p>
          <TextField
            error={usernameErr}
            label="Email"
            variant="outlined"
            className={styles.emailField}
            onChange={handleUsernameChange}
            helperText={usernameErr ? 'Email not found' : ' '}
          />
          <TextField
            error={passwordErr}
            label="Password"
            variant="outlined"
            className={styles.passwordField}
            type="password"
            onChange={handlePasswordChange}
            helperText={passwordErr ? 'Password is invalid' : ' '}
          />

          <Button
            variant="contained"
            color="primary"
            className={[buttonClassname, styles.button].join(' ')}
            disabled={loading}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          {loading && (
            <CircularProgress size={24} className={styles.buttonProgress} />
          )}
          <div className={styles.googleButtonDiv}>
            <GoogleButton />
          </div>

          <a className={styles.signup} href="/signup">
            Create an account
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
