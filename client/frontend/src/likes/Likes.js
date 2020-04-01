import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import LikesExpansionPanel from './LikesExpansionPanel';

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
}));

export default function Likes() {
  const styles = useStyles();
  const [likes, changeLikes] = useState({});
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [documents, changeDocuments] = useState([]);

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
      const likedUrls = data['content']['likes'];
      const updatedUrls = [];
      for (var url in likedUrls) updatedUrls.push(url.replace(/%114/g, '.'));
      console.log('Updated URLs:', updatedUrls);
      fetchDocuments(updatedUrls);
    }
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  function renderTestLikes() {
    const output = [];
    for (var i = 0; i < 10; i++) {
      output.push(
        <LikesExpansionPanel
          title={'Google Images'}
          likedOn={'March 22, 2020'}
          url={'https://www.google.com/'}
          body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
      qui officia deserunt mollit anim id est laborum. Hello World. Testing one
      two three four five six`}
        />
      );
    }
    return output;
  }

  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    if (data['success'] === 1) changeLikes(data['content']['documents']);
  }

  function renderLikes() {
    const output = [];
    for (var i = 0; i < likes.length; i++) {
      const doc = likes[i];
      console.log(likes[i]);
      output.push(
        <LikesExpansionPanel
          title={doc['title']}
          url={doc['_id']}
          body={doc['body']}
          likedOn={'March 22, 2020'}
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
        {/* {renderTestLikes()} */}
        {renderLikes()}
      </div>
    </div>
  );
}
