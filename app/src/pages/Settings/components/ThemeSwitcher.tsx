import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import {
  setDarkMode,
  setLightMode,
  setHighContrastMode,
} from 'src/store/slices/themeModeSlice.ts';

interface RootState {
  themeMode: {
    mode: 'dark' | 'contrast' | 'light';
  };
}

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.themeMode.mode);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
      <Button
        variant={themeMode === 'light' ? 'contained' : 'outlined'}
        onClick={() => dispatch(setLightMode())}
      >
        Jasny
      </Button>
      <Button
        variant={themeMode === 'dark' ? 'contained' : 'outlined'}
        onClick={() => dispatch(setDarkMode())}
      >
        Ciemny
      </Button>
      <Button
        variant={themeMode === 'contrast' ? 'contained' : 'outlined'}
        onClick={() => dispatch(setHighContrastMode())}
      >
        Wysoki Kontrast
      </Button>
    </Box>
  );
};

export default ThemeSwitcher;
