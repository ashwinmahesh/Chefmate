'use strict';
import React, { Component } from 'react';

//------------------------SPEECH RECOGNITION-----------------------------

//const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
//------------------------COMPONENT-----------------------------

class Speech extends Component {
  constructor() {
    super();
    this.state = {
      listening: false,
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening,
      },
      this.handleListen
    );
  }

  handleListen() {
    // handle speech recognition here
  }

  render() {
    return (
      <div style={container}>
        <button id="microphone-btn" style={button} onClick={this.toggleListen} />
        <div id="interim" style={interim}></div>
        <div id="final" style={final}></div>
      </div>
    );
  }
}

export default Speech;
