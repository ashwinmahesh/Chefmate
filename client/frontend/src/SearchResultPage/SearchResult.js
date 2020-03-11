import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';
import HeaderSimple from '../headerSimple/HeaderSimple';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
  },
  searchField: {
    width: '50vw',
    maxWidth: '700px',
    marginTop: '20px',
    float: 'left',
    marginLeft: '50px',
  },
  logo: {
    width: '100px',
    height: '25px',
    marginTop: '30px',
    float: 'left',
    marginLeft: '15px',
    // display: 'block',
  },
  buttonStyle: {
    // marginLeft: '20px',
    width: '50px',
    height: '55px',
  },
  contents: {
    // backgroundColor: 'blue',
    // marginTop: '100px',
  },
}));

function SearchResult() {
  const styles = useStyles();
  const [query, changeQuery] = useState('');

  function handleQueryChange(event) {
    changeQuery(event.target.value);
  }

  async function makeSearch() {
    const { data } = await axios.get(`/search/${query}`);
    changeQuery('');
    console.log('Response: ' + data['message']);
  }
  return (
    <div className={styles.container}>
      <HeaderSimple />
      <div className={styles.contents}>
        <img src={logo} className={styles.logo} alt="Chefmate logo" />
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          className={styles.searchField}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <Results />
    </div>
  );
}

export default SearchResult;
