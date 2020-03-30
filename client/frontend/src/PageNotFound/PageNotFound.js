import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderSearch from '../Headers/HeaderSearch';

const useStyles = makeStyles((theme) => ({}));

export default function PageNotFound() {
  const styles = useStyles();
  return (
    <div>
      <HeaderSearch initialSearch="" />
      <p>Page not found</p>
    </div>
  );
}
