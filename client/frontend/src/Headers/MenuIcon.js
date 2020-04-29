import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, FormControlLabel, Switch, Drawer } from '@material-ui/core';
import { FaBars, FaThumbsUp, FaThumbsDown, FaHistory } from 'react-icons/fa';
import { green, red } from '@material-ui/core/colors';
import logo from '../images/logo.png';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { updateTheme } from '../redux/actions/theme';
import { theme } from '../theme/theme';

const useStyles = (colors) =>
  makeStyles((theme) => ({
    menu: {
      fontSize: '12.5pt',
    },
    menuButton: {
      marginLeft: '5px',
      color: 'white',
    },
    iconStyle: {
      color: colors.historyButtonPrimary,
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
      color: colors.textSecondary,
      textDecoration: 'none',
      '&:visited': {
        color: 'white',
      },
      flex: 1,
    },
    divStyle: {
      width: '250px',
      '&:hover': {
        background: colors.menuHoverPrimary,
      },
      display: 'flex',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '22px',
    },
    darkLabel: {
      fontFamily: 'Arial',
      fontSize: '14pt',
      marginLeft: '35px',
      width: '100%',
      color: 'white',
    },
    switchDiv: {
      paddingLeft: '25px',
    },
    drawerPaper: {
      background: colors.menuPrimary,
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
      background: 'white',
    },
    dividierDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
  }));

type Props = {
  side: 'left' | 'right',
  theme: String,
  onUpdateTheme: () => any,
};

function MenuIcon(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const [anchorElement, setAnchorElement] = useState(null);
  const [darkMode, changeDarkMode] = useState(props.theme === 'dark' ? true : false);

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
  }
  function handleClose() {
    setAnchorElement(null);
  }
  function handleDarkModeChange(event) {
    changeDarkMode(event.target.checked);
    const darkModeValue = event.target.checked ? 'dark' : 'light';
    props.onUpdateTheme(darkModeValue);
  }

  function renderMenuItem(text: String) {
    const icon =
      text === 'Likes' ? (
        <FaThumbsUp className={[styles.iconStyle, styles.thumbsUp].join(' ')} />
      ) : text === 'Dislikes' ? (
        <FaThumbsDown className={[styles.iconStyle, styles.thumbsDown].join(' ')} />
      ) : (
        <FaHistory className={[styles.iconStyle].join(' ')} />
      );
    return (
      <div className={styles.divStyle}>
        <a href={'/' + text.toLowerCase()} className={styles.menuTextStyle}>
          <IconButton>{icon}</IconButton>
          {text}
        </a>
      </div>
    );
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

        {renderMenuItem('Likes')}
        {renderMenuItem('History')}
        {renderMenuItem('Dislikes')}

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
        </div>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

const mapActionsToProps = {
  onUpdateTheme: updateTheme,
};

export default connect(mapStateToProps, mapActionsToProps)(MenuIcon);
