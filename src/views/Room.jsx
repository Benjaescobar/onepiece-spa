import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import toast from 'react-hot-toast';
import gamesApi from '../api/games';
import routes from '../routes';
import ShortTextInput from '../components/ShortTextInput';
import MainBtn from '../components/MainBtn';
import RoomPlayerCard from '../components/RoomPlayerCard';

const JoinGameSchema = Yup.object().shape({
  code: Yup.string().required('Obligatorio'),
});

export default function Room() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);

  const [joinLoading, setJoinLoading] = useState(false);
  const handleJoin = useCallback(({ code }, { setErrors }) => {
    setJoinLoading(true);

    gamesApi.join(code)
      .then((response) => {
        setGame(response.game);
        setPlayers(response.players);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setErrors({ code: 'Juego no existe.' });
        } else if (err.response?.data === 'game_started') {
          toast.error('El juego ya ha empezado :(');
        } else {
          toast.error('Hubo un error :(');
        }
        setJoinLoading(false);
      });
  });

  const [createLoading, setCreateLoading] = useState(false);
  const handleCreate = useCallback(() => {
    setCreateLoading(true);

    gamesApi.create()
      .then((response) => {
        setGame(response.game);
        setPlayers(response.players);
      })
      .catch((err) => {
        toast.error('Hubo un error :(');
        setCreateLoading(false);
      });
  });

  const [startLoading, setStartLoading] = useState(false);
  const handleStart = useCallback(() => {
    if (!game) {
      return;
    }

    setStartLoading(true);
    gamesApi.start(game.id)
      .then((response) => {
        navigate(`${routes.games}/${response.id}`);
      })
      .catch((err) => {
        toast.error('Hubo un error :(');

        setCreateLoading(false);
      });
  });

  const refreshGamePlayers = useCallback(() => {
    if (!game) {
      return;
    }

    gamesApi.getPlayers(game.id)
      .then((response) => {
        setPlayers(response);
      })
      .catch((err) => {
        toast.error('Hubo un error :(');
      });
  }, [game]);

  const refreshGameStatus = useCallback(() => {
    if (!game) {
      return;
    }

    gamesApi.get(game.id)
      .then((response) => {
        if (response.started) {
          navigate(`${routes.games}/${response.id}`);
        }
      })
      .catch((err) => {
        toast.error('Hubo un error :(');
      });
  }, [game]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      refreshGamePlayers();
      refreshGameStatus();
    }, 3000);

    return () => clearInterval(pollingInterval);
  }, [game]);

  return (
    <div className="flex flex-col w-full h-full">
      {game ? (
        <div className="flex flex-col self-center space-y-16">
          <span className="text-2xl font-medium text-center">Jugadores</span>
          <div className="flex flex-wrap items-center self-start justify-center w-full gap-12">
            {players.map((player) => (
              <RoomPlayerCard
                key={player.id}
                userId={player.userId}
              />
            ))}
          </div>
          <div className="flex flex-col self-center mt-12 space-y-2">
            <span className="text-md text-center font-medium">
              Code:
            </span>
            <input
              name="code"
              className="border bg-gradient-to-r from-purple-400 to-pink-400 text-md rounded-lg block text-center w-full p-2.5"
              value={game.code}
              readOnly
            />
          </div>
          <MainBtn
            type="submit"
            label="Empezar juego"
            classes="self-center px-20"
            variant="primary"
            onClick={handleStart}
            loading={startLoading}
          />
        </div>
      ) : (
        <div className="flex flex-col self-center mt-12 space-y-12">
          <span className="text-2xl font-medium">
            Ingresar a un juego
          </span>

          <div className="flex flex-col items-center space-y-1">
            <Formik
              initialValues={{ code: '' }}
              validationSchema={JoinGameSchema}
              onSubmit={handleJoin}
            >
              {() => (
                <Form className="flex flex-col w-full space-y-4">
                  <ShortTextInput
                    name="code"
                    label="Código del juego"
                  />
                  <MainBtn
                    type="submit"
                    label="Ingresar"
                    classes="w-full"
                    loading={joinLoading}
                  />
                </Form>
              )}
            </Formik>
            <span>O</span>
            <MainBtn
              type="submit"
              label="Crear juego"
              classes="w-full"
              variant="secondary"
              onClick={handleCreate}
              loading={createLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
