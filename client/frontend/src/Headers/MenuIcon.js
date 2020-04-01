import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, FormControlLabel, Switch, Drawer } from '@material-ui/core';
import { FaBars, FaThumbsUp, FaThumbsDown, FaHistory } from 'react-icons/fa';
import { green, red } from '@material-ui/core/colors';
import NotImplemented from '../Alerts/NotImplemented';
import logo from '../images/logo.png';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  menu: {
    fontSize: '12.5pt',
  },
  menuButton: {
    marginLeft: '5px',
    color: 'white',
  },
  iconStyle: {
    color: 'rgb(200,200,200)',
    marginRight: '30px',
  },
  thumbsUp: {
    color: green[200],
  },
  thumbsDown: {
    color: red[200],
  },
  menuTextStyle: {
    fontFamily: 'Arial',
    fontSize: '14pt',
    color: 'white',
    textDecoration: 'none',
    '&:visited': {
      color: 'white',
    },
    flex: 1,
  },
  divStyle: {
    width: '250px',
    '&:hover': {
      background: 'rgb(209, 83, 73)',
    },
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
  },
  darkLabel: {
    fontFamily: 'Arial',
    fontSize: '14pt',
    marginLeft: '20px',
    width: '100%',
    color: 'white',
  },
  switchDiv: {
    paddingLeft: '25px',
  },
  drawerPaper: {
    background: 'rgb(230, 95, 85)',
  },
  logo: {
    width: '125px',
    height: '28px',
    marginLeft: '20px',
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
  },
  divider: {
    flex: 1,
    background: 'rgb(190, 190,190)',
  },
  dividierDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

type Props = {
  side: 'left' | 'right',
};

export default function MenuIcon(props: Props) {
  const styles = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [darkMode, changeDarkMode] = useState(
    Boolean(localStorage.getItem('darkMode')) || false
  );
  const [alertOpen, changeAlertOpen] = useState(false);

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
  }
  function handleClose() {
    setAnchorElement(null);
  }
  function handleDarkModeChange(event) {
    changeDarkMode(event.target.checked);
    localStorage.setItem('darkMode', String(event.target.checked));
    // changeAlertOpen(true);
  }

  function handleAlertClose() {
    changeAlertOpen(false);
    changeDarkMode(false);
  }

  return (
    <>
      <IconButton
        edge="start"
        className={styles.menuButton}
        aria-label="menu"
        onClick={handleClick}
      >
        <FaBars />
      </IconButton>
      <Drawer
        anchor={props.side}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        classes={{ paper: styles.drawerPaper }}
      >
        <div className={styles.logoDiv}>
          <IconButton
            edge="start"
            className={styles.menuButton}
            aria-label="menu"
            onClick={handleClose}
          >
            <FaBars />
          </IconButton>
          <a href="/">
            <img src={logo} className={styles.logo} alt="Chefmate logo" />
          </a>
        </div>

        <div className={styles.dividierDiv}>
          <Divider classes={{ root: styles.divider }} light={true} />
        </div>

        <div className={styles.divStyle}>
          <a href="/likes" className={styles.menuTextStyle}>
            <IconButton>
              <FaThumbsUp
                className={[styles.iconStyle, styles.thumbsUp].join(' ')}
              />
            </IconButton>
            Likes
          </a>
        </div>

        <div className={styles.divStyle}>
          <a href="/history" className={styles.menuTextStyle}>
            <IconButton>
              <FaHistory className={[styles.iconStyle].join(' ')} />
            </IconButton>
            History
          </a>
        </div>

        <div className={styles.divStyle}>
          <a href="/dislikes" className={styles.menuTextStyle}>
            <IconButton>
              <FaThumbsDown
                className={[styles.iconStyle, styles.thumbsDown].join(' ')}
              />
            </IconButton>
            Dislikes
          </a>
        </div>

        <div className={[styles.divStyle, styles.switchDiv].join(' ')}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeChange}
                color="primary"
                size="large"
              />
            }
            label={<p className={styles.darkLabel}>Dark Mode</p>}
          />

          <NotImplemented open={alertOpen} handleClose={handleAlertClose} />
        </div>
      </Drawer>
    </>
  );
}
