import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import themeReducer from './redux/reducers/themeReducer';
import userReducer from './redux/reducers/userReducer';

// function productsReducer(state = [], action) {
//   return state;
// }

// function userReducer(state = '', { type, payload }) {
//   switch (type) {
//     case 'updateUser':
//       return payload.user;
//   }

//   return state;
// }

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

// console.log(store.getState());

// const updateUserAction = {
//   type: 'updateUser',
//   payload: { user: 'Not Ashwin' },
// };

// store.dispatch(updateUserAction);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
