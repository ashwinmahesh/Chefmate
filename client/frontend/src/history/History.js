import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import { CircularProgress, Typography } from '@material-ui/core';
import HistoryExpansionPanel from './HistoryExpansionPanel';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
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
    wrapper: {
      background: colors.background,
      minHeight: '100vh',
    },
    pageDescription: {
      textAlign: 'left',
      padding: '0',
      margin: '0',
      marginTop: '5px',
      marginLeft: '20px',
      fontStyle: 'italic',
      color: colors.pageDescriptionPrimary,
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
type Props = {
  theme: String,
};

function History(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
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
      fetchDocuments(histLinks).then(() => {
        changeLoading(false);
      });
    }
  }
  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
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
        <HistoryExpansionPanel
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
        Your recently visited pages will be displayed here.
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
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(History);
