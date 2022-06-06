import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import toast from 'react-hot-toast';

import userSvg from '../assets/icons/user.svg';
import diceSvg from '../assets/icons/dice.svg';
import usersApi from '../api/users.js';

export default function RoomPlayerCard({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    usersApi.get(userId)
      .then((response) => {
        setUser(response);
      })
      .catch(() => {
        toast.err('Hubo un error :(');
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-10 py-4 space-y-2 bg-gradient-to-r from-purple-400 to-pink-400 hover:bg-gradient-to-l focus:ring-4 rounded-xl">
      <ReactSVG
        className="w-8 h-8 fill-current"
        src={userSvg}
      />
      {user ? (
        <span className="font-medium">
          {user.firstName}
        </span>
      ) : null}
    </div>
  );
}
