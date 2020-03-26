import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
  url: String,
  likeStatus: -1 | 0 | 1,
};

export default function LikeDislikeButtons(props: Props) {
  const styles = useStyles();
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

  return (
    <>
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
    </>
  );
}
