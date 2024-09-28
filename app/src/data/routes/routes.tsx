import { createBrowserRouter } from 'react-router-dom';
import Start from 'src/pages/Start';
import Login from 'src/pages/Login';
import RememberPassword from 'src/pages/RememberPassword';
import AddPostWrapper from 'src/pages/AddPost/AddPostWrapper';
import Feed from 'src/pages/Feed/Feed';
import Dashboard from 'src/pages/Dashboard';
import CategoriesDashboard from 'src/pages/Categories/CategoriesDashboard';
import MyPage from 'src/pages/MyPage/MyPage';
import SettingsWrapper from 'src/pages/Settings/SettingsWrapper';

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