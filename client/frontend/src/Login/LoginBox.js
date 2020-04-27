import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: '.9',
    backgroundColor: 'white',
    width: '45%',
    height: '20%',
    // height: '300px',
    position: 'absolute',
    left: '25%',
    top: '35%',
    borderRadius: '6px',
    boxShadow: '3px 3px 4px 4px grey',
    display: 'block',
    padding: '20px'
  },
  
}));

export default function LoginBox(props) {
  const styles = useStyles();
  return <div className={styles.container}>{props.children}
   
  </div>;
}
