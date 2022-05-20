import game from '../assets/images/game.png';

function About() {
  return (
    <div className="flex flex-col items-center max-w-6xl space-y-36">
      <div className="flex flex-col space-y-12 text-xl">
        <span className="text-2xl font-bold">Acerca del juego</span>
        <p>
          One Piece Race es un juego de tablero por turnos en donde los jugadores tienen
          que lanzar los dados para avanzar. En cada casilla del tablero hay efectos positivos
          o negativos para el jugador, dichos efectos pueden trasladarte por el tablero o hacer
          tu tripulaciónm más fuerte. Se tendrá que ir formando una tripulación fuerte ya que
          al final del tablero te enfrentaras a unos oponentes que te bloquearan el camino
          si se tiene la fuerza sufieciente. One Piece Race es un juego en línea.
          En el futuro se hará una versión para que puedas disfrutar con tus amigos o
          familia sin necesidad de un computador.
        </p>
      </div>
      <div className="w-[750px]">
        <img
          src={game}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default About;
