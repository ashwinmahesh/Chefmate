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
  mode: 'like' | 'dislike' | 'likeNeutral' | 'dislikeNeutral',
  handleClose: () => void,
  transition: () => JSX.Element,
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

  const snackbarMessage = () => {
    if (snackbarMode === 'like') return 'Successfully liked a site';
    else if (snackbarMode === 'dislike') return 'Successfully disliked a site';
    else if (snackbarMode === 'likeNeutral') return 'Successfully un-liked a site';
    else if (snackbarMode === 'dislikeNeutral')
      return 'Successfully un-disliked a site';
    else return 'Invalid Snackbar mode used.';
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
          <p className={styles.snackbarText}>{snackbarMessage()}</p>
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
