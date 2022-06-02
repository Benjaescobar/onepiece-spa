import { useLocation } from 'react-router-dom';
import UsersTable from '../components/UsersTable';
import GamesTable from '../components/GamesTable';
import routes from '../routes';

function Admin() {
  const sampleLocation = useLocation();

  return (
    <div>
      <div className="h-16">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Dashboard</h1>
      </div>
      <div>
        <UsersTable />
      </div>
      <br />
      <div>
        <GamesTable />
      </div>
    </div>
  );
}

export default Admin;
