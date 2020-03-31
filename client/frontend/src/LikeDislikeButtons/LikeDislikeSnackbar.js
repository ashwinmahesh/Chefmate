import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Snackbar } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
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
  mode: String,
  handleClose: () => void,
  transition: any,
};
export default function LikeDislikeSnackbar(props: Props) {
  const snackbarMode = props.mode;
  const styles = useStyles();

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
      TransitionComponent={props.transition}
      onClose={props.handleClose}
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
        <IconButton onClick={props.handleClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}
