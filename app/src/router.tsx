import { createBrowserRouter } from 'react-router-dom';
import Start from 'src/pages/Start.tsx';
import Login from 'src/pages/Login.tsx';
import RememberPassword from 'src/pages/RememberPassword.tsx';
import AddPostWrapper from 'src/pages/AddPost/AddPostWrapper.tsx';
import Feed from 'src/pages/Feed/Feed.tsx';
import Dashboard from 'src/pages/Dashboard.tsx';
import CategoriesDashboard from 'src/pages/Categories/CategoriesDashboard.tsx';
import MyPage from 'src/pages/MyPage/MyPage.tsx';
import SettingsWrapper from 'src/pages/Settings/Settings.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Feed>
        <Dashboard />
      </Feed>
    ),
  },
  { path: '/start', element: <Start /> },
  { path: '/login', element: <Login /> },
  { path: '/login/password_reminder', element: <RememberPassword /> },
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
]);