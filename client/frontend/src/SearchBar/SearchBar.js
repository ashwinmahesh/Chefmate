import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton, Slide } from '@material-ui/core';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { getSpeech } from './getSpeech';
import RecordingSnackbar from './RecordingSnackbar';

const useStyles = makeStyles((theme) => ({
  barWrapper: {
    display: 'inline-block',
    height: '45px',
    paddingLeft: '10px',
    paddingRight: '5px',
    marginLeft: '15px',
    width: '550px',
    backgroundColor: 'white',
  },
  textField: {
    fontSize: '13pt',
    marginLeft: '10px',
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  searchButton: {
    fontSize: '15pt',
    color: 'rgb(230, 95, 85)',
  },
  microphone: {
    fontSize: '15pt',
  },
  divider: {
    height: '25px',
    marginRight: '11px',
  },
}));

type Props = {
  initialSearch: String,
};

export default function SearchBar(props: Props) {
  const styles = useStyles();
  const [query, changeQuery] = useState(props.initialSearch);
  const [listening, setListening] = useState(false);
  const [snackbarMode, setSnackbarMode] = useState(null);
  const [transition, setTransition] = useState(undefined);

  function handleQueryChange(event) {
    changeQuery(event.target.value);
  }

  function handleSpokenQueryChange(newQuery) {
    changeQuery(newQuery);
  }

  function microphoneClicked() {
    const newListening = !listening;
    setListening(newListening);
    getSpeech(newListening, handleSpokenQueryChange);
    setSnackbarMode(newListening ? 'start' : 'end');
    setTransition(() => slideRight);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && query.length !== 0) {
      window.location.href = `/result/${query}`;
    }
  }

  function handleSnackbarClose(event, reason) {
    setSnackbarMode(null);
  }

  function slideRight(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <Paper className={styles.barWrapper}>
      <RecordingSnackbar
        mode={snackbarMode}
        handleClose={handleSnackbarClose}
        transition={transition}
      />
      <div className={styles.flex}>
        <InputBase
          placeholder="Search Chefmate"
          inputProps={{ 'aria-label': 'Search Chefmate' }}
          className={styles.textField}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          value={query}
        />

        <IconButton
          edge="start"
          className={styles.microphone}
          onClick={microphoneClicked}
        >
          <FaMicrophone
            color={listening ? 'rgb(50, 151, 240)' : 'rgb(180,180,180)'}
          />
        </IconButton>

        <Divider className={styles.divider} orientation="vertical" />

        <a href={query.length !== 0 ? `/result/${query}` : undefined}>
          <IconButton
            edge="start"
            className={styles.searchButton}
            color="inherit"
            aria-label="menu"
          >
            <FaSearch />
          </IconButton>
        </a>
      </div>
    </Paper>
  );
}
