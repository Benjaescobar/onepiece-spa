import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import usersSvg from '../assets/icons/users.svg';

import constants from '../constants';

export default function Tripulation({ player }) {
  const pirates = useMemo(() => player?.pirates || [], []);
  const strength = useMemo(
    () => pirates.reduce((pirate, currentValue) => pirate.strength + currentValue, player.strength),
    [player],
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row self-start space-x-2 text-gray-400">
        <ReactSVG
          src={usersSvg}
          className="w-6 h-6 fill-current"
        />
        <span className="text-xl font-medium">Tripulación</span>
      </div>
      <div className="flex items-center justify-between h-12 w-20 rounded-lg">
        <img
          src={constants.PIRATEIMAGES[player.captain]}
          className="h-full py-2 pr-4 ml-2"
        />
        <div className="flex flex-col">
          <span className="text-xs">{player.captain}</span>
        </div>
      </div>
      <div className="flex flex-col ml-2 space-y-2">
        {pirates.map((pirate) => (
          <div
            key={pirate.id}
            className="flex items-center justify-between h-12 w-20 rounded-lg"
          >
            <img
              src={constants.PIRATEIMAGES[pirate.name]}
              className="h-full py-2 pr-4 ml-2 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xs">{pirate.name}</span>
              <p className="text-xs">{pirate.strength}</p>
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-center text-gray-700">
        Fuerza total:
        {' '}
        {strength}
      </span>
    </div>
  );
}
