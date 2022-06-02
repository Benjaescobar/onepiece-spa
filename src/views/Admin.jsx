import { useLocation } from 'react-router-dom';
import UsersTable from '../components/UsersTable';
import routes from '../routes';

function Admin() {
  const sampleLocation = useLocation();
  if (sampleLocation.pathname === routes.adminUsers) {
    return (
      <div>
        <UsersTable />
      </div>
    );
  }
}

export default Admin;
