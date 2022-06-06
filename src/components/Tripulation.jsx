import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import usersSvg from '../assets/icons/users.svg';
import piratePng from '../assets/images/pirate.png';

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
      <div className="flex flex-col ml-2 space-y-2">
        {pirates.map((pirate) => (
          <div className="flex flex-row">
            <img
              src={piratePng}
              className="w-12 h-12"
            />
            <span className="font-medium">{pirate.name}</span>
            <span>{pirate.strength}</span>
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
