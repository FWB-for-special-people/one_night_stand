import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import Start from 'src/pages/Start.tsx';
import Login from 'src/pages/Login.tsx';
import RememberPassword from 'src/pages/RememberPassword.tsx';
import AddPostWrapper from 'src/pages/AddPost/AddPostWrapper.tsx';
import { store } from 'src/store/store.ts';
import Feed from 'src/Feed/Feed.tsx';
import Dashboard from 'src/Dashboard.tsx';
import CategoriesDashboard from 'src/Categories/CategoriesDashboard.tsx';
import MyPage from 'src/pages/MyPage/MyPage.tsx';
import SettingsWrapper from 'src/pages/Settings/SettingsWrapper.tsx';

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
      {
        path: '/feed',
        element: (
          <Feed>
            <Dashboard />
          </Feed>
        ),
      },
      {
        path: '/categories',
        element: (
          <Feed>
            <CategoriesDashboard />
          </Feed>
        ),
      },
      {
        path: '/my-profile',
        element: (
          <Feed>
            <MyPage />
          </Feed>
        ),
      },
      {
        path: '/settings',
        element: (
          <Feed>
            <SettingsWrapper />
          </Feed>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Feed>
            <AddPostWrapper />
          </Feed>
        ),
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
