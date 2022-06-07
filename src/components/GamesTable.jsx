/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import gamesApi from '../api/games';
import useAuth from '../hooks/useAuth';

function GamesTable() {
  const { currentUser } = useAuth();

  // Games FETCH
  const [games, setGames] = useState(null);
  async function getGames() {
    const responseAll = await gamesApi.get('');
    setGames(responseAll);
  }

  useEffect(() => {
    if (currentUser != null) {
      getGames();
    }
  }, []);

  let testGames;
  if (games == null) {
    testGames = [{
      id: 1,
      started: false,
      finished: false,
      currentTurnPlayerId: null,
      code: 'ASDFDASF',
    }];
  } else {
    testGames = games;
    console.log(games);
  }

  return (
    <div className="shadow">
      <h1 className="text font-bold text-gray-900 px-6 py-4 text-left">Games</h1>
      <div className="overflow-y-scroll overflow-x-auto">
        <div className=" max-h-80">
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
                  State
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  CurrentPlayerId
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {testGames.map((value) => (
                <tr
                  className="border-b"
                  key={value.id}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{value.id}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {value.finished ? 'Juego Terminado' : (value.started ? 'Juego en curso' : 'No Iniciado') }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {value.currentTurnPlayerId ? value.currentTurnPlayerId : 'No hay current player'}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {value.code}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button className="h-12 bg-gray-200 w-40 text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default GamesTable;
