import { useLocation } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import routes from '../routes';

function Accounts() {
  const sampleLocation = useLocation();
  if (sampleLocation.pathname === routes.login) {
    return (
      <div>
        <Login />
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else if (sampleLocation.pathname === routes.signup) {
    return (
      <div>
        <Signup />
      </div>
    );
  }
}

export default Accounts;
