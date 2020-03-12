import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';
import HeaderSimple from '../headerSimple/HeaderSimple';
import { Redirect } from 'react-router-dom';
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

function SearchResult(props) {
  const styles = useStyles();
  const [query, changeQuery] = useState('');
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [queryRedirect, changeQueryRedirect] = useState(false);
  const oldQuery = props.match.params.query;
  var docIdList = [];

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    fetchQueryResults();
  }, []);

  function handleQueryChange(event) {
    changeQuery(event.target.value);
  }

  async function fetchQueryResults() {
    const { data } = await axios.get(`/search/${oldQuery}`);
    changeQuery('');
    docIdList = data['content']['sortedDocIds'];
    fetchDocuments(docIdList);
  }

  async function fetchDocuments(docIdList) {
    const { data } = await axios.post('/fetchDocuments', { docIds: docIdList });
    console.log(data);
  }

  function searchPressed(e) {
    if (e.keyCode == 13) changeQueryRedirect(true);
  }

  return (
    <div className={styles.container}>
      {loginRedirect && <Redirect to="/" />}
      {queryRedirect && <Redirect to={`/result/${query}`} />}
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
          onKeyDown={searchPressed}
        />
      </div>
      <Results />
    </div>
  );
}

export default SearchResult;
