import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import gamesApi from '../api/games';
import GameSidebar from '../components/GameSidebar';
import constants from '../constants';

export default function Game() {
  const { id } = useParams();

  const [game, setGame] = useState({});

  const players = useMemo(() => game.players || [], [game]);

  const refreshGameState = useCallback(() => {
    gamesApi.getState(id)
      .then((response) => {
        setGame(response);
      })
      .catch(() => {
        toast.error('Hubo un error cargando el estado del juego');
      });
  }, [game]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      refreshGameState();
    }, 1000);

    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="flex items-center justify-center flex-grow flex-shrink-0 min-h-screen p-12 bg-gray-100">
        <div className="grid grid-cols-6 bg-blue-400 shadow-xl">
          {constants.CELLS.map((value, index) => (
            <div
              key={`cell-${index}`}
              className="relative flex w-full h-24 text-black bg-blue-400 border w-36"
            >
              <span className="absolute top-0.5 left-0.5">
                {index}
                {value}
              </span>
              <div className="flex flex-row self-end p-2 space-x-2">
                {players.map((player) => (player.position === index ? (
                  <div
                    key={`player-${player.id}`}
                    className="flex items-center justify-center w-8 h-8 bg-red-500"
                  >
                    {player.user.firstName}
                  </div>
                ) : null))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <GameSidebar />
    </div>
  );
}
