import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaSatelliteDish } from 'react-icons/fa';
import { AppBar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  barcolor: {
    backgroundColor: '#753636',
    position: 'fixed',
    marginLeft: '0',
    marginRight: '0',
    width: '30%',
    left: '36%',
    top: '20%',
    height: '60%',
  },
  box: {
    height: '90%',
    backgroundColor: 'rgb(210,107,107)',
  },
  clock: {
    fontSize: '180px',
    padding: '20px',
  },
  title: {
    flexGrow: 1,
    fontSize: '28px',
    padding: '5px',
    fontFamily: 'Ubuntu',
  },
  buttonStyle: {
    textDecoration: 'none',
    color: 'white',
  },
  font: {
    fontFamily: 'Ubuntu',
    padding: '10px',
    fontSize: '28px',
    width: '150px',
  },
  font2: {
    fontFamily: 'Ubuntu',
    fontSize: '28px',
    minWidth: '50px',
  },
  timeout: {
    display: 'flex',
  },
  buttonStyle: {
    textDecoration: 'none',
    color: 'white',
    top: '100px',
  },
}));

export default function Timeout(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.barcolor}>
        <Typography variant="h5" className={classes.title}>
          Session Timeout
        </Typography>
        <div className={classes.box}>
          <div className={classes.timeout}>
            <FaSatelliteDish className={classes.clock}></FaSatelliteDish>
            <p className={classes.font}> Bummer! Our server is down </p>
          </div>
          <p className={classes.font2}> Please try again later! </p>

          <a className={classes.buttonStyle} href="/">
            <Button color="inherit">Home</Button>
          </a>
        </div>
      </AppBar>
    </div>
  );
}
