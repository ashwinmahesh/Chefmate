import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import HeaderSearch from '../headerSearch/HeaderSearch';
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
  },
  buttonStyle: {
    width: '50px',
    height: '55px',
  },
  contents: {},
}));

function SearchResult(props) {
  const styles = useStyles();
  const [query, changeQuery] = useState('');
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [queryRedirect, changeQueryRedirect] = useState(false);
  const oldQuery = props.match.params.query;
  const [documents, changeDocuments] = useState([]);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    fetchQueryResults();
  }, []);

  async function fetchQueryResults() {
    const { data } = await axios.get(`/search/${oldQuery}`);
    changeQuery('');
    const docIdList = data['content']['sortedDocIds'];
    fetchDocuments(docIdList);
  }

  async function fetchDocuments(docIdList) {
    const { data } = await axios.post('/fetchDocuments', { docIds: docIdList });
    changeDocuments(data['content']['documents']);
  }

  function searchPressed(newQuery) {
    changeQuery(newQuery);
    changeQueryRedirect(true);
    //Might need this, might not depending on whether useEffect gets called again
    // fetchQueryResults();
  }
  // function searchPressed(e) {
  //   if (e.keyCode == 13) changeQueryRedirect(true);
  // }

  return (
    <div className={styles.container}>
      {loginRedirect && <Redirect to="/" />}
      {queryRedirect && <Redirect to={`/result/${query}`} />}
      <HeaderSearch initialSearch={oldQuery} searchPressed={searchPressed} />
      <Results documents={documents} />
    </div>
  );
}

export default SearchResult;
