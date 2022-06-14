import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import gamesApi from '../api/games';
import GameSidebar from '../components/GameSidebar';
import constants from '../constants';
import RulesModal from '../components/RulesModal';

import strawhats from '../assets/images/pirates/strawhats-pirates.webp';
import heart from '../assets/images/pirates/heart-pirates.webp';
import kid from '../assets/images/pirates/kid-pirates.webp';
import buggy from '../assets/images/pirates/buggy-pirates.webp';

const pirateImages = {
  'Monkey D. Luffy': strawhats,
  'Trafalgar D. Law': heart,
  'Eustass Kidd': kid,
  'Buggy el payaso': buggy,
};

const CELLS = Array.from({ length: 42 });

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
          >
            <span className="text-medium">Current Player:</span>
            <img
              src={pirateImages[player.captain]}
              alt=""
              className="flex items-center rounded-full justify-center w-8 h-8"
            />
            {player.captain}
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
              <span className="absolute top-0.5 left-0.5">
                {index}
                {value}
              </span>
              <div className="flex flex-row self-end p-2 space-x-2">
                {players.map((player) => (player.position === index ? (
                  <div
                    key={player.captain}
                  >
                    <img
                      src={pirateImages[player.captain]}
                      alt=""
                      className="flex items-center rounded-full justify-center w-8 h-8"
                    />
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
