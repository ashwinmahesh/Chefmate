import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaStar } from 'react-icons/fa';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';

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
  expansionDetailsDiv: {
    textAlign: 'left',
  },
  likedOnText: {
    color: 'rgb(192,192,192)',
    marginBottom: '15px',
  },
  bodyText: {
    color: 'white',
  },
  likeButtonDiv: {
    background: {},
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
          <ExpansionPanelDetails>
            <div className={styles.expansionDetailsDiv}>
              <Typography className={styles.likedOnText}>
                Liked on: March 22, 2020
              </Typography>
              <Typography className={styles.bodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </Typography>
              <Paper>
                <LikeDislikeButtons likeStatus={1} url={'www.google.com'} />
              </Paper>
            </div>
          </ExpansionPanelDetails>
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
