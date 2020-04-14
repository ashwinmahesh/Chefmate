import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((_) => ({
    wrapper: {},
  }));

type Props = {
  theme: String,
};

function Template(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  return (
    <div className={styles.wrapper}>
      <p>I am a template</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Template);
