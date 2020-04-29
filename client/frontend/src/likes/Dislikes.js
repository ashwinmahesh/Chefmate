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
    },
    panelsWrapper: {
      paddingLeft: '15px',
      paddingRight: '15px',
      paddingTop: '20px',
      paddingBottom: '20px',
      minHeight: '100vh',
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

function Dislikes(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
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
      <Typography className={styles.title}>Your Dislikes</Typography>
      <Typography className={styles.pageDescription}>
        Disliked pages will be ranked lower, and will not reappear in subsequent
        searches.
      </Typography>
      <div className={styles.panelsWrapper}>
        {isLoading ? (
          <CircularProgress className={styles.loading} size={100} />
        ) : (
          renderDislikes()
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Dislikes);
