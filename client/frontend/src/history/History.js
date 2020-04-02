import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import { CircularProgress,Typography } from '@material-ui/core';
import HistoryResults from './HistoryResults';


const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20pt',
    textAlign: 'left',
    padding: '0',
    margin: '0',
    marginTop: '20px',
    marginLeft: '20px',
  },
  wrapper: {
    background: 'rgb(40,40,40)',
    minHeight: '100vh',
  },
  pageDescription: {
    textAlign: 'left',
    padding: '0',
    margin: '0',
    marginTop: '5px',
    marginLeft: '20px',
    fontStyle: 'italic',
    color: 'rgb(192,192,192)',
  },
  panelsWrapper: {
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  loading: {
    color: 'rgb(230, 95, 85)',
    marginTop: '150px',
  },
}));

export default function History() {
  const styles = useStyles();
  const [history, changeHistory] = useState([]);
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [isLoading, changeLoading] = useState(true);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  async function fetchUserInfo() {
    const { data } = await axios.get('/user');
    if (data['success'] !== 1) console.log(data['message']);
    else {
      const histLinks = data['content']['history'];
      console.log("History from server:", histLinks);
      fetchDocuments(histLinks).then(() => {
        changeLoading(false);
        console.log("History:", history)
      });
    } 
  }
  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    console.log("Resposne:", data);
    if (data['success'] === 1) changeHistory(data['content']['documents']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  function showHistoryResults() {
    const output = [];
    for (var i = 0; i < history.length; i++) {
      const doc = JSON.parse(history[i]);
      output.push(
        <HistoryResults
          title={doc['title']}
          url={doc['_id']}
          body={doc['body']}
          
        />
      );
    }
    return output;
  }


  return (
    <div className={styles.wrapper}>  
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch="" />
  
      <Typography className={styles.title}>Your History</Typography>
      <Typography className={styles.pageDescription}>
        Your recently searched items will be displayed here.
      </Typography>
      <div className={styles.panelsWrapper}>
        {isLoading ? (
          <CircularProgress className={styles.loading} size={100} />
        ) : (
            showHistoryResults()
          )}
      </div>
    </div>
  );
}
