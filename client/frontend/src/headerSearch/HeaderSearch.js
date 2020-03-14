import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import { FaBars, FaSearch } from 'react-icons/fa';
import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '45px',
    background: 'rgb(230, 95, 85)',
    padding: '1px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '15px',
    paddingRight: '5px',
    minWidth: '700px',
  },
  barsStyle: {
    color: 'white',
  },
  menuButton: {
    marginLeft: '5px',
  },
  searchField: {
    height: '35px',
    background: 'white',
    fontSize: '13pt',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginLeft: '15px',
    width: '350px',
  },
  buttonStyle: {
    marginLeft: '5px',
    width: '35px',
    height: '41px',
  },
  searchButton: {
    marginLeft: '3px',
  },
  logoutButton: {
    textDecoration: 'none',
    color: 'white',
  },
  welcomeText: {
    display: 'inline-block',
    color: 'rgb(249,249,249)',
    fontSize: '13pt',
    marginRight: '30px',
  },
  leftDiv: {},
  rightDiv: {
    padding: '1px',
    paddingRight: '15px',
  },
  logo: {
    width: '100px',
    height: '25px',
  },
}));

export default function HeaderSearch() {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftDiv}>
        <img src={logo} className={styles.logo} alt="Chefmate logo" />
        <input className={styles.searchField} placeholder="Search" />
        <IconButton
          edge="start"
          className={styles.searchButton}
          color="inherit"
          aria-label="menu"
        >
          <FaSearch className={styles.barsStyle} />
        </IconButton>
      </div>
      <div className={styles.rightDiv}>
        <a className={styles.logoutButton} href="/logout">
          <Button color="inherit">Logout</Button>
        </a>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <FaBars className={styles.barsStyle} />
        </IconButton>
      </div>
    </div>
  );
}
