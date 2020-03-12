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

type Props = { documents: [{}] };

function Results(props: Props) {
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
          key={i}
        />
      );
    }
    return output;
  }

  function renderSites() {
    const output = [];
    for (var i = 0; i < props.documents.length; i++) {
      const document = JSON.parse(props.documents[i]);
      output.push(
        <SingleResult
          url={document['url']}
          title={document['title']}
          docId={document['_id']}
          likeStatus={0}
          likes={0}
          key={document['_id']}
          sampleText="Hello i am random sample text for google. This is text related to what you
          have searched for. Blah blah blah here is some more text."
        />
      );
    }
    return output;
  }
  return <div className={styles.container}>{renderSites()}</div>;
}

export default Results;
