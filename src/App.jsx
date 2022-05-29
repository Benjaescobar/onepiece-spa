import { Route, Routes } from 'react-router-dom';

import LandingLayout from './components/LandingLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './views/Home';
import Rules from './views/Rules';
import About from './views/About';
import Credits from './views/Credits';
import Game from './views/Game';
import Accounts from './views/Accounts';

import Footer from './components/Footer';
import routes from './routes';
import Admin from './views/Admin';

function App() {
  return (
    <div className="flex flex-col w-full">
      <div className="min-h-screen">
        <Routes>
          <Route
            exact
            path={routes.home}
            element={<LandingLayout />}
          >
            <Route index element={<Home />} />
            <Route path={routes.rules} element={<Rules />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.credits} element={<Credits />} />
            <Route path={routes.admin} element={<Admin />} />
          </Route>
          <Route path={routes.accounts} element={<Accounts />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.login} element={<Signup />} />
          </Route>
          <Route path={routes.game} element={<Game />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
