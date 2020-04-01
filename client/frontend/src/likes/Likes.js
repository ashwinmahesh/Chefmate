import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaStar } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: 'rgb(40,40,40)',
  },
  panelsWrapper: {
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  expansionPanel: {
    background: 'rgb(72,72,72)',
  },
  titleText: {
    color: 'white',
    fontSize: '13pt',
    marginLeft: '20px',
  },
  expandIcon: {
    color: 'white',
    size: 16,
  },
}));

export default function Likes() {
  const styles = useStyles();
  const [likes, changeLikes] = useState([]);
  const [loginRedirect, changeLoginRedirect] = useState(false);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  async function fetchUserInfo() {
    const { data } = await axios.get('/user');
    if (data['success'] === 1) changeLikes(data['content']['likes']);
    else console.log(data['message']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  function renderTestLikes() {
    const output = [];
    for (var i = 0; i < 10; i++) {
      output.push(
        <ExpansionPanel className={styles.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="white" />}
            classes={{ expandIcon: styles.expandIcon }}
          >
            <FaStar size={24} color="gold" />
            <Typography className={styles.titleText}>Google Images</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      );
    }
    return output;
  }

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch="" />
      <div className={styles.panelsWrapper}>
        {renderTestLikes()}
        {/* <ExpansionPanel className={styles.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="white" />}
            classes={{ expandIcon: styles.expandIcon }}
          >
            <Typography className={styles.titleText}>Google Images</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel> */}
      </div>
    </div>
  );
}
