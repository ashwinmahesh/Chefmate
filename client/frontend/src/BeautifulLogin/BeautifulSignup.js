import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  TextField,
  Button,
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
    confirmText: {
      fontSize: '14pt',
      fontWeight: 'bold',
      fontFamily: 'Arial, Helvetica, sans-serif',
      textAlign: 'left',
      marginLeft: '20px',
      marginRight: '20px',
      marginBottom: '10px',
    },
    confirmEmail: {
      fontSize: '14pt',
      fontWeight: 'bold',
      fontFamily: 'Arial, Helvetica, sans-serif',
      textAlign: 'left',
      marginLeft: '20px',
      marginRight: '20px',
      marginBottom: '35px',
    },
    creationError: {
      color: 'red',
      fontStyle: 'italic',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '13pt',
      textAlign: 'left',
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

  const [usernameErr, changeUsernameErr] = useState('');
  const [passwordErr, changePasswordErr] = useState(false);
  const [confirmPasswordErr, changeConfirmPasswordErr] = useState(false);
  const [submissionErr, changeSubmissionErr] = useState(false);

  const steps = ['Username', 'Password', 'Confirm'];

  const timer = useRef();

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 1) {
      changeRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    clearTimeout(timer.current);
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

  async function handleNextButtonClicked() {
    if (currentStep === 0) handleStep0NextButtonClick();
    if (currentStep === 1) handleStep1NextButtonClick();
    if (currentStep === 2) handleStep2NextButtonClick();
  }

  function handleStep0NextButtonClick() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setLoading(true);
    timer.current = setTimeout(async () => {
      setLoading(false);
      if (!re.test(String(username).toLowerCase())) {
        changeUsernameErr('Email address not valid');
        return;
      }

      const { data } = await axios.get(`/validateUsername/${username}`);
      console.log('Data:', data);
      if (data.success === 1) {
        changeUsernameErr('');
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
      } else {
        changeUsernameErr('Email already exists');
      }
    }, 1000);
  }

  function handleStep1NextButtonClick() {
    setLoading(true);
    let hasErr = false;
    timer.current = setTimeout(async () => {
      if (password.length < 8) {
        changePasswordErr(true);
        hasErr = true;
      } else changePasswordErr(false);

      if (confirmPassword !== password) {
        changeConfirmPasswordErr(true);
        hasErr = true;
      } else changeConfirmPasswordErr(false);

      setLoading(false);
      if (!hasErr) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
      }
    }, 1000);
  }

  async function handleStep2NextButtonClick() {
    setLoading(true);
    timer.current = setTimeout(async () => {
      const { data } = await axios.post('/processRegister', { username, password });
      setLoading(false);
      if (data['success'] === 1) {
        changeSubmissionErr(false);
        changeRedirect(true);
      } else {
        changeSubmissionErr(true);
      }
    }, 1000);
  }

  function getStepContent(step) {
    if (step === 0) return renderStep0();
    if (step === 1) return renderStep1();
    if (step === 2) return renderStep2();
  }

  function renderStep0() {
    return (
      <>
        <p className={styles.tabDesc}>Enter your email:</p>
        <TextField
          error={usernameErr !== ''}
          label="Email"
          value={username}
          variant="outlined"
          className={styles.emailField}
          onChange={handleUsernameChange}
          helperText={usernameErr}
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

  function renderStep2() {
    return (
      <>
        {submissionErr && (
          <p className={styles.creationError}>
            There was an error creating the account. Please try again later
          </p>
        )}
        <p className={styles.confirmText}>An account will be created for</p>{' '}
        <p className={styles.confirmEmail}>{username}</p>
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
            {steps.map((label) => {
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
                disabled={loading}
              >
                Back
              </Button>
            ) : (
              <Button></Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextButtonClicked}
              disabled={loading}
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Submit'}
            </Button>
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
