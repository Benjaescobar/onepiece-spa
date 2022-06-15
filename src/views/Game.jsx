import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import gamesApi from '../api/games';
import GameSidebar from '../components/GameSidebar';
import constants from '../constants';
import RulesModal from '../components/RulesModal';

// const CELLS = Array.from({ length: 42 });

export default function Game() {
  const { id } = useParams();

  const [rulesModalOpen, setRulesModalOpen] = useState(false);
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
      {rulesModalOpen ? (
        <RulesModal close={() => setRulesModalOpen(false)} />
      ) : null}
      <div className="flex flex-col items-center justify-center flex-grow flex-shrink-0 min-h-screen p-12 space-y-2 bg-gray-100">
        {players.map((player) => (player.id === game.currentTurnPlayerId ? (
          <div
            key={player.captain}
            className="absolute top-20 left-40 text-gray-600"
          >
            <span className="font-bold">Current Player:&nbsp;</span>
            <div className="float-right">
              <img
                src={constants.PIRATEIMAGES[player.captain]}
                className="flex items-center rounded-full justify-center w-6 h-6 float-left"
              />
              <p className="float-right">
                &nbsp;
                {player.captain}
              </p>
            </div>
          </div>
        ) : null))}
        <div className="relative grid grid-cols-6 bg-blue-400 shadow-xl">
          <button
            onClick={() => setRulesModalOpen(true)}
            className="absolute right-0 px-4 py-1 text-white bg-blue-400 rounded-lg hover:bg-blue-500 -top-12"
          >
            Ver reglas
          </button>
          {constants.CELLS.map((value, index) => (
            <div
              key={`cell-${index}`}
              className="relative flex w-full h-24 text-black bg-blue-400 border w-36"
            >
              <span className="absolute top-0.5 left-0.5 font-bold">
                {index}
              </span>
              <div className="flex flex-row self-end p-2 space-x-2">
                {players.map((player) => (player.position === index ? (
                  <div
                    key={player.captain}
                  >
                    <img
                      src={constants.PIRATEIMAGES[player.captain]}
                      className="flex items-center rounded-full justify-center w-7 h-7"
                    />
                  </div>
                ) : null))}
              </div>
              <div
                className="w-14 h-14 top-4 left-10 justify-center absolute"
              >
                <img
                  src={constants.CELLASSETS[value]}
                  className="w-14 h-14 object-contain"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
      <GameSidebar />
    </div>
  );
}
