import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const useStyles = (colors) =>
  makeStyles((_) => ({
    lucky: {
      width: '200px',
      height: '50px',
      borderRadius: '3px',
      fontSize: '16px',
      // border: '1px dashed #38698e',
      // backgroundColor: '#38698e',
      color: '#38698e',
      left: '-10px',
    },
  }));

type Props = {
  theme: String,
  onClick: () => void,
};

function FeelingLuckyButton(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  return (
    <Button className={styles.lucky} color="inherit" onClick={props.onClick}>
      {' '}
      I'm feeling lucky!{' '}
    </Button>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(FeelingLuckyButton);
