'use strict';
import React, { Component } from 'react';

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

//------------------------COMPONENT-----------------------------

export function getSpeech(listening: Boolean, handleSpeechChange: (String) => void) {
  if (listening) {
    recognition.start();
    recognition.onend = () => {
      recognition.start();
    };
  } else {
    recognition.stop();
  }

  let finalTranscript = '';
  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
        handleSpeechChange(finalTranscript);
      } else {
        interimTranscript += transcript;
      }
    }
  };

  recognition.onerror = (event) => {
    console.log('Error occurred in recognition: ' + event.error);
  };
}

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
    //Listening setup
    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        recognition.start();
      };
    } else {
      recognition.stop();
    }

    //End of listening setup -> starting decoding here
    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('textField').innerHTML = finalTranscript;

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ');
      const stopCmd = transcriptArr.slice(-3, -1);

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop();
        recognition.onend = () => {
          const finalText = transcriptArr.slice(0, -3).join(' ');
          document.getElementById('textField').innerHTML = finalText;
        };
      }
    };

    //-----------------------------------------------------------------------

    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }
}
