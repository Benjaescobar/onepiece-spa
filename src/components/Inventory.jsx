import { useState, useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import bagSvg from '../assets/icons/bag.svg';
import crossSvg from '../assets/icons/cross.svg';
import meraPng from '../assets/images/mera.png';
import dialPng from '../assets/images/dial.png';
import StoreModal from './StoreModal';
import constants from '../constants';

function fruitPrice(name) {
  return constants.FRUITS.find((fruit) => fruit.name === name).price;
}

function consumablePrice(name) {
  return constants.CONSUMABLES.find((consumable) => consumable.name === name).price;
}

export default function Inventory({
  buy, sell, consume, player,
}) {
  const [storeOpen, setStoreOpen] = useState(false);

  const fruits = useMemo(() => {
    if (!player?.fruits) { return []; }

    return player.fruits.map((fruit) => ({ ...fruit, price: fruitPrice(fruit.name) }));
  }, [player]);

  const consumables = useMemo(() => {
    if (!player?.consumables) { return []; }

    return player.consumables.map((consumable) => ({
      ...consumable, price: consumablePrice(consumable.name),
    }));
  }, [player]);

  return (
    <div className="flex flex-col w-full">
      {storeOpen ? (
        <StoreModal
          close={() => setStoreOpen(false)}
          buy={buy}
          money={player.money}
          position={player.position}
        />
      ) : null}

      <div className="flex flex-row self-start space-x-2 text-gray-400">
        <ReactSVG
          src={bagSvg}
          className="h-6 mb-1 stroke-current"
        />
        <span className="text-xl font-medium">Inventario</span>
        <button
          className="transform hover:scale-110"
          onClick={() => setStoreOpen(true)}
        >
          <ReactSVG
            src={crossSvg}
            className="w-4 h-4 stroke-current"
          />
        </button>
      </div>
      <div className="flex flex-col mt-8 ml-2 space-y-4 h-[200px] bg-gray-50 p-2 rounded-lg overflow-y-scroll">
        {fruits.map((fruit) => (
          <div
            key={`fruit-${fruit.id}`}
            className="flex flex-row space-x-2"
          >
            <img
              className="w-8 h-8"
              src={meraPng}
            />
            <div className="flex flex-col space-y-2">
              <span className="font-medium">{fruit.name}</span>
              <div className="flex flex-row items-center space-x-2 text-xs">
                <button
                  onClick={() => sell(fruit, 'fruit')}
                  className="text-green-500 hover:text-green-800"
                >
                  vender
                  {' '}
                  <span>
                    $
                    {fruit.price}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {consumables.map((consumable) => (
          <div
            key={`consumable-${consumable.id}`}
            className="flex flex-row space-x-2"
          >
            <img
              className="w-8 h-8"
              src={dialPng}
            />
            <div className="flex flex-col space-y-2">
              <span className="font-medium">{consumable.name}</span>
              <div className="flex flex-row items-center space-x-2 text-xs">
                <button
                  onClick={() => sell(consumable, 'consumable')}
                  className="text-green-500 hover:text-green-800"
                >
                  vender
                  {' '}
                  <span>
                    $
                    {consumable.price}
                  </span>
                </button>
                <button
                  onClick={() => consume(consumable)}
                  className="text-xs text-black hover:text-gray-700"
                >
                  Ocupar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
