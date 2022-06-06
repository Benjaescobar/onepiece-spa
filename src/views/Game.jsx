import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import gamesApi from '../api/games';
import GameSidebar from '../components/GameSidebar';

const CELLS = Array.from({ length: 42 });

export default function Game() {
  const { id } = useParams();

  const refreshGameState = useCallback(() => {
    toast.success('polling');

    gamesApi.getState(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      refreshGameState();
    }, 30000);

    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="flex items-center justify-center flex-grow flex-shrink-0 min-h-screen p-12 bg-gray-100">
        <div className="grid grid-cols-6 bg-blue-400 shadow-xl">
          {CELLS.map((_, index) => (
            <div
              key={`cell-${index}`}
              className="w-full h-24 text-black bg-blue-400 border w-36"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <GameSidebar />
    </div>
  );
}
