import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import HeaderSearch from '../headerSearch/HeaderSearch';
import { Redirect } from 'react-router-dom';
import Results from './Results';
import loading from '../images/loading.gif';

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
  loading: {
    marginTop: '80px',
  },
}));

function SearchResult(props) {
  const styles = useStyles();
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const oldQuery = props.match.params.query;
  const [documents, changeDocuments] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [numSearched, updateNumSearched] = useState(0);
  const [searchTime, changeSearchTime] = useState(1.12);

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
    const startTime = Date.now();
    const { data } = await axios.get(`/search/${oldQuery}`);
    const docIdList = data['content']['sortedDocIds'];
    updateNumSearched(docIdList.length);
    fetchDocuments(docIdList).then(() => {
      changeSearchTime((Date.now() - startTime) / 1000);
      changeLoading(false);
    });
  }

  async function fetchDocuments(docIdList) {
    const { data } = await axios.post('/fetchDocuments', { docIds: docIdList });
    changeDocuments(data['content']['documents']);
  }

  return (
    <div className={styles.container}>
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch={oldQuery} />
      {isLoading ? (
        <img className={styles.loading} src={loading} alt="loading..." />
      ) : (
        <Results
          documents={documents}
          numSearched={numSearched}
          searchTime={searchTime}
        />
      )}
    </div>
  );
}

export default SearchResult;
