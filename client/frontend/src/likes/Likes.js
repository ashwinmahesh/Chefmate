import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({}));

export default function Likes() {
  const styles = useStyles();
  const [likes, changeLikes] = useState([]);
  const [loginRedirect, changeLoginRedirect] = useState(false);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  async function fetchUserInfo() {
    const { data } = await axios.get('/user');
    if (data['success'] === 1) changeLikes(data['content']['likes']);
    else console.log(data['message']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  return (
    <div>
      {loginRedirect && <Redirect to="/" />}
      <p>I am the likes page</p>
    </div>
  );
}
