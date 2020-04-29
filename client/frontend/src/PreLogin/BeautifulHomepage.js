import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import LoginBox from '../Login/LoginBox';
import { Redirect } from 'react-router-dom';
import HomepageBackground from '../Login/HomepageBackground';
import AboutUs from './AboutUs'
import Teammates from './Teammates'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '50%',
    marginBottom: '2%',
    display: 'block',

  },
  btn:{
    backgroundColor: '#38698e',
    height: '40px',
    // width: '15%',
    width: '150px',
    fontSize: '20px',
    color: 'white',
    borderRadius: '4px',
    justifyContent: 'center',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '0 auto',


  },
  blockView: {
    display: 'block',
    textDecoration: 'none'
  }
}));

export default function BeautifulHomepage(props) {
  const styles = useStyles();

  const [loginRedirect, changeLoginRedirect] = useState(false);

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      {loginRedirect && <Redirect to="/" />}
      <HomepageBackground />
      <LoginBox>
        <img src={logo} className={styles.img} alt="Chefmate logo" /><br></br>
        <a href="/login" className={styles.blockView} >
          <button className={styles.btn}>Continue</button> <br></br>
        </a>
        
      </LoginBox>
      
      <div>
        <AboutUs />
      </div>
      <div>
        <Teammates />
      </div>
    </>
  );
}
