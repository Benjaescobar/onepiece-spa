import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

function Admin() {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState(null);
  async function getUsers() {
    const url = 'http://localhost:3001';
    const { token } = currentUser;
    const responseAll = await fetch(`${url}/api/admin/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }).then((respuesta) => respuesta.json());
    setUsers(responseAll);
  }
  useEffect(() => {
    if (currentUser != null) {
      getUsers();
    }
  }, []);

  let testUsers;
  if (users == null) {
    testUsers = [{
      email: 'test@uc.cl',
      firstName: 'TEst',
      lastName: 'carvajal',
    }];
  } else {
    testUsers = users;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h1 className="text font-bold text-gray-900 px-6 py-4 text-left">Usuarios</h1>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    First
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {testUsers.map((value) => (
                  <tr
                    className="border-b"
                    key={value.email}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {value.firstName}
                      {' '}
                      {value.lastName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {value.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button className="h-12 bg-gray-200 w-40 text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2">Edit</button>
                      <button className="h-12 bg-teal-500 w-40 text-white text-md rounded hover:shadow hover:bg-teal-800 mb-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Admin;
