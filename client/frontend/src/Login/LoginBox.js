import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: '.9',
    backgroundColor: 'white',
    width: '700px',
    height: '350px',
    position: 'absolute',
    left: '25%',
    top: '25%',
    borderRadius: '4px',
    boxShadow: '3px 3px 4px 4px grey',
    zIndex: '2',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '500px',
  },
}));

export default function LoginBox(props) {
  const styles = useStyles();
  return <div className={styles.container}>{props.children}</div>;
}
