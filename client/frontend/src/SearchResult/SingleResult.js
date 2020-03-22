import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import axios from 'axios';

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
  },
  thumbsDown: {
    fontSize: '14pt',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'rgb(210, 0, 0)',
  },
  neutral: {
    color: 'rgb(200,200,200)',
  },
}));

type Props = {
  url: string,
  title: string,
  sampleText: string,
  likes: number,
  likeStatus: -1 | 0 | 1,
};

export default function SingleResult(props: Props) {
  const styles = useStyles();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;
  const [currentLikeStatus, changeLikeStatus] = useState(props.likeStatus);

  async function likePressed() {
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === 1 ? 0 : 1,
      url: props.url,
    });
    data['success'] === 1 && changeLikeStatus(data['content']['newLikeStatus']);
  }

  async function dislikePressed() {
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === -1 ? 0 : -1,
      url: props.url,
    });
    data['success'] === 1 && changeLikeStatus(data['content']['newLikeStatus']);
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
          <FaThumbsUp
            className={[
              styles.thumbsUp,
              currentLikeStatus === 1 ? styles.green : styles.neutral,
            ].join(' ')}
          />
        </IconButton>
        <IconButton aria-label="Dislike" onClick={dislikePressed}>
          <FaThumbsDown
            className={[
              styles.thumbsDown,
              currentLikeStatus === -1 ? styles.red : styles.neutral,
            ].join(' ')}
          />
        </IconButton>
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
