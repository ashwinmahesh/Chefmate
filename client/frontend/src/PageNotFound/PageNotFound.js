import React from 'react';
import rat from '../images/remi.png';
import HeaderSimple from '../Headers/HeaderSimple';

const pStyle = {
  fontSize: '50px',
  textAlign: 'center',
  color: 'black',
};

export default function PageNotFound() {
  return (
    <div>
      <HeaderSimple />
      <p style={pStyle}>Rats! Page not found</p>
      <img src={rat}></img>
    </div>
  );
}
