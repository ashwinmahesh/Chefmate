import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleResult from './SingleResult';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'Left',
    marginLeft: '100px',
    width: '650px',
  },
  resultContainer: {
    marginTop: '30px',
  },
  resultCount: {
    fontSize: '12pt',
    color: 'rgb(120,120,120)',
    marginTop: '20px',
  },
}));

type Props = { documents: [{}], numSearched: Number, searchTime: Number };

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
      console.log(document);
      output.push(
        <SingleResult
          url={document['_id']}
          title={document['title']}
          likeStatus={0}
          likes={0}
          key={document['_id']}
          sampleText={document['description']}
        />
      );
    }
    return output;
  }
  return (
    <div className={styles.container}>
      <p className={styles.resultCount}>
        Found {props.numSearched} results ({props.searchTime} seconds)
      </p>
      <div className={styles.resultContainer}>{renderSites()}</div>
    </div>
  );
}

export default Results;
