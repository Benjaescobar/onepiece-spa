import {
  Outlet, Link,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import logo from '../assets/images/one-piece-logo.png';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

function playWarningToast() { toast.error('Aun no se puede jugar :('); }

function LandingLayout() {
  const [adminLink, setAdminLink] = useState(null);
  const [signupLink, setSignupLink] = useState(null);
  const [logoutLink, setlogoutLink] = useState(null);
  const [loginLink, setLoginLink] = useState(null);
  const [playLink, setPlayLink] = useState(null);
  let logOut;

  const { currentUser, handleUserLogout } = useAuth();

  function handleNavbarButtons() {
    if (currentUser === null) {
      setAdminLink(null);
      setLoginLink((
        <a
          href={routes.login}
          className="px-6 py-2 text-white rounded rounded-full bg-sky-600 hover:bg-sky-500"
        >
          Iniciar Sesión
        </a>));
      setSignupLink(<Link to={routes.signup}>Regístrate</Link>);
      setlogoutLink(null);
      setPlayLink(null);
    } else {
      setAdminLink(<Link to={routes.admin}>Dashboard</Link>);
      setLoginLink(null);
      setSignupLink(null);
      setlogoutLink((
        <button
          onClick={logOut}
          className="px-6 py-2 rounded rounded-full bg-gray-300 hover:bg-gray-100"
        >
          Cerrar Sesión
        </button>));
      setPlayLink((
        <button
          onClick={playWarningToast}
          className="px-6 py-2 text-white rounded rounded-full bg-sky-600 hover:bg-sky-500"
        >
          Jugar
        </button>));
    }
  }

  logOut = () => {
    handleUserLogout();
    handleNavbarButtons();
    window.location.reload();
  };

  useEffect(() => {
    handleNavbarButtons();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <nav className="flex flex-row items-center justify-between w-full px-10 py-6">
        <Link
          to={routes.home}
          className="w-40 h-16 cursor-pointer"
        >
          <img
            src={logo}
            className="object-cover w-full h-full"
          />
        </Link>
        <div className="flex flex-row space-x-4 text-2xl font-bold">
          <Link to={routes.rules}>Reglas</Link>
          <Link to={routes.credits}>Créditos</Link>
          <Link to={routes.about}>Acerca de</Link>
          {currentUser ? adminLink : null}
        </div>
        <div className="flex flex-row items-center space-x-6 text-xl">
          {loginLink}
          {signupLink}
          {playLink}
          {logoutLink}
        </div>
      </nav>

      <div className="w-full px-12 my-24">
        <Outlet />
      </div>

    </div>
  );
}

export default LandingLayout;
