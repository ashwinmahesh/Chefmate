import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export default function Template() {
  const styles = useStyles();
  return (
    <div>
      <p>I am a template</p>
    </div>
  );
}
