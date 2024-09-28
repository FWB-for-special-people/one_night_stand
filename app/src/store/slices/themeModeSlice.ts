import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('themeMode') || 'light';

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState: {
    mode: savedTheme, // Domyślny tryb pobierany z localStorage lub 'light'
  },
  reducers: {
    setDarkMode: (state) => {
      state.mode = 'dark';
      localStorage.setItem('themeMode', 'dark');
    },
    setLightMode: (state) => {
      state.mode = 'light';
      localStorage.setItem('themeMode', 'light');
    },
    setHighContrastMode: (state) => {
      state.mode = 'contrast';
      localStorage.setItem('themeMode', 'contrast');
    },
  },
});

export const { setDarkMode, setLightMode, setHighContrastMode } =
  themeModeSlice.actions;

export default themeModeSlice.reducer;
