import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Start from 'src/pages/Start.tsx';
import { store } from 'src/store/store.ts';
import Login from 'src/pages/Login.tsx';
import RememberPassword from 'src/pages/RememberPassword.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Start />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/login/password_reminder',
        element: <RememberPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
