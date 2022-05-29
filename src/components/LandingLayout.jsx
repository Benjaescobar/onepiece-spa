import { Outlet, Link } from 'react-router-dom';

import toast from 'react-hot-toast';
import logo from '../assets/images/one-piece-logo.png';
import routes from '../routes';

function playWarningToast() { toast.error('Aun no se puede jugar :('); }

function LandingLayout() {
  let AdminLink;
  if (true) {
    AdminLink = <Link to={routes.admin}>Admin</Link>;
  }
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
          {AdminLink}
        </div>
        <div className="flex flex-row items-center space-x-6 text-xl">
          <Link to={routes.accounts}>Acerca de</Link>
          <button
            onClick={playWarningToast}
            className="px-6 py-2 rounded rounded-full bg-sky-600 hover:bg-sky-500"
          >
            Jugar
          </button>
        </div>
      </nav>

      <div className="w-full px-12 my-24">
        <Outlet />
      </div>

    </div>
  );
}

export default LandingLayout;
