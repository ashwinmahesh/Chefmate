import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  // TextField,
  // Button,
  // CircularProgress,
  // LinearProgress,
} from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
import { FaArrowLeft } from 'react-icons/fa';

const useStyles = (colors) =>
  makeStyles((_) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    card: {
      width: '450px',
    },
    cardContent: {
      paddingTop: '30px',
    },
    logo: {
      height: '40px',
    },
    header: {
      fontSize: '14pt',
      fontWeight: 'bold',
      fontFamily: 'Arial, Helvetica, sans-serif',
    },
    backArrow: {
      float: 'left',
      marginLeft: '10px',
      verticalAlign: 'center',
      marginTop: '13px',
    },
  }));

type Props = {
  theme: String,
};

function BeautifulSignup(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();

  const [loginRedirect, changeRedirect] = useState(false);

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <Card raised className={styles.card}>
        <CardContent className={styles.cardContent}>
          <a href="/login" className={styles.backArrow}>
            <FaArrowLeft color={colors.headerPrimary} size={24} />
          </a>
          <img src={logo} alt="Chefmate Logo" className={styles.logo} />

          <p className={styles.header}>Create Account</p>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(BeautifulSignup);
