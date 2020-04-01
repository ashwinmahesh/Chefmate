const darkMode = localStorage.getItem('darkMode') === 'true' ? true : false;

export const colors = {
  background: darkMode ? 'rgb(40,40,40)' : 'white',
  secondaryBackground: darkMode ? 'rgb(72,72,72)' : 'rgb(230,230,230)',
  tertiaryBackground: darkMode ? 'rgb(48,48,48)' : 'rgb(150, 150, 150)',
  primaryText: darkMode ? 'white' : 'black',
  secondaryText: darkMode ? 'rgb(192,192,192)' : 'rgb(64,64,64)',
};
