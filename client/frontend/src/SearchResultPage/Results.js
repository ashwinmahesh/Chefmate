import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleResult from './SingleResult';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'Left',
    marginLeft: '100px',
    marginTop: '100px',
    width: '650px',
  },
}));

function Results() {
  const styles = useStyles();

  function renderTestSites() {
    const output = [];
    for (var i = 0; i < 10; i++) {
      output.push(
        <SingleResult
          url="https://www.google.com/images"
          title="Google - Images"
          sampleText="Hello i am random sample text for google. This is text related to what you
        have searched for. Blah blah blah here is some more text."
          docId={'32'}
          likes={69420}
          likeStatus={0}
        />
      );
    }
    return output;
  }
  return <div className={styles.container}>{renderTestSites()}</div>;
}

export default Results;
