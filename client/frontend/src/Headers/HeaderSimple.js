import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import MenuIcon from '../Headers/MenuIcon';

const useStyles = makeStyles((theme) => ({
  barcolor: {
    background: 'rgb(230, 95, 85)',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  buttonStyle: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function HeaderSimple() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barcolor}>
        <Toolbar>
          <MenuIcon side="left" />
          <Typography variant="h5" className={classes.title}>
            CHEFMATE
          </Typography>
          <a className={classes.buttonStyle} href="/logout">
            <Button color="inherit">Logout</Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}
