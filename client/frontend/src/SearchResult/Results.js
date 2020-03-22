import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleResult from './SingleResult';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import logo from '../images/logo.png';

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
  logo: {
    height: '30px',
  },
  rightArrow: {
    color: 'rgb(230, 95, 85)',
    fontSize: '13pt',
    marginLeft: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  leftArrow: {
    color: 'rgb(230, 95, 85)',
    fontSize: '13pt',
    marginRight: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  logoAndNext: {
    display: 'block',
    textAlign: 'center',
  },
  pages: {
    display: 'block',
    textAlign: 'center',
    paddingTop: '8px',
    paddingBottom: '10px',
  },
  pageNum: {
    textDecoration: 'none',
    fontSize: '13pt',
    marginLeft: '7px',
    marginRight: '7px',
    fontWeight: 'bold',
    color: 'rgb(230, 95, 85)',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    border: 'none',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

type Props = { documents: [{}], numSearched: Number, searchTime: Number };

function Results(props: Props) {
  const styles = useStyles();
  const pagesPerScreen = 10;
  const pages =
    Math.ceil(props.documents.length / pagesPerScreen) > 0
      ? Math.ceil(props.documents.length / pagesPerScreen)
      : 1;
  const [currentPage, changeCurrentPage] = useState(1);

  function renderTestSites() {
    const output = [];
    for (var i = 0; i < pagesPerScreen; i++) {
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
    for (
      var i = (currentPage - 1) * pagesPerScreen;
      i < props.documents.length && i < currentPage * pagesPerScreen;
      i++
    ) {
      const document = JSON.parse(props.documents[i]);
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

  function nextPressed() {
    const newPage = currentPage + 1;
    changeCurrentPage(newPage);
  }

  function prevPressed() {
    const newPage = currentPage - 1;
    changeCurrentPage(newPage);
  }

  function renderPages() {
    const output = [];
    for (var i = 1; i < pages + 1; i++) {
      output.push(
        <button
          value={i}
          className={styles.pageNum}
          onClick={(event) => changeCurrentPage(event.target.value)}
        >
          {i}
        </button>
      );
    }
    return output;
  }

  return (
    <div className={styles.container}>
      <p className={styles.resultCount}>
        Found {props.numSearched} results ({props.searchTime} seconds)
      </p>
      <div className={styles.resultContainer}>
        {/* {renderTestSites()} */}
        {renderSites()}
        <div className={styles.logoAndNext}>
          <a
            onClick={prevPressed}
            className={currentPage === 1 ? styles.hidden : null}
          >
            <FaChevronLeft className={styles.leftArrow} />
          </a>
          <a href="/">
            <img src={logo} className={styles.logo} alt="Chefmate logo" />
          </a>
          <a
            onClick={nextPressed}
            className={currentPage === pages ? styles.hidden : null}
          >
            <FaChevronRight className={styles.rightArrow} />
          </a>
        </div>
        <div className={styles.pages}>{renderPages()}</div>
      </div>
    </div>
  );
}

export default Results;
