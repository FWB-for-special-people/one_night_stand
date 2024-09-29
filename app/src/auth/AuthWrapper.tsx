import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { accessTokenAtom } from 'src/atoms.ts';
import { useAtom } from 'jotai';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [token] = useAtom(accessTokenAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token === null) {
      // Redirect to login page if no valid token
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [token, navigate, location]);

  // Only render children if the token is valid
  if (token === null || token === '') {
    return null; // You could also show a loading or redirecting screen here
  }

  return <>{children}</>;
};

export default AuthWrapper;