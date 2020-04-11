import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import googleLogo from '../images/google.svg';

const useStyles = makeStyles((theme) => ({
  googlePaper: {
    display: 'flex',
    alignItems: 'center',
    width: '275px',
    height: '50px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
    },
  },
  googleText: {
    display: 'inline-block',
    flex: 1,
    fontFamily: 'Arial',
    color: 'black',
  },
  googleLink: {
    display: 'flex',
    textDecoration: 'none',
    width: '100%',
    height: '100%',
    '&:visited': {
      color: 'inherit',
    },
    justifyContent: 'flex-end',
  },
}));

export default function GoogleButton() {
  const styles = useStyles();
  return (
    <Paper className={styles.googlePaper} elevation={3}>
      <a href="/auth/google" className={styles.googleLink}>
        <img src={googleLogo} alt="Google logo" />
        <p className={styles.googleText}>Sign In With Google</p>
      </a>
    </Paper>
  );
}
