import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeDark, themeHighContrast, themeLight } from './theme.ts';
import Login from 'src/pages/Login.tsx';

interface RootState {
  themeMode: {
    mode: 'dark' | 'contrast' | 'light';
  };
}

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeMode = useSelector((state: RootState) => state.themeMode.mode);

  const theme = useMemo(() => {
    if (themeMode === 'dark') {
      return themeDark;
    }
    if (themeMode === 'contrast') {
      return themeHighContrast;
    }
    return themeLight;
  }, [prefersDarkMode, themeMode]);

  return (
    <ErrorBoundary fallback={<Login />}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Outlet />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
