import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import MenuIcon from '../Headers/MenuIcon';
import { theme } from '../template/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
  barcolor: {
    //background: 'rgb(230, 95, 85)',
    //background: 'rgb(0, 0, 0)',
    background: colors.headerPrimary,
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

type Props = {
  theme: String,
};
function HeaderSimple(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const classes = useStyles(colors)();
  //const classes = useStyles();

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
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(HeaderSimple);


