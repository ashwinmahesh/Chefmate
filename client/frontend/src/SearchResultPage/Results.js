import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

// import { ThumbUpAltIcon } from '@material-ui/icons/ThumbUpAltIcon';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'Left',
    marginLeft: '100px',
    marginTop: '100px',
    width: '650px',
  },
  siteUrl: {
    fontSize: '12pt',
    margin: '0px',
    marginBottom: '5px',
  },
  link: {
    fontSize: '17pt',
    margin: '0px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  sampleText: {
    margin: '0px',
    marginTop: '7px',
  },
  singleSiteContainer: {
    marginBottom: '30px',
  },
  likeCount: {
    color: 'green',
    margin: '0px',
    display: 'inline-block',
    marginLeft: '20px',
  },
  thumbsUp: {
    fontSize: '14pt',
    color: 'green',
  },
  thumbsDown: {
    fontSize: '14pt',
    color: 'rgb(210, 0, 0)',
  },
}));

function Results() {
  const styles = useStyles();
  function likePressed() {
    console.log('Like button pressed');
  }

  function dislikePressed() {
    console.log('Dislike button pressed');
  }

  function renderSingleSiteInfo() {
    return (
      <div className={styles.singleSiteContainer}>
        <p className={styles.siteUrl}>www.google.com/images</p>
        <a className={styles.link} href="#">
          Google - Images
        </a>
        <p className={styles.sampleText}>
          Hello i am random sample text for google. This is text related to what you
          have searched for. Blah blah blah here is some more text.
        </p>
        <div>
          <IconButton aria-label="Like" onClick={likePressed}>
            <FaThumbsUp className={styles.thumbsUp} />
          </IconButton>
          <IconButton aria-label="Dislike" onClick={dislikePressed}>
            <FaThumbsDown className={styles.thumbsDown} />
          </IconButton>
          <p className={styles.likeCount}>3300 users liked this page.</p>
        </div>
      </div>
    );
  }

  function renderTestSites() {
    const output = [];
    for (var i = 0; i < 10; i++) {
      output.push(renderSingleSiteInfo());
    }
    return output;
  }
  return <div className={styles.container}>{renderTestSites()}</div>;
}

export default Results;
