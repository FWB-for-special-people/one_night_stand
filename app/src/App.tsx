import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { themeDark, themeLight } from './theme.ts';
import Login from 'src/pages/Login.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { router } from 'src/data/routes/routes.tsx';
import { useAtom } from 'jotai';
import { darkModeAtom } from 'src/atoms.ts';

const queryClient = new QueryClient();

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode] = useAtom(darkModeAtom);

  const theme = useMemo(() => {
    if (isDarkMode) {
      return themeDark;
    }
    return themeLight;
  }, [prefersDarkMode, isDarkMode]);

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary fallback={<Login />}>
            <RouterProvider router={router} />
            <CssBaseline />
            <Outlet />
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
  );
};

export default App;
