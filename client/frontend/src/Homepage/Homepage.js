import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, IconButton } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';

import HeaderSimple from '../Headers/HeaderSimple';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
  },
  searchField: {
    width: '80vw',
    maxWidth: '700px',
    marginBottom: '25px',
  },
  logo: {
    width: '500px',
    height: '125px',
    marginBottom: '50px',
  },
  contents: {
    marginTop: '100px',
  },
  searchButton: {
    fontSize: '22pt',
    marginLeft: '6px',
    color: 'rgb(230, 95, 85)',
  },
}));

function Homepage() {
  const styles = useStyles();
  const [query, changeQuery] = useState('');
  const [loginRedirect, changeLoginRedirect] = useState(false);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  function handleQueryChange(_, newValue) {
    changeQuery(newValue);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && query.length !== 0) {
      window.location.href = `/result/${query}`;
    }
  }

  const entries = ['one', 'on2', 'on3'];

  return (
    <div className={styles.container}>
      <HeaderSimple />
      {loginRedirect && <Redirect to="/login" />}
      <div className={styles.contents}>
        <img src={logo} className={styles.logo} alt="Chefmate logo" />
        <br />
        <Autocomplete
          freeSolo
          disableClearable
          options={entries.map((option) => option)}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="Search"
                type="search"
                variant="outlined"
                className={styles.searchField}
                value={query}
              />
              <a href={query.length !== 0 ? `/result/${query}` : undefined}>
                <IconButton
                  edge="start"
                  className={styles.searchButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <FaSearch />
                </IconButton>
              </a>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default Homepage;
