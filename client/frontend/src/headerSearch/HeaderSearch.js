import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import { FaBars, FaSearch } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '55px',
    background: 'rgb(230, 95, 85)',
    padding: '1px',
    textAlign: 'left',
    // verticalAlign: 'center',
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
    marginTop: '5px',
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
}));

export default function HeaderSearch() {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <IconButton
        edge="start"
        className={styles.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <FaBars className={styles.barsStyle} />
      </IconButton>
      <input className={styles.searchField} placeholder="Search" />
      <IconButton
        edge="start"
        className={styles.searchButton}
        color="inherit"
        aria-label="menu"
      >
        <FaSearch className={styles.barsStyle} />
      </IconButton>
      {/* <TextField
        id="outlined-search"
        label="Search"
        type="search"
        variant="outlined"
        className={styles.searchField}
        // value={query}
        // onChange={handleQueryChange}
        // onKeyDown={searchPressed}
      /> */}
    </div>
  );
}
