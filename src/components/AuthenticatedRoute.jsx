import { Outlet, Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import routes from '../routes';

export default function AuthenticatedRoute() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  return isAuthed ? <Outlet />
    : (
      <Navigate
        to={routes.login}
        replace
        state={{ path: location.pathname }}
      />
    );
}
