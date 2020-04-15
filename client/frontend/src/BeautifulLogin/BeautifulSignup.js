import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  TextField,
  Button,
  // CircularProgress,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
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
    linearProgress: {
      backgroundColor: 'rgb(230, 95, 85)',
    },
    linearProgressBg: {
      backgroundColor: 'rgb(232, 180, 176)',
    },
    linearProgressRoot: {
      height: 5,
    },
    tabDesc: {
      fontSize: '13pt',
      fontWeight: 'bold',
      fontFamily: 'Arial, Helvetica, sans-serif',
      textAlign: 'left',
      marginLeft: '25px',
    },
    emailField: {
      width: '375px',
      marginTop: '15px',
      marginBottom: '35px',
    },
    passwordField: {
      width: '375px',
      marginTop: '15px',
    },
    buttonDiv: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '20px',
      marginRight: '20px',
    },
  }));

type Props = {
  theme: String,
};

function BeautifulSignup(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();

  const [loginRedirect, changeRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [confirmPassword, changeConfirmPassword] = useState('');

  const [usernameErr, changeUsernameErr] = useState(true);
  const [passwordErr, changePasswordErr] = useState(true);
  const [confirmPasswordErr, changeConfirmPasswordErr] = useState(true);

  const steps = ['Username', 'Password', 'Confirm'];

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  function handleUsernameChange(event) {
    changeUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    changePassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    changeConfirmPassword(event.target.value);
  }

  function handlePreviousButtonClicked() {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
    }
  }

  function handleNextButtonClicked() {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
    }
  }

  function getStepContent(step) {
    if (step === 0) return renderStep0();
    if (step === 1) return renderStep1();
  }

  function renderStep0() {
    return (
      <>
        <p className={styles.tabDesc}>Enter your email:</p>
        <TextField
          error={usernameErr}
          label="Email"
          value={username}
          variant="outlined"
          className={styles.emailField}
          onChange={handleUsernameChange}
          helperText={usernameErr ? 'Email already exists' : ' '}
        />
      </>
    );
  }

  function renderStep1() {
    return (
      <>
        <p className={styles.tabDesc}>Enter your password:</p>
        <TextField
          error={passwordErr}
          value={password}
          label="Password"
          variant="outlined"
          className={styles.passwordField}
          onChange={handlePasswordChange}
          type="password"
          helperText={passwordErr ? 'Password must be atleast 8 characters' : ' '}
        />
        <TextField
          error={confirmPasswordErr}
          value={confirmPassword}
          label="Confirm Password"
          variant="outlined"
          className={styles.emailField}
          onChange={handleConfirmPasswordChange}
          type="password"
          helperText={confirmPasswordErr ? 'Passwords do not match' : ' '}
        />
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      {loginRedirect && <Redirect to="/" />}
      <Card raised className={styles.card}>
        <LinearProgress
          classes={{
            root: styles.linearProgressRoot,
            barColorPrimary: styles.linearProgress,
            colorPrimary: styles.linearProgressBg,
          }}
          variant={loading ? 'indeterminate' : 'determinate'}
          value={100}
        />
        <CardContent className={styles.cardContent}>
          <a href="/login" className={styles.backArrow}>
            <FaArrowLeft color={colors.headerPrimary} size={24} />
          </a>
          <img src={logo} alt="Chefmate Logo" className={styles.logo} />

          <p className={styles.header}>Create Account</p>

          <Stepper activeStep={currentStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {getStepContent(currentStep)}

          <div className={styles.buttonDiv}>
            {currentStep > 0 ? (
              <Button
                variant="contained"
                color="white"
                onClick={handlePreviousButtonClicked}
              >
                Back
              </Button>
            ) : (
              <Button></Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextButtonClicked}
              >
                Next
              </Button>
            ) : (
              <Button variant="contained" color="primary">
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(BeautifulSignup);
