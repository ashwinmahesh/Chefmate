'use strict';
import React, { Component } from 'react';

//------------------------SPEECH RECOGNITION-----------------------------

//const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
