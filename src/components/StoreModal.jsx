import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { useState } from 'react';

import bagSvg from '../assets/icons/bag.svg';
import fruitSvg from '../assets/icons/fruit.svg';
import consumbleSvg from '../assets/icons/consumable.svg';
import constants from '../constants';

const fruits = constants.FRUITS.map((fruit) => ({ ...fruit, type: 'fruit' }));
const consumables = constants.CONSUMABLES.map((consumable) => ({ ...consumable, type: 'consumable' }));

export default function StoreModal({ close, buy, money, position }) {
  const [item, setItem] = useState(null);
  const cell = constants.CELLS[position];
  const onIsland = (cell === 'ISLAND');

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full text-center">
          <div className="flex flex-col text-left transition-all transform bg-red-500 rounded-lg shadow-xl w-[700px] sm:my-8">
            <div className="w-full p-6 pb-4 bg-white">
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full">
                  <ReactSVG
                    src={bagSvg}
                    className="h-6 mb-1 stroke-current"
                  />
                </div>
                <div className="mt-0 ml-4 mr-8 text-left overflow-y-scroll pb-8 h-[600px]">
                  <div className="flex flex-row items-center justify-between mt-2 mb-12">
                    <h3
                      className="text-xl font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Tienda
                    </h3>
                    <span className="font-medium text-green-400">
                      $
                      {money || 0}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-12">
                    <div className="flex flex-col space-y-4">
                      <span className="font-semibold">Frutas</span>
                      <div className="flex flex-wrap gap-4">
                        {fruits.map((fruit) => (
                          <div
                            key={`fruit-${fruit.name}`}
                            className={classNames(
                              'flex flex-col items-center p-4 space-y-2 bg-gray-100 rounded-xl',
                              { 'bg-white border-2 border-green-200': item && item.name === fruit.name },
                            )}
                          >
                            <ReactSVG
                              src={fruitSvg}
                              className="stroke-current w-7 h-7"
                            />
                            <span>{fruit.name}</span>
                            <span>
                              $
                              {fruit.price}
                            </span>
                            <button
                              onClick={() => setItem(fruit)}
                              className="p-1 text-sm bg-green-300 rounded-lg hover:bg-green-200"
                            >
                              Seleccionar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <span className="font-semibold">Consumibles</span>
                      <div className="flex flex-wrap gap-4">
                        {consumables.map((consumable) => (
                          <div
                            key={`consumable-${consumable.name}`}
                            className={classNames(
                              'flex flex-col items-center p-4 space-y-2 bg-gray-100 rounded-xl',
                              { 'bg-white border-2 border-green-200': item && item.name === consumable.name },
                            )}
                          >
                            <ReactSVG
                              src={consumbleSvg}
                              className="stroke-current w-7 h-7"
                            />
                            <span>{consumable.name}</span>
                            <span>
                              $
                              {consumable.price}
                            </span>
                            <button
                              onClick={() => setItem(consumable)}
                              className="p-1 text-sm bg-green-300 rounded-lg hover:bg-green-200"
                            >
                              Seleccionar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => buy(item)}
                disabled={!item || !onIsland}
                className={classNames(
                  'inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none',
                  item && onIsland ? 'bg-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-white hover:bg-green-500' : 'bg-white text-black',
                )}
              >
                Comprar
              </button>
              <button
                onClick={close}
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
