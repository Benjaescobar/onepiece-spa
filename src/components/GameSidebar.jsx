import { useCallback, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import diceSvg from '../assets/icons/dice.svg';
import MainBtn from './MainBtn';
import gamesApi from '../api/games';
import fruitsApi from '../api/fruits';
import consumablesApi from '../api/consumables';
import Inventory from './Inventory';
import Tripulation from './Tripulation';

export default function GameSidebar() {
  const { id: gameID } = useParams();
  const [diceRolled, setDiceRolled] = useState(false);

  const handleDiceRoll = useCallback(() => {
    gamesApi.rollDice(gameID)
      .then((response) => {
        toast.success('Dado lanzado.');
        setDiceRolled(true);
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          toast.error('No es tu turno o ya tiraste el dado.');
          setDiceRolled(true);
        }
      });
  }, []);

  const handleEndTurn = useCallback(() => {
    if (!diceRolled) {
      toast.error('Debes lanzar el dado.');
    } else {
      gamesApi.endTurn(gameID)
        .then((response) => {
          toast.success('Turno terminado.');
          setDiceRolled(false);
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            toast.error('No es tu turno');
          }
        });
    }
  }, []);

  const [player, setPlayer] = useState({});
  const refreshPlayer = useCallback(() => {
    gamesApi.me(gameID)
      .then((response) => {
        setPlayer(response);
      })
      .catch(() => {
        toast.error('Hubo un error :(');
      });
  }, []);

  const buyFruit = useCallback((fruit) => {
    fruitsApi.buy(gameID, fruit.name)
      .then((response) => {
        toast.success(`${response.name} comprada!`);
        setPlayer((p) => ({
          ...p,
          money: p.money - fruit.price,
          fruits: [...p.fruits, response],
        }));
      })
      .catch((err) => {
        if (err.response?.data === 'not_enough_money') {
          toast.error('No tienes suficiente dinero :(');
        }
      });
  }, []);

  const buyConsumable = useCallback((consumable) => {
    consumablesApi.buy(gameID, consumable.name)
      .then((response) => {
        toast.success(`${response.name} comprado!`);

        setPlayer((p) => ({
          ...p,
          money: p.money - consumable.price,
          consumables: [...p.consumables, response],
        }));
      })
      .catch((err) => {
        if (err.response?.data === 'not_enough_money') {
          toast.error('No tienes suficiente dinero :(');
        }
      });
  }, []);

  const handleBuy = useCallback((item) => {
    if (item.type === 'fruit') {
      buyFruit(item);
    } else if (item.type === 'consumable') {
      buyConsumable(item);
    }
  }, []);

  const sellFruit = useCallback((fruit) => {
    fruitsApi.sell(gameID, fruit.id)
      .then(() => {
        toast.success(`${fruit.name} vendida!`);
        setPlayer((p) => ({
          ...p,
          money: p.money + fruit.price,
          fruits: p.fruits.filter((f) => f.id !== fruit.id),
        }));
      })
      .catch(() => {
        toast.error('Hubo un error vendiendo la fruta :(');
      });
  }, []);

  const sellConsumable = useCallback((consumable) => {
    consumablesApi.sell(gameID, consumable.id)
      .then(() => {
        toast.success(`${consumable.name} vendida!`);
        setPlayer((p) => ({
          ...p,
          money: p.money + consumable.price,
          consumables: p.consumables.filter((c) => c.id !== consumable.id),
        }));
      })
      .catch(() => {
        toast.error('Hubo un error vendiendo el consumible :(');
      });
  }, []);

  const handleSell = useCallback((item, type) => {
    if (type === 'fruit') {
      sellFruit(item);
    } else if (type === 'consumable') {
      sellConsumable(item);
    }
  }, []);

  const consumeFruit = useCallback((fruit) => {
    fruitsApi.consume(gameID, fruit.id)
      .then(() => {
        toast.success(`${fruit.name} consumida!`);
        setPlayer((p) => ({
          ...p,
          fruits: p.fruits.filter((f) => f.id !== fruit.id),
        }));
      })
      .catch(() => {
        toast.error('Hubo un error consumiendo la fruta :(');
      });
  }, []);

  const consumeConsumable = useCallback((consumable) => {
    consumablesApi.consume(gameID, consumable.id)
      .then(() => {
        toast.success(`${consumable.name} consumido!`);
        setPlayer((p) => ({
          ...p,
          consumables: p.consumables.filter((c) => c.id !== consumable.id),
        }));
      })
      .catch(() => {
        toast.error('Hubo un error consumiendo el consumible :(');
      });
  }, []);

  const handleConsume = useCallback((item, type) => {
    if (type === 'fruit') {
      consumeFruit(item);
    } else if (type === 'consumable') {
      consumeConsumable(item);
    }
  }, []);

  const [logs, setLogs] = useState([]);
  const refreshLogs = useCallback(() => {
    gamesApi.getLogs(gameID)
      .then((response) => {
        setLogs(response);
      })
      .catch((err) => {
        toast.error('Hubo un error actualizando los logs :(');
      });
  }, []);

  useEffect(() => {
    refreshPlayer();
    refreshLogs();

    const pollingInterval = setInterval(() => {
      refreshPlayer();
      refreshLogs();
    }, 5000);

    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="flex flex-col w-[250px] items-start justify-between flex-shrink-0 p-6 space-y-6">
      <div>
        <Tripulation player={player} />
      </div>
      <Inventory
        buy={handleBuy}
        player={player}
        sell={handleSell}
        consume={handleConsume}
      />
      <div>
        acciones
      </div>
      <div className="flex flex-col w-full space-y-2">
        <MainBtn
          label="Tirar dado"
          svg={diceSvg}
          classes="w-full"
          onClick={handleDiceRoll}
        />
        <MainBtn
          label="Terminar turno"
          variant="secondary"
          classes={(diceRolled ? 'w-full' : 'opacity-40 w-full')}
          onClick={handleEndTurn}
        />
      </div>
      <div className="flex flex-col w-full h-64 p-4 space-y-2 overflow-y-scroll bg-gray-100 divide-y divide-gray-200 rounded-lg">
        {logs.map((log) => (
          (
            <span
              key={`log-${log.id}`}
              className="py-2 text-xs text-gray-600 break-word"
            >
              {log.body}
            </span>
          )
        ))}
      </div>
    </div>
  );
}
