import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleResult from './SingleResult';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import logo from '../images/logo.png';

import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
    wrapper: {
      backgroundColor: colors.background,
    },
    subcontainer: {
      backgroundColor: colors.background,
      textAlign: 'Left',
      marginLeft: '100px',
      width: '650px',
    },
    resultContainer: {
      marginTop: '30px',
    },
    resultCount: {
      fontSize: '12pt',
      color: colors.tertiaryText,
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
      backgroundColor: colors.background,
    },
    hidden: {
      visibility: 'hidden',
    },
    didyoumean: {
      color: 'darkblue',
      fontSize: '20px',
      fontStyle: 'italic',
      fontFamilt: 'Ubuntu',
      fontWeight: 'bold'
    },
    resultChoice: {
      color: 'lightblue',
    },
  }));

type Props = {
  documents: [{}],
  numSearched: Number,
  searchTime: Number,
  RelevantWord: String,
  likesDislikes: [{}],
  theme: String,
  query: String,
};

function Results(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const pagesPerScreen = 10;
  const pages =
    Math.ceil(props.documents.length / pagesPerScreen) > 0
      ? Math.ceil(props.documents.length / pagesPerScreen)
      : 1;
  const [currentPage, changeCurrentPage] = useState(1);
  const likes = props.likesDislikes[0];
  const dislikes = props.likesDislikes[1];

  function nextPressed() {
    const newPage = currentPage + 1;
    changeCurrentPage(newPage);
  }

  function prevPressed() {
    const newPage = currentPage - 1;
    changeCurrentPage(newPage);
  }

  function renderSites() {
    const output = [];
    for (
      var i = (currentPage - 1) * pagesPerScreen;
      i < props.documents.length && i < currentPage * pagesPerScreen;
      i++
    ) {
      const document = JSON.parse(props.documents[i]);

      var likeStatus = 0;
      const dotReplacedUrl = document['_id'].replace(/\./g, '%114');
      if (dotReplacedUrl in likes) likeStatus = 1;
      else if (dotReplacedUrl in dislikes) likeStatus = -1;

      output.push(
        <SingleResult
          url={document['_id']}
          title={document['title']}
          likeStatus={likeStatus}
          likes={Math.floor(Math.random() * 100000 + 5000)}
          key={document['_id']}
          desc={document['description']}
          body={document['body']}
          query={props.query}
        />
      );
    }
    return output;
  }

  function renderPageNumbers() {
    const output = [];
    for (var i = 1; i < pages + 1; i++) {
      output.push(
        <button
          value={i}
          className={styles.pageNum}
          onClick={(event) => changeCurrentPage(Number(event.target.value))}
        >
          {i}
        </button>
      );
    }
    return output;
  }

  function renderPages() {
    return (
      <>
        <div className={styles.logoAndNext}>
          <a
            href={undefined}
            onClick={prevPressed}
            className={currentPage === 1 ? styles.hidden : null}
          >
            <FaChevronLeft className={styles.leftArrow} />
          </a>
          <a href="/">
            <img src={logo} className={styles.logo} alt="Chefmate logo" />
          </a>
          <a
            href={undefined}
            onClick={nextPressed}
            className={currentPage === pages ? styles.hidden : null}
          >
            <FaChevronRight className={styles.rightArrow} />
          </a>
        </div>
        <div className={styles.pages}>{renderPageNumbers()}</div>

      </>
    );
  }

  return (
    <div className={styles.subcontainer}>
      <p className={styles.resultCount}>
        Found {props.numSearched} results ({props.searchTime} seconds)
      </p>
      {/* <p className={styles.didyoumean}>
        Did you mean ({props.RelevantWord})
      </p> */}
      <div className={styles.resultContainer}>
        {renderSites()}
        {renderPages()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Results);
