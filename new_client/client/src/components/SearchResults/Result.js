import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'Left',
        marginLeft: '20px',
        marginTop: '100px'
    },
    format: {
        lineHeight: '1px',
    }
}));

function Result() {
    const styles = useStyles();
  return (
      //make this a for loop to iterate multiple search results in this format
    <div className = {styles.container}>
    <div className = {styles.format}>
    <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that were searched</b></p>
      <p> small description of the website </p>
    </div>
    <br></br>
    <div className = {styles.format}>
    <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that were searched</b></p>
      <p> small description of the website </p>
    </div>
      <br></br>
    <div className = {styles.format}>
      <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that were searched</b></p>
      <p> small description of the website </p>
    </div>
    <br></br>
    <div className = {styles.format}>
      <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that were searched</b></p>
      <p> small description of the website </p>
    </div>
    </div>
  );
}

export default Result;