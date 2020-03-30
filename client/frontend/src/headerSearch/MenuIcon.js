import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FaBars } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: '5px',
    color: 'white',
  },
}));

export default function MenuIcon() {
  const styles = useStyles();
  return (
    <>
      <IconButton edge="start" className={styles.menuButton} aria-label="menu">
        <FaBars />
      </IconButton>
    </>
  );
}
