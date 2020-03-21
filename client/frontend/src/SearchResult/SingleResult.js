import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

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
  thumbsUp: {
    fontSize: '14pt',
    color: 'green',
  },
  thumbsDown: {
    fontSize: '14pt',
    color: 'rgb(210, 0, 0)',
  },
}));

type Props = {
  url: string,
  docId: string,
  title: string,
  sampleText: string,
  likes: number,
  likeStatus: 0 | 1 | 2,
};

export default function SingleResult(props: Props) {
  const styles = useStyles();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;

  function likePressed() {
    console.log(`Like button pressed for doc #${props.docId}`);
  }

  function dislikePressed() {
    console.log(`Dislike button pressed for #${props.docId}`);
  }

  function changeUrl() {
    var output = '';
    let i = props.url.substr(0, 8) == 'https://' ? 8 : 0;
    for (i; i < props.url.length; i++) {
      if (props.url[i] == '/') output += '>';
      else output += props.url[i];
    }
    return output;
  }

  return (
    <div className={styles.singleSiteContainer}>
      <p className={styles.siteUrl}>{url}</p>
      <a className={styles.link} href={redirectUrl}>
        {props.title}
      </a>
      <p className={styles.sampleText}>{props.sampleText.substr(0, maxLength)}</p>
      <div>
        <IconButton aria-label="Like" onClick={likePressed}>
          <FaThumbsUp className={styles.thumbsUp} />
        </IconButton>
        <IconButton aria-label="Dislike" onClick={dislikePressed}>
          <FaThumbsDown className={styles.thumbsDown} />
        </IconButton>
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
