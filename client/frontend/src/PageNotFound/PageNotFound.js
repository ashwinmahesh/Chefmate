import React from 'react';
import rat from '../images/remi.png'
import HeaderSearch from '../Headers/HeaderSearch';

const pStyle = {
  fontSize: '50px',
  textAlign: 'center',
  color: 'black'
};

export default function PageNotFound() {
  return (
    <div>
      <HeaderSearch initialSearch="" />
      <p style={pStyle}>Rats! Page not found</p>
      <img src={rat}></img>
    </div>
  );
}
