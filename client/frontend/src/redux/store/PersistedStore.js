import themeReducer from '../reducers/themeReducer';
import userReducer from '../reducers/userReducer';
import { combineReducers, createStore } from 'redux';

const stateName = 'Chefmate:state';

const allReducers = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(stateName, serializedState);
  } catch (err) {
    console.log('There was an unexpected error while trying to save state.');
  }
};

const initializeState = () => ({
  theme: 'light',
  user: '',
});

const loadState = () => {
  try {
    let serializedState = localStorage.getItem(stateName);
    if (serializedState == null) {
      return initializeState();
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('There was an unexpected error while trying to load state');
  }
};

export const PersistedStore = createStore(
  allReducers,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

PersistedStore.subscribe(() => {
  saveState(PersistedStore.getState());
});
