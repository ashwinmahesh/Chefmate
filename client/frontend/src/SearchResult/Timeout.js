import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export default function Timeout() {
  const styles = useStyles();
  return (
    <div>
      <p>I am the timeout</p>
    </div>
  );
}
