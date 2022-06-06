import { Outlet } from 'react-router-dom';
import roomImage from '../assets/images/room.png';

export default function RoomLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row justify-center bg-white shadow w-[1000px]">
        <div className="flex items-center justify-center w-[500px] bg-gray-200">
          <div className="flex items-center justify-center p-12">
            <img
              src={roomImage}
              className="w-[25rem] h-[30rem] "
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow px-12 py-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
