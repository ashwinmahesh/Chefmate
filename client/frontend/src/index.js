import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistedStore } from './redux/store/PersistedStore';

ReactDOM.render(
  <Provider store={PersistedStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
