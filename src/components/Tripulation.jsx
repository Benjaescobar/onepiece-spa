import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import usersSvg from '../assets/icons/users.svg';

import constants from '../constants';

export default function Tripulation({ player }) {
  const pirates = useMemo(() => player?.pirates || [], [player?.pirates]);
  const strength = useMemo(
    () => pirates.reduce((pirate, currentValue) => pirate.strength + currentValue, player.strength),
    [pirates],
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

      <div className="flex flex-col ml-2 space-y-2">
        <span className="text-l font-medium text-gray-600">Capitán:</span>
        <div className="flex items-center justify-between h-12 w-30 rounded-lg">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img
            src={constants.PIRATEIMAGES[player.captain]}
            className="flex items-center rounded-full justify-center w-8 h-8"
          />
          <div className="flex">
            <span className="text-xs">{player.captain}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-2 space-y-2">
        <span className="text-l font-medium text-gray-600">Piratas:</span>
        {pirates.map((pirate) => (
          <div
            key={pirate.id}
            className="flex items-center justify-between h-12 w-20 rounded-lg"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img
              src={constants.PIRATEIMAGES[pirate.name]}
              className="flex items-center rounded-full justify-center w-8 h-8"
            />
            <div className="flex font-medium text-gray-700">
              &nbsp;
              <span className="text-xs">{pirate.name}</span>
              &nbsp;
              <ReactSVG
                src={constants.ICONS.EVILFRUIT}
                className="w-3 h-3 fill-current float-right"
              />
              &nbsp;
              <p className="text-xs float-right">{pirate.strength}</p>
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-center text-gray-700">
        Fuerza total:
        {' '}
        {player.strength}
      </span>
    </div>
  );
}
