import { useState, useEffect } from 'react';

function Admin() {
  const [users, setUsers] = useState(null);
  async function getUsers() {
    const url = 'http://localhost:3001';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhZ3N0ZXJAZW1haWwuY29tIiwiaWF0IjoxNjUzODQ2MDEwLCJleHAiOjE2NTM4NTMyMTB9.aS79jd7NbhKnvpAslQd3CRGMAUD5_zprIY_r17qYjcc';
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
  let nombre;
  if (users == null) {
    nombre = 'benja';
  } else {
    nombre = users[1].firstName;
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-0">
      <div className="flex flex-col space-y-4 text-xl">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{nombre}</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
