import { Route, Routes } from 'react-router-dom';

import LandingLayout from './components/LandingLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './views/Home';
import Rules from './views/Rules';
import About from './views/About';
import Credits from './views/Credits';
import Game from './views/Game';
import RoomLayout from './views/RoomLayout';
import Footer from './components/Footer';
import routes from './routes';
import Admin from './views/Admin';
import AuthContextProvider from './contexts/AuthContext';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Room from './views/Room';

function App() {
  return (
    <AuthContextProvider>
      <div className="flex flex-col w-full">
        <div className="min-h-screen">
          <Routes>
            <Route
              exact
              path={routes.home}
              element={<LandingLayout />}
            >
              <Route
                index
                element={<Home />}
              />
              <Route
                path={routes.rules}
                element={<Rules />}
              />
              <Route
                path={routes.about}
                element={<About />}
              />
              <Route
                path={routes.credits}
                element={<Credits />}
              />
              <Route
                path={routes.admin}
                element={<Admin />}
              />
            </Route>

            <Route element={<RoomLayout />}>
              <Route
                path={routes.login}
                element={<Login />}
              />
              <Route
                path={routes.signup}
                element={<Signup />}
              />
              <Route
                element={<AuthenticatedRoute />}
              >
                <Route
                  path={routes.games}
                  element={<Room />}
                />
              </Route>
            </Route>

            <Route
              element={<AuthenticatedRoute />}
            >
              <Route
                path={routes.game}
                element={<Game />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
