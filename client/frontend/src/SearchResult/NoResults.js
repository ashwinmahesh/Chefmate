import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaExclamationCircle } from 'react-icons/fa';


const useStyles = makeStyles((theme) => ({
  iconStyle: {
    color: 'rgb(40,40,40)',
    fontSize: '40px',
    marginTop: '80px'
  },
  font: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'rgb(40,40,40)',
  }
}));

export default function NoResults() {
  const styles = useStyles();
  return (
    <div>
        <FaExclamationCircle 
          className={styles.iconStyle}/>
      <p className = {styles.font}>Bummer, we couldn't find anything</p>
      <p> Please use the search bar above to find what you are looking for. </p>
    </div>
  );
}
