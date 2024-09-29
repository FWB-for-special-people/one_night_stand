import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#253160',
    },
    secondary: {
      main: '#fbb916',
    },
    success: {
      main: '#7CB928',
    },
    warning: {
      main: '#BA1A1A',
    },
    text: {
      primary: '#2d4e9c',
      secondary: '#3c3c3c',
    },
    background: {
      default: '#ffffff',
      paper: '#fef2c0',
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
