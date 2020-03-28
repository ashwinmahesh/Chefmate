import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import { FaBars } from 'react-icons/fa';

import logo from '../images/logo.png';
import SearchBar from '../SearchBar/SearchBar';

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
    minWidth: '900px',
  },
  barsStyle: {
    color: 'white',
  },
  menuButton: {
    marginLeft: '5px',
  },
  buttonStyle: {
    marginLeft: '5px',
    width: '35px',
    height: '41px',
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
};

export default function HeaderSearch(props: Props) {
  const styles = useStyles();

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
