import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((_) => ({
    lucky: {
      height: '50px',
      fontSize: '16px',
      color: 'white',
      backgroundColor: colors.headerPrimary,
      '&:hover': {
        backgroundColor: colors.headerPrimary,
      },
    },

    loadingCircle: {
      position: 'absolute',
      color: colors.headerPrimary,
      top: '432px',
      left: '50%',
      marginLeft: -10,
    },
  }));

type Props = {
  theme: String,
  onClick: () => void,
};

function FeelingLuckyButton(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const loading = true;
  return (
    <>
      <Button
        className={styles.lucky}
        variant="contained"
        onClick={props.onClick}
        disabled={loading}
      >
        {' '}
        I'm feeling lucky!{' '}
      </Button>
      {loading && <CircularProgress size={28} className={styles.loadingCircle} />}
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(FeelingLuckyButton);
