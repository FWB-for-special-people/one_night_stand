import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import { RouterProvider } from 'react-router-dom';
// import { router } from 'src/data/routes/routes.tsx';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      {/*<ThemeProvider theme={theme}>*/}
      {/*  <CssBaseline />*/}
      {/*  <RouterProvider router={router}>*/}
          <App />
        {/*</RouterProvider>*/}
      {/*</ThemeProvider>*/}
  </React.StrictMode>
);