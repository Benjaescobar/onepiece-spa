function Credits() {
  return (
    <div className="flex flex-row items-center justify-center space-x-24">
      <div className="flex flex-col space-y-4 text-xl">
        <span className="font-semibold">Nuestro equipo</span>
        <p className="max-w-lg">
          Somos estudiantes de Ingeniería en la UC desarrollando un juego para el ramo IIC2513-2.
          Fuimos compañeros de colegio desde los 7 años además de compañeros de equipo en el ramo
          Inovación y emprendimiento.
        </p>
      </div>
      <div className="border flex flex-row items-center text-sm px-12 justify-between rounded-md shadow w-[600px] h-[400px] flex-shrink-0">
        <div className="flex flex-col space-y-0.5 items-center">
          <div className="w-16 h-16 bg-red-200 rounded-full">
            el chino
          </div>
          <span className="font-semibold">Domingo Carvajal</span>
          <span>Major Computación</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full">
            el benja
          </div>
          <span className="font-semibold">Domingo Carvajal</span>
          <span>Major IDI track Computación</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-200 rounded-full">
            el Ramón
          </div>
          <span className="font-semibold">Ramón Echeverría</span>
          <span>Major Computación</span>
        </div>
      </div>
    </div>
  );
}

export default Credits;
