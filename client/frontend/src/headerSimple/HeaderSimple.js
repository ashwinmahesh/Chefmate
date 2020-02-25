import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { FaBars } from 'react-icons/fa';


// import { MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  barcolor: {
    background: 'rgb(230, 95, 85)',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderSimple() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barcolor}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >

          <FaBars />
            {/* <i className={MoreHorizIcon}></i> */}
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            C H E F M A T E
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
