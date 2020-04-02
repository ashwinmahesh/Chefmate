import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import themeReducer from './redux/reducers/themeReducer';
import userReducer from './redux/reducers/userReducer';

const allReducers = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

const store = createStore(
  allReducers,
  {
    //Insert initial state here
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
