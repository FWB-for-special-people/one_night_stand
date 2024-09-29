import { createBrowserRouter } from 'react-router-dom';
import Start from 'src/pages/Start.tsx';
import Login from 'src/pages/Login.tsx';
import RememberPassword from 'src/pages/RememberPassword.tsx';
import AddPostWrapper from 'src/pages/AddPost/AddPostWrapper.tsx';
import Feed from 'src/pages/Feed/Feed.tsx';
import Dashboard from 'src/pages/Dashboard.tsx';
import CategoriesDashboard from 'src/pages/Categories/CategoriesDashboard.tsx';
import MyPage from 'src/pages/MyPage/MyPage.tsx';
// import AuthWrapper from 'src/auth/AuthWrapper.tsx';
import SettingsWrapper from 'src/pages/Settings/Settings.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <AuthWrapper>
        <Feed>
          <Dashboard />
        </Feed>
      // </AuthWrapper>
    ),
  },
  { path: '/start', element: <Start /> },
  { path: '/login', element: <Login /> },
  { path: '/login/password_reminder', element: <RememberPassword /> },
  {
    path: '/categories',
    element: (
      // <AuthWrapper>
        <Feed>
          <CategoriesDashboard />
        </Feed>
      // </AuthWrapper>
    ),
  },
  {
    path: '/my-profile',
    element: (
      // <AuthWrapper>
        <Feed>
          <MyPage />
        </Feed>
      // </AuthWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      // <AuthWrapper>
        <Feed>
          <SettingsWrapper />
        </Feed>
      // </AuthWrapper>
    ),
  },
  {
    path: '/add-post',
    element: (
      // <AuthWrapper>
        <Feed>
          <AddPostWrapper />
        </Feed>
      // </AuthWrapper>
    ),
  },
]);