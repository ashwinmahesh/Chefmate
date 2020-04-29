import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import LikesExpansionPanel from './LikesExpansionPanel';
import { CircularProgress, Typography } from '@material-ui/core';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';

const useStyles = (colors) =>
  makeStyles((_) => ({
    wrapper: {
      background: colors.background,
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
    title: {
      color: colors.primaryText,
      fontWeight: 'bold',
      fontSize: '20pt',
      textAlign: 'left',
      padding: '0',
      margin: '0',
      marginTop: '20px',
      marginLeft: '20px',
    },
    pageDescription: {
      textAlign: 'left',
      padding: '0',
      margin: '0',
      marginTop: '5px',
      marginLeft: '20px',
      fontStyle: 'italic',
      color: colors.secondaryText,
    },
  }));

type Props = {
  theme: String,
};

function Likes(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const [likes, changeLikes] = useState({});
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
      const likedUrls = data['content']['likes'];
      const updatedUrls = [];
      for (var url in likedUrls) updatedUrls.push(url.replace(/%114/g, '.'));
      fetchDocuments(updatedUrls).then(() => {
        changeLoading(false);
      });
    }
  }

  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    if (data['success'] === 1) changeLikes(data['content']['documents']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  function renderLikes() {
    const output = [];
    for (var i = 0; i < likes.length; i++) {
      const doc = JSON.parse(likes[i]);
      output.push(
        <LikesExpansionPanel
          title={doc['title']}
          url={doc['_id']}
          body={doc['body']}
          likedOn={'March 22, 2020'}
          mode="like"
        />
      );
    }
    return output;
  }

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch="" />
      <Typography className={styles.title}>Your Likes</Typography>
      <Typography className={styles.pageDescription}>
        Liked pages will be ranked higher on all subsequent searches.
      </Typography>
      <div className={styles.panelsWrapper}>
        {isLoading ? (
          <CircularProgress className={styles.loading} size={100} />
        ) : (
          renderLikes()
        )}
      </div>
        <Footer></Footer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Likes);
