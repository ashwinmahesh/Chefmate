import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';

import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
    siteUrl: {
      fontSize: '12pt',
      margin: '0px',
      marginBottom: '5px',
      color: colors.searchTextPrimary,
    },
    link: {
      fontSize: '17pt',
      margin: '0px',
      textDecoration: 'none',
      color: colors.linkPrimary,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    sampleText: {
      color: colors.searchTextPrimary,
      margin: '0px',
      marginTop: '7px',
    },
    singleSiteContainer: {
      marginBottom: '30px',
    },
    likeCount: {
      color: colors.likedPagesPrimary,
      margin: '0px',
      display: 'inline-block',
      marginLeft: '20px',
    },
  }));

type Props = {
  url: string,
  title: string,
  desc: string,
  body: string,
  likes: number,
  likeStatus: -1 | 0 | 1,
  theme: String,
  query: string,
};

function SingleResult(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;
  const searchTerms = props.query
    .toLowerCase()
    .trim()
    .split(' ');

  function changeUrl() {
    var output = '';
    let i = props.url.substr(0, 8) == 'https://' ? 8 : 0;
    if (props.url.substr(i, 4) === 'www.') i += 4;
    for (i; i < props.url.length; i++) {
      if (props.url[i] == '/') {
        if (i !== props.url.length - 1) output += ' > ';
      } else output += props.url[i];
    }
    return output;
  }

  /*
    Uses sliding window of length maxLength
    to find window with the most total occurences of
    search terms. We use this window as our sample
    text. We also ensure that the window starts a
    sentence (causes a cleaner looking sample text)
    and that it doesn't contain more than
    (maxLength / 15) newlines or carriage returns,
    which indicate "fluff".

    Current limitations:
    - Doesn't give any preference to windows with a variety of terms.
    - Always chooses the first window with the most occurrences of search
      terms, even if there's a tie.
  */
  function getBestSampleText() {
    var body = props.body;

    var maxTermCount = 0;
    var maxTerm_i = 0;
    var maxTerm_j = maxLength;

    var i = 0;
    var j = maxLength;

    while (j <= body.length) {
      if (startsSentence(i, body)) {
        var window = body.substring(i, j);
        var termCount = getSearchTermCount(window);

        if (termCount > maxTermCount) {
          maxTermCount = termCount;
          maxTerm_i = i;
          maxTerm_j = j;
        }
      }

      i++;
      j++;
    }

    var bestWindow = body.substring(maxTerm_i, maxTerm_j);

    if (maxTermCount == 0 || bestWindow.split(/[\r\n]/).length > maxLength / 15) {
      return props.desc;
    } else {
      return bestWindow;
    }
  }

  /*
    Ensures that the given index "starts a sentence"
    in the given string by checking that it is a
    capital letter and either starts the string
    (== 0) or is preceded by a whitespace
    character.
  */
  function startsSentence(i, str) {
    var whiteSpaceChars = [' ', '\r', '\n'];

    return (
      str[i].charCodeAt(0) >= 65 &&
      str[i].charCodeAt(0) <= 90 &&
      (i == 0 || whiteSpaceChars.includes(str[i - 1]))
    );
  }

  /*
    Gets the total, non-distinct, case-insensitive count of
    search terms contained in the given string.
    We use this to find the window with the most
    search term occurrences.
  */
  function getSearchTermCount(str) {
    var count = 0;

    for (var i = 0; i < searchTerms.length; i++) {
      count += str.toLowerCase().split(searchTerms[i].toLowerCase()).length - 1;
    }

    return count;
  }

  /*
    Returns the given string with words containing
    search terms surrounded by <b> tags.
  */
  function boldSearchTerms(sampleText) {
    var descTerms = sampleText.split(/[ \r\n]/);
    var output = [];
    var length = 0;

    for (var i = 0; i < descTerms.length; i++) {
      var term = descTerms[i];
      var searched = false;

      if (length + term.length >= maxLength) {
        output.push('...');

        break;
      }

      searchTerms.forEach((searchTerm) => {
        if (term.toLowerCase().includes(searchTerm)) {
          searched = true;
        }
      });

      if (searched) {
        output.push(<b>{term}</b>);
      } else {
        output.push(term);
      }

      length += term.length;

      if (i < descTerms.length) {
        //adds whitespace between terms
        output.push(' ');
        length++;
      }
    }

    return output;
  }

  function getFinalSampleText() {
    return boldSearchTerms(getBestSampleText());
  }

  return (
    <div className={styles.singleSiteContainer}>
      <p className={styles.siteUrl}>{url}</p>
      <a className={styles.link} href={redirectUrl}>
        {props.title}
      </a>

      <p className={styles.sampleText}>{getFinalSampleText()}</p>
      <div>
        <LikeDislikeButtons url={props.url} likeStatus={props.likeStatus} />
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(SingleResult);
