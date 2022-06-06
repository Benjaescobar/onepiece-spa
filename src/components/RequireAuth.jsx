import { Route, Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  const location = useLocation();

  return isAuthed ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ path: location.pathname }}
    />
  );
}
