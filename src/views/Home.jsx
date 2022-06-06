import { Link } from 'react-router-dom';

import onepieceBoard from '../assets/images/one-piece-board.png';
import routes from '../routes';

function Home() {
  return (
    <div>
      <div className="flex flex-row justify-center space-x-24">
        <div className="flex flex-col justify-center">
          <span className="text-3xl font-semibold">
            El primer juego basado
            <br />
            en onepiece.
          </span>
          <span className="mt-6 text-xl">
            Igual de entretenido pero sin ser tan largo.
          </span>
          <Link
            to={routes.games}
            className="self-start px-12 py-2 mt-12 text-xl font-semibold text-white transform rounded rounded-full bg-sky-600 hover:bg-sky-500 hover:scale-105"
          >
            Jugar
          </Link>
        </div>
        <div className="relative flex-shrink-0 w-[800px]">
          <img
            src={onepieceBoard}
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute w-[600px] top-12 right-12">
            <img
              src={onepieceBoard}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
