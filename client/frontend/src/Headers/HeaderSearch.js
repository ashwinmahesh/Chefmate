import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import logo from '../images/logo.png';
import SearchBar from '../SearchBar/SearchBar';
import MenuIcon from './MenuIcon';

import { theme } from '../template/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
  wrapper: {
    height: '45px',
    //background: 'rgb(230, 95, 85)',
    background: colors.headerPrimary,
    padding: '1px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '15px',
    paddingRight: '5px',
    minWidth: '900px',
  },
  logoutButton: {
    textDecoration: 'none',
    color: 'white',
  },
  rightDiv: {
    padding: '1px',
    paddingRight: '15px',
  },
  logo: {
    width: '100px',
    height: '25px',
  },
}));

type Props = {
  initialSearch: String,
  theme: String, 
};

function HeaderSearch(props: Props) {
  //const styles = useStyles();
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  return (
    <div className={styles.wrapper}>
      <div>
        <a href="/">
          <img src={logo} className={styles.logo} alt="Chefmate logo" />
        </a>
        <SearchBar initialSearch={props.initialSearch} />
      </div>
      <div className={styles.rightDiv}>
        <a className={styles.logoutButton} href="/logout">
          <Button color="inherit">Logout</Button>
        </a>
        <MenuIcon side="right" />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(HeaderSearch);
