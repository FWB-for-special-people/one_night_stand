import {ErrorBoundary} from 'react-error-boundary';
import {Outlet, RouterProvider} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import Login from 'src/pages/Login.tsx';
import {QueryClient, QueryClientProvider} from 'react-query';
import {router} from 'src/router';
import { useAtom } from 'jotai';
import {darkModeAtom} from 'src/atoms.ts';
import ErrorScreen from "src/pages/ErrorScreen.tsx";
import { themeDark, themeLight } from 'src/theme.ts';

const queryClient = new QueryClient();

export default function App() {
  const [isDarkMode] = useAtom(darkModeAtom);
    const theme = isDarkMode ? themeDark : themeLight;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ErrorBoundary fallback={<ErrorScreen/>}>
                    <RouterProvider router={router}/>
                    <CssBaseline/>
                    <Outlet/>
                </ErrorBoundary>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
