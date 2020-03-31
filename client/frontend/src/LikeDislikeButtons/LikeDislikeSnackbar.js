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
  const rootStyle = () => {
    switch (snackbarMode) {
      case 'like':
        return styles.likeSnackBar;
      case 'dislike':
        return styles.dislikeSnackbar;
      default:
        return null;
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ContentProps={{
        classes: {
          root: rootStyle(),
        },
      }}
      open={Boolean(snackbarMode)}
      autoHideDuration={6000}
      TransitionComponent={props.transition}
      onClose={props.handleClose}
      message={
        <div className={styles.snackBarMessageDiv}>
          {(snackbarMode === 'like' || snackbarMode === 'likeNeutral') && (
            <FaThumbsUp size={24} />
          )}
          {(snackbarMode === 'dislike' || snackbarMode === 'dislikeNeutral') && (
            <FaThumbsDown size={24} />
          )}
          <p className={styles.snackbarText}>
            {snackbarMode === 'like' && 'Successfully liked a site'}
            {snackbarMode === 'dislike' && 'Successfully disliked a site'}
            {snackbarMode === 'likeNeutral' && 'Successfully un-liked a site'}
            {snackbarMode === 'dislikeNeutral' && 'Successfully un-disliked a site'}
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
