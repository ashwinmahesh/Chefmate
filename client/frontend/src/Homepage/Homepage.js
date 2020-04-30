import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, IconButton } from '@material-ui/core';
import { FaSearch, FaWindows } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';
import FeelingLuckyButton from './FeelingLuckyButton';

import HeaderSimple from '../Headers/HeaderSimple';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
    container: {
      width: '100vw',
      height: '100vh',
      background: colors.background,
    },
    searchField: {
      width: '80vw',
      maxWidth: '700px',
      marginBottom: '25px',
    },
    searchFieldBorder: {
      borderColor: colors.primaryText,
      color: colors.primaryText,
    },
    logo: {
      width: '500px',
      height: '125px',
      marginBottom: '50px',
    },
    contents: {
      marginTop: '100px',
    },
    searchButton: {
      fontSize: '22pt',
      marginLeft: '6px',
      color: 'rgb(230, 95, 85)',
    },
    music: {
      backgroundColor: 'red',
      bottom: '0',
      height: '100px',
      position: 'fixed',
    },
  }));
type Props = {
  theme: String,
};
function Homepage(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const [query, changeQuery] = useState('');
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [autocompleteData, changeAutocompleteData] = useState([]);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    fetchRecentQueries();
  }, []);

  async function fetchRecentQueries() {
    const { data } = await axios.get(`/recentQueries`);
    if (data['success'] === 1) {
      const { recent_queries } = data['content'];
      const queryTermList = [];
      for (var i = recent_queries.length - 1; i >= 0; i--) {
        queryTermList.push(recent_queries[i]);
      }
      changeAutocompleteData(queryTermList);
    }
  }

  async function handleAutocompleteChange(_, newValue) {
    changeQuery(newValue);

    if (newValue.length >= 3) {
      const { data } = await axios.get(`/autocomplete/${newValue}`);
      if (data['success'] === 1) {
        const { queries } = data['content'];
        const queryTermList = [];
        for (var i = 0; i < queries.length; i++) {
          queryTermList.push(queries[i]['_id']);
        }
        changeAutocompleteData(queryTermList);
      }
    }
  }
  async function handleQueryChange(event) {
    changeQuery(event.target.value);

    if (event.target.value.length >= 3) {
      const { data } = await axios.get(`/autocomplete/${event.target.value}`);
      if (data['success'] === 1) {
        const { queries } = data['content'];
        const queryTermList = [];
        for (var i = 0; i < queries.length; i++) {
          queryTermList.push(queries[i]['_id']);
        }
        changeAutocompleteData(queryTermList);
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && query.length !== 0) {
      window.location.href = `/result/${query}`;
    }
  }

  async function fetchQueryResults() {
    const { data } = await axios.get(`/search/${query}`);
    if (data['success'] !== 1) {
      return;
    }
    const docUrls = data['content']['sortedDocUrls'];
    fetchDocuments(docUrls);
  }

  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    if (data['success'] !== 1) {
      return;
    }
    const topDocument = JSON.parse(data['content']['documents'][0]);
    window.open(topDocument['_id']);
  }

  function handleFeelingLucky() {
    fetchQueryResults();
  }

  return (
    <div className={styles.container}>
      <HeaderSimple />
      {loginRedirect && <Redirect to="/login" />}
      <div className={styles.contents}>
        <img src={logo} className={styles.logo} alt="Chefmate logo" />
        <br />
        <Autocomplete
          freeSolo
          disableClearable
          options={autocompleteData.map((option) => option)}
          onChange={handleAutocompleteChange}
          onKeyDown={handleKeyDown}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="Search"
                type="search"
                variant="outlined"
                onChange={handleQueryChange}
                className={styles.searchField}
                color="white"
                value={query}
                // InputProps={{
                //   classes: {
                //     // root: styles.searchFieldBorder,
                //     // notchedOutline: styles.searchFieldBorder,
                //   },
                // }}
                InputLabelProps={{
                  classes: {
                    root: styles.searchFieldBorder,
                  },
                }}
              />
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
            </>
          )}
        />
        <FeelingLuckyButton onClick={handleFeelingLucky} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Homepage);
