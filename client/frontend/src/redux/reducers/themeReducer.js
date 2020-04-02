import { UPDATE_THEME } from '../actions/theme';

export default function themeReducer(state = 'light', { type, payload }) {
  switch (type) {
    case UPDATE_THEME:
      return payload.theme;
    default:
      return state;
  }
}
