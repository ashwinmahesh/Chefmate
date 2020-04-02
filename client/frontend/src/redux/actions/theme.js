export const UPDATE_THEME = 'theme:updateTheme';

export function updateTheme(newTheme) {
  return {
    type: UPDATE_THEME,
    payload: {
      theme: newTheme,
    },
  };
}
