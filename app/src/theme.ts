import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4459A9',
    },
    secondary: {
      main: '#005B7A',
    },
    success: {
      main: '#7CB928',
    },
    warning: {
      main: '#BA1A1A',
    },
    text: {
      primary: '#0D2878',
      secondary: '#7F8C8D',
    },
    background: {
      default: '#FFFBFF',
      paper: '#fddf9b',
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B7C4FF',
    },
    secondary: {
      main: '#61CCFF',
    },
    success: {
      main: '#00FF99',
    },
    warning: {
      main: '#FFB4AB',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B7C4FF',
    },
    background: {
      default: '#1C1B1F',
      paper: '#fddf9b',
    },
  },
});

export const themeHighContrast = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    },
    secondary: {
      main: '#FF00FF',
    },
    success: {
      main: '#00FF00',
    },
    warning: {
      main: '#FF0000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFF00',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
  },
});
