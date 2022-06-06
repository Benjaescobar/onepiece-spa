import UsersTable from '../components/UsersTable';
import GamesTable from '../components/GamesTable';

function Admin() {
  return (
    <div>
      <div className="h-16">
        <h1 className="text-2xl font-bold text-center text-gray-900">Dashboard</h1>
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
