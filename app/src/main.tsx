import React from 'react';
import ReactDOM from 'react-dom/client';
// import { QueryClient } from 'react-query';
import App from './App'
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import { RouterProvider } from 'react-router-dom';
// import { router } from 'src/data/routes/routes.tsx';

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*<QueryClientProvider client={queryClient}>*/}
      {/*<ThemeProvider theme={theme}>*/}
      {/*  <CssBaseline />*/}
      {/*  <RouterProvider router={router}>*/}
          <App />
        {/*</RouterProvider>*/}
      {/*</ThemeProvider>*/}
    {/*</QueryClientProvider>*/}
  </React.StrictMode>
);