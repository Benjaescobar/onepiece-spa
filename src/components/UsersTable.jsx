/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import useAuth from '../hooks/useAuth';

function UsersTable() {
  const { currentUser } = useAuth();

  // Success Messages
  const [successMessage, setSuccessMessage] = useState(null);

  // POPUP SETTINGS
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userNameToDelete, setuserNameToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const closeModal = () => { setOpen(false); };

  // USER FETCH
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

  async function deleteUser() {
    const url = 'http://localhost:3001';
    const { token } = currentUser;
    try {
      const responseAll = await fetch(`${url}/api/admin/delete-user/${userIdToDelete}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).then((respuesta) => respuesta.json());
      setSuccessMessage((<h1 className="text text-green-400 px-4 py-4 text-left">
        Succesfully deleted user
        {' '}
        {responseAll.firstName}
        {' '}
        {responseAll.lastName}
        !
                         </h1>));
      console.log(responseAll);
      closeModal();
    } catch (err) {
      console.log(err);
      setSuccessMessage((<h1 className="text text-red-400 px-4 py-4 text-left">
        Could not delete
        {' '}
        {userNameToDelete}
                         </h1>));
      closeModal();
    }
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
      firstName: 'Test',
      lastName: 'Users',
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
            {successMessage}
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    id
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{value.id}</td>
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
                      <button
                        onClick={() => { setOpen((o) => !o); setuserNameToDelete(`${value.firstName} ${value.lastName}`); setUserIdToDelete(value.id); }}
                        className="h-12 bg-red-400 bg-gray-200 w-40 text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2"
                      >
                        Delete
                      </button>
                      <Popup
                        open={open}
                      >
                        <div
                          className="overflow-y-auto overflow-x- center md:inset-0 h-modal md:h-full"
                        >
                          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                data-modal-toggle="popup-modal"
                                onClick={closeModal}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <div className="p-6 text-center">
                                <svg
                                  className="mx-auto mb-4 w-14 h-14 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                  ¿Estás seguro que quieres borrar a
                                  {' '}
                                  {userNameToDelete}
                                  ? Está acción es permanente
                                </h3>
                                <button
                                  onClick={deleteUser}
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={closeModal}
                                  type="button"
                                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup>

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

export default UsersTable;
