import React, {
  createContext, useEffect, useCallback, useMemo,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import useLocalStorage from './useLocalStorage';

let logoutTimer;

export const AuthContext = createContext();

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function AuthContextProvider({ children }) {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExpiration');

  const navigate = useNavigate();

  const handleUserLogin = (token) => {
    const decoded = jwtDecode(token);
    const expiration = new Date(decoded.exp * 1000);
    storeUser({
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      token,
    });
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
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
