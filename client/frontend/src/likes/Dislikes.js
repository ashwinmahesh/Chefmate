import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import LikesExpansionPanel from './LikesExpansionPanel';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: 'rgb(40,40,40)',
    minHeight: '100vh',
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

export default function Dislikes() {
  const styles = useStyles();
  const [dislikes, changeDislikes] = useState([]);
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
      const dislikedUrls = data['content']['dislikes'];
      const updatedUrls = [];
      for (var url in dislikedUrls) updatedUrls.push(url.replace(/%114/g, '.'));
      fetchDocuments(updatedUrls).then(() => {
        changeLoading(false);
      });
    }
  }

  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    if (data['success'] === 1) changeDislikes(data['content']['documents']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  function renderDislikes() {
    const output = [];
    for (var i = 0; i < dislikes.length; i++) {
      const doc = JSON.parse(dislikes[i]);
      output.push(
        <LikesExpansionPanel
          title={doc['title']}
          url={doc['_id']}
          body={doc['body']}
          likedOn={'March 22, 2020'}
          mode="dislike"
        />
      );
    }
    return output;
  }

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch="" />
      <div className={styles.panelsWrapper}>
        {isLoading ? (
          <CircularProgress className={styles.loading} size={100} />
        ) : (
          renderDislikes()
        )}
      </div>
    </div>
  );
}
