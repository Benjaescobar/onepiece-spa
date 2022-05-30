import { useState, useEffect } from 'react';

function Admin() {
  const [users, setUsers] = useState(null);
  async function getUsers() {
    const url = 'http://localhost:3001';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluM0BlbWFpbC5jb20iLCJpYXQiOjE2NTM4NzA3MjksImV4cCI6MTY1Mzg3NzkyOX0.aXdkdgLUKXfz46GoFA3eHHLtpwOSb3AwGaHnDSj6PJc';
    const responseAll = await fetch(`${url}/api/admin/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }).then((respuesta) => respuesta.json());
    setUsers(responseAll);
  }
  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
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
    <div className="py-12 grid bg-gray-300 grid-cols-3 gap-4">

      {testUsers.map((value) => (
        <div className="w-60 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
          <div className="md:flex">
            <div className="w-full p-2 py-10">

              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://i.imgur.com/z4YSzDD.jpg"
                    className="rounded-full"
                    width="80"
                  />
                  <span className="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full" />
                </div>
              </div>

              <div className="flex flex-col text-center mt-3 mb-4">
                <span className="text-2xl font-medium">
                  {value.firstName}
                  {' '}
                  {value.lastName}
                </span>
                <span className="text-md text-gray-400">{value.email}</span>
              </div>

              <div className="px-14 mt-5">
                <button className="h-12 bg-gray-200 w-full text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2">Edit</button>
                <button className="h-12 bg-blue-700 w-full text-white text-md rounded hover:shadow hover:bg-blue-800">Delete</button>
              </div>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default Admin;
