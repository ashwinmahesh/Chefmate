import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({}));

export default function Dislikes() {
  const styles = useStyles();
  const [dislikes, changeDislikes] = useState([]);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  async function fetchUserInfo() {
    const { data } = await axios.get('/user');
    if (data['success'] === 1) changeDislikes(data['content']['dislikes']);
    else console.log(data['message']);
  }

  useEffect(() => {
    checkAuthentication();
    fetchUserInfo();
  }, []);

  return (
    <div>
      <p>I am the dislikes page</p>
    </div>
  );
}
