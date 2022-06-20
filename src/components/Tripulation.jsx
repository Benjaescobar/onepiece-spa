/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Popup from 'reactjs-popup';

import toast from 'react-hot-toast';
import meraPng from '../assets/images/mera.png';

import usersSvg from '../assets/icons/users.svg';

import constants from '../constants';

export default function Tripulation({ player, consume }) {
  const pirates = useMemo(() => player?.pirates || [], [player?.pirates]);
  const strength = useMemo(
    () => pirates.reduce((pirate, currentValue) => pirate.strength + currentValue, player.strength),
    [pirates],
  );
  function fruitPrice(name) {
    return constants.FRUITS.find((fruit) => fruit.name === name).price;
  }
  const fruits = useMemo(() => {
    if (!player?.fruits) { return []; }

    return player.fruits.map((fruit) => ({ ...fruit, price: fruitPrice(fruit.name) }));
  }, [player]);

  const [pirateSelected, setPirateSelected] = useState(null);
  const [idPirateSelected, setIdPirateSelected] = useState(null);
  const [strenghPirateSelected, setStrenghPirateSelected] = useState(null);
  const [fruitUser, setFruitUser] = useState(null);
  const [open, setOpen] = useState(false);
  const closeModal = () => { setOpen(false); };

  const handleFruitConsume = useCallback((fruit) => {
    try {
      consume(fruit, idPirateSelected);
      toast.success(`Le diste la fruta ${fruit.name} a ${pirateSelected}`);
      closeModal();
    } catch {
      toast.error('Hubo un error');
    }
  });

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
              onClick={() => { setOpen((o) => !o); setPirateSelected(`${pirate.name}`); setIdPirateSelected(pirate.id); setStrenghPirateSelected(pirate.strength); setFruitUser(pirate.fruitCarrier); }}
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
      <Popup
        open={open}
      >
        <div
          className="overflow-y-auto overflow-x- center md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="popup-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="p-6 text-center">
                <img
                  src={constants.PIRATEIMAGES[pirateSelected]}
                  className="w-50 h-50 center"
                />
                <h3 className="mt-5 mb-5 text-xl font-bold text-gray-800">
                  {pirateSelected}
                </h3>
                <h3 className="mt-5 mb-5 text-xl font-normal text-gray-800">
                  Fuerza:
                  {' '}
                  {strenghPirateSelected}
                </h3>
                <h3 className="mt-5 mb-5 text-xl font-normal text-gray-800">
                  Usuario Fruta:
                  {' '}
                  {fruitUser ? 'SI' : 'NO'}
                </h3>
                <div className="content-center">
                  {(fruitUser
                    ? null : (fruits.map((fruit) => (
                      <div
                        key={`fruit-${fruit.id}`}
                        className="flex flex-row space-x-2 pl-20"
                      >
                        <img
                          className="w-8 h-8"
                          src={meraPng}
                        />
                        <div className="space-y-2">
                          <span className="font-medium">{fruit.name}</span>
                          <div className="items-center space-x-2 text-xs">
                            <button
                              onClick={() => { handleFruitConsume(fruit); }}
                              className="float-right h-10 bg-blue-400 bg-gray-200 w-20 text-white text-md rounded hover:shadow hover:bg-gray-300 mb-2"
                            >
                              Dar Fruta a
                              {' '}
                              {pirateSelected}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </Popup>
      <span className="text-sm font-medium text-center text-gray-700">
        Fuerza total:
        {' '}
        {player.strength}
      </span>
    </div>
  );
}
