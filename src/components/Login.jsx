import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // States for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { currentUser, handleUserLogin } = useAuth();

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrorMsg('Please complete all the fields');
      setError(true);
      return;
    }

    try {
      const url = 'http://localhost:3001';
      const body = {
        email,
        password,
      };
      const response = await axios.post(`${url}/api/sessions`, body);
      console.log(response.data);
      handleUserLogin(response.data);
      setSubmitted(true);
      setError(false);
      navigate(routes.home);
    } catch (err) {
      setError(true);
      if (!err?.response) {
        setErrorMsg('No Server Response');
      } else if (err.response?.status === 404) {
        setErrorMsg('Email Doesnt exist');
      } else if (err.response?.status === 401) {
        setErrorMsg('Wrong Password');
      } else {
        setErrorMsg('Registration Failed');
      }
    }
  };

  // Showing error message if error is true
  const errorMessage = () => (
    <div
      className="error"
      style={{
        display: error ? '' : 'none',
      }}
    >
      <h1 className="text-red-500">{errorMsg}</h1>
    </div>
  );

  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <form
        className="max-w-lg border border-gray-200 shadow-xs mx-auto rounded-lg p-10 bg-white text-center space-y-6 flex-grow"
        onSubmit={handleSubmit}
      >
        <h1 className="title font-bold text-gray-900 text-center">Sign In</h1>
        <div className="messages">
          {errorMessage()}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="self-start mb-2 font-medium text-gray-800"
          >
            Mail
          </label>
          <input
            onChange={handleEmail}
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            placeholder="ex: nombre@gmail.com"
            value={email}
            id="email"
            type="text"
            autoComplete="On"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="self-start mb-2 font-medium text-gray-800"
          >
            Contraseña
          </label>
          <input
            onChange={handlePassword}
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            placeholder="*********"
            value={password}
            id="password"
            type="text"
            autoComplete="On"
          />
        </div>
        <button
          className="w-full bg-sky-600 py-2 rounded bg-blue text-white font-semibold"
          type="submit"
          disabled={!(email && password)}
        >
          Inicia Sesión
        </button>
        <div className="flex items-center text-gray-800">
          <span className="block border border-gray-200 w-1/3 mr-2" />
          <span className="block whitespace-pre border w-1/3 " />
          <span className="block border border-gray-200 w-1/3 ml-2 align-right" />
        </div>
        <div className="flex justify-between">
          <span className="text-indigo-A300 font-semibold text-gray-800">
            <a
              href={routes.signup}
              className="text-blue-400"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
