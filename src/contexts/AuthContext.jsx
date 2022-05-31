import React, {
  createContext, useEffect, useCallback, useMemo, useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';

let logoutTimer;

export const AuthContext = createContext();

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const [sessionExpDate, setSessionExpDate] = useState();
  const navigate = useNavigate();

  const handleUserLogin = (token) => {
    const decoded = jwtDecode(token);
    const expiration = new Date(decoded.exp * 1000);
    setCurrentUser({
      email: decoded.email,
      token,
    });
    setSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setSessionExpDate();
  };

  const handleAutomaticLogout = useCallback(() => {
    handleUserLogin();
    navigate(routes.login);
  }, [navigate]);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const exp = new Date(sessionExpDate).getTime();
      const now = new Date().getTime();
      const remainingTime = exp - now;
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutomaticLogout]);

  const userStatus = useMemo(
    () => ({ currentUser, handleUserLogin, handleUserLogout }),
    [currentUser, handleUserLogin, handleUserLogout],
  );

  return (
    <AuthContext.Provider value={userStatus}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
