import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import googleLogo from '../images/google.svg';

const useStyles = makeStyles((theme) => ({
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-',
    width: '275px',
    marginTop: '15px',
    height: '50px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
    },
  },
  googleText: { display: 'inline-block', flex: 1 },
  googlePaper: {},
  googleLink: {
    textDecoration: 'none',
    width: '100%',
    height: '100%',
    border: '1px solid red',
    '&:visited': {
      color: 'inherit',
    },
  },
}));

export default function GoogleButton() {
  const styles = useStyles();
  return (
    <Paper className={styles.googleButton}>
      <a href="#" className={styles.googleLink}>
        <img src={googleLogo} />
        <p className={styles.googleText}>Google</p>
      </a>
    </Paper>
  );
}
