import React from 'react';
import rat from '../images/remi.png';
import { makeStyles } from '@material-ui/core/styles';
import HeaderSimple from '../Headers/HeaderSimple';
import Footer from '../Footer/Footer';

const useStyles = makeStyles({
  pStyle: {
  fontSize: '50px',
  textAlign: 'center',
  color: 'black',
  },
});

export default function PageNotFound() {
  const styles = useStyles();
  return (
    <div>
      <HeaderSimple />
      <p className={styles.pStyle}>Rats! Page not found</p>
      <img src={rat}></img>
    <Footer></Footer>
    </div>
  );
}

