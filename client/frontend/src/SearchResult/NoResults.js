import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export default function NoResults() {
  const styles = useStyles();
  return (
    <div>
      <p>I am the NoResults page</p>
    </div>
  );
}
