import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import rat from '../images/remi.png'
import HeaderSearch from '../Headers/HeaderSearch';

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: '.9',
    backgroundColor: 'white',
    width: '700px',
    height: '350px',
    position: 'absolute',
    left: '25%',
    top: '25%',
    borderRadius: '4px',
    boxShadow: '3px 3px 4px 4px grey',
    zIndex: '2',
    backgroundImage:`url(${rat})`
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '500px',
  }
}));

const pStyle = {
  fontSize: '50px',
  textAlign: 'center',
  color: 'black'
};


/*
function App() {
  return (
    <div  styles={{ backgroundImage:`url(${rat})` }}>
      <h1>This is red car</h1>
    </div>
  );
}
*/


export default function PageNotFound() {
  const styles = useStyles();
  return (
    <div>
      <HeaderSearch initialSearch="" />
      <p style={pStyle}>Rats! Page not found</p>
      <img src={rat}></img>
      {/* <p>styles={{ backgroundImage:`url(${rat})` }}</p> */}
      {/* <p>Page Not Found</p> */}
    </div>
  );

/*   
  const divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };
  const pStyle = {
    fontSize: '15px',
    textAlign: 'center'
  };
  
  return (
    <div style={divStyle}>
      <p style={pStyle}>Get started with inline style</p>
    </div>
  ); */
}
