import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';

const useStyles = makeStyles((theme) => ({
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
}));

type Props = {
  url: string,
  title: string,
  sampleText: string,
  likes: number,
  likeStatus: -1 | 0 | 1,
  query: String
};

export default function SingleResult(props: Props) {
  const styles = useStyles();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;
  const searchTerms = props.query.toLowerCase().trim().split(" ")

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
    Using sliding window of length maxLength
    to find window with the most total occurences of
    search terms. We use this window as our sample
    text.

    Current limitations:
    - Doesn't give any preference to windows with a variety of terms.
    - Always chooses the first window with the most occurrences of search
      terms, even if there's a tie.
  */
  function getBestSampleText(body) {
    var maxTermCount = 0
    var maxTerm_i = 0
    var maxTerm_j = maxLength

    var i = 0
    var j = maxLength

    while(j <= body.length) {
      var window = body.substring(i, j)
      var termCount = getSearchTermCount(window)

      if(termCount > maxTermCount) {
        maxTermCount = termCount
        maxTerm_i = i
        maxTerm_j = j
      }

      i++
      j++
    }

    return body.substring(maxTerm_i, maxTerm_j)
  }

  /*
    Gets the total, non-distinct count of
    search terms contained in the given string.
    We use this to find the window with the most
    search term occurrences.
  */
  function getSearchTermCount(str) {
    var count = 0

    for(var i = 0; i < searchTerms.length; i++) {
      count += (str.split(searchTerms[i]).length - 1)
    }

    return count
  }

  function getBoldedDesc(sampleText) {
    var descTerms = sampleText.split(" ")
    var output = []
    var length = 0

    for(var i=0; i < descTerms.length; i++) {
      var term = descTerms[i]
      var searched = false

      if(length + term.length > maxLength) {
        output.pop() //remove last space before ellipsis

        output.push(
          <>
            ...
          </>
        )

        break
      }

      searchTerms.forEach(searchTerm => {
        if(term.toLowerCase().includes(searchTerm)) {
          searched = true
        }
      })

      if(searched) {
        output.push(
          <>
          <b>{term}</b>
          </>
        )
      } else {
        output.push(
          <>
          {term}
          </>
        )
      }

      length += term.length

      if(i < descTerms.length) {
        output.push( //adds whitespace between terms
          <> </>
        )

        length++
      }
    }

    return output
  }

  return (
    <div className={styles.singleSiteContainer}>
      <p className={styles.siteUrl}>{url}</p>
      <a className={styles.link} href={redirectUrl}>
        {props.title}
      </a>

      <p className={styles.sampleText}>{getBoldedDesc(getBestSampleText(props.sampleText))}</p>
      <div>
        <LikeDislikeButtons url={props.url} likeStatus={props.likeStatus} />
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
