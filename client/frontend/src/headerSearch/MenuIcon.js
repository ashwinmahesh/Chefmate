import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { FaBars, FaThumbsUp, FaThumbsDown, FaHistory } from 'react-icons/fa';
import { green, red } from '@material-ui/core/colors';

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
}));

export default function MenuIcon() {
  const styles = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [darkMode, changeDarkMode] = useState(false);

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
  }
  function handleClose() {
    setAnchorElement(null);
  }
  function handleDarkModeChange(event) {
    changeDarkMode(event.target.checked);
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
      <Menu
        id="simple-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className={styles.menu}>
          <FaThumbsUp className={[styles.iconStyle, styles.thumbsUp].join(' ')} />
          Likes
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menu}>
          <FaHistory className={[styles.iconStyle].join(' ')} />
          History
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menu}>
          <FaThumbsDown
            className={[styles.iconStyle, styles.thumbsDown].join(' ')}
          />
          Dislikes
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeChange}
                color="primary"
              />
            }
            label="Dark"
          />
        </MenuItem>
      </Menu>
    </>
  );
}
