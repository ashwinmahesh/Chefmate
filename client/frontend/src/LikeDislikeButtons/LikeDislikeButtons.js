import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Snackbar } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CloseIcon from '@material-ui/icons/Close';
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
  likeSnackBar: {
    background: 'green',
  },
  dislikeSnackbar: {
    background: 'rgb(170, 0, 0)',
  },
  closeButton: {
    color: 'white',
  },
  snackbarText: {
    display: 'inline-block',
    margin: '0px',
    marginLeft: '15px',
    fontSize: '12pt',
  },
  snackBarMessageDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type Props = {
  url: String,
  likeStatus: -1 | 0 | 1,
};

export default function LikeDislikeButtons(props: Props) {
  const styles = useStyles();
  const [currentLikeStatus, changeLikeStatus] = useState(props.likeStatus);
  const [snackbarMode, setSnackbarMode] = useState(null);

  async function likePressed() {
    setSnackbarMode('like');
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === 1 ? 0 : 1,
      url: props.url,
    });
    // setSnackbarOpen(true);
    data['success'] === 1 && changeLikeStatus(data['content']['newLikeStatus']);
  }

  async function dislikePressed() {
    setSnackbarMode('dislike');
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === -1 ? 0 : -1,
      url: props.url,
    });
    data['success'] === 1 && changeLikeStatus(data['content']['newLikeStatus']);
  }

  function handleSnackbarClose(event, reason) {
    setSnackbarMode(null);
  }

  function renderSnackbar() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          classes: {
            root:
              snackbarMode === 'like'
                ? styles.likeSnackBar
                : snackbarMode === 'dislike'
                ? styles.dislikeSnackbar
                : null,
          },
        }}
        open={Boolean(snackbarMode)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          <div className={styles.snackBarMessageDiv}>
            {snackbarMode === 'like' && <FaThumbsUp size={24} />}
            {snackbarMode === 'dislike' && <FaThumbsDown size={24} />}
            <p className={styles.snackbarText}>
              {snackbarMode === 'like' && 'Successfully liked a site'}
              {snackbarMode === 'dislike' && 'Successfully disliked a site'}
            </p>
          </div>
        }
        action={
          <IconButton onClick={handleSnackbarClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }

  return (
    <>
      {renderSnackbar()}
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
