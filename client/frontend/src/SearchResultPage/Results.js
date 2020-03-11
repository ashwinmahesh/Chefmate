import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));

function Results() {
  const styles = useStyles();
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
