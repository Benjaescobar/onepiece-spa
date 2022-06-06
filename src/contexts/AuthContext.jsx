import React, {
  createContext, useEffect, useMemo, useCallback,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import useLocalStorage from '../hooks/useLocalStorage';

let logoutTimer;

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser, clearCurrentUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExpiration');

  const navigate = useNavigate();

  function handleUserLogin(token) {
    const decoded = jwtDecode(token);
    const expiration = new Date(decoded.exp * 1000);
    setCurrentUser({
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      token,
    });
    storeSessionExpDate(expiration);
  }

  function handleUserLogout() {
    clearCurrentUser();
    clearSessionExpDate();
  }

  function handleAutomaticLogout() {
    handleUserLogout();
    navigate(routes.login);
  }

  const isAuthed = useCallback(() => !!currentUser);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const exp = new Date(sessionExpDate).getTime();
      const now = new Date().getTime();
      const remainingTime = exp - now;
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate]);

  const userStatus = useMemo(
    () => ({
      isAuthed, currentUser, handleUserLogin, handleUserLogout,
    }),
    [currentUser, handleUserLogin, handleUserLogout],
  );

  return (
    <AuthContext.Provider value={userStatus}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
