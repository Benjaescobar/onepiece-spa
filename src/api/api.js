import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function getJwt() {
  const jwt = JSON.parse(localStorage.getItem('user'));

  return jwt?.token;
}

export default function api(options) {
  const token = getJwt();

  return axios({
    ...options,
    baseURL: `${BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  }).then((response) => response.data);
}
