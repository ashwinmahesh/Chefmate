import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Snackbar } from '@material-ui/core';
import { FaMicrophone } from 'react-icons/fa';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  startSnackBar: {
    background: 'rgb(50, 151, 240)',
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
  mode: 'start' | 'end',
  handleClose: () => void,
  transition: () => JSX.Element,
};

export default function LikeDislikeSnackbar(props: Props) {
  const snackbarMode = props.mode;
  const styles = useStyles();
  const rootStyle = () => {
    switch (snackbarMode) {
      case 'start':
        return styles.startSnackBar;
      case 'end':
        return null;
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
      autoHideDuration={3000}
      TransitionComponent={props.transition}
      onClose={props.handleClose}
      message={
        <div className={styles.snackBarMessageDiv}>
          <FaMicrophone size={24} />
          <p className={styles.snackbarText}>
            {props.mode === 'start'
              ? 'Voice recording started'
              : 'Voice recording finished'}
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
