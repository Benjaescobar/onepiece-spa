import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import routes from '../routes';

function Signup() {
  const navigate = useNavigate();

  // States for registration
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

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
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setErrorMsg('Please complete all the fields');
      setError(true);
      return;
    }

    try {
      const url = 'http://localhost:3001';
      const body = {
        firstName: name,
        lastName,
        email,
        password,
      };
      const response = await axios.post(`${url}/api/users`, body);
      console.log(response);
      setSubmitted(true);
      setError(false);
      navigate(routes.login);
    } catch (err) {
      setError(true);
      if (!err?.response) {
        setErrorMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrorMsg('Username Taken');
      } else {
        setErrorMsg('Registration Failed');
      }
    }
  };

  // Showing success message
  const successMessage = () => (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}
    >
      <h1>
        User
        {name}
        {' '}
        successfully registered!!
      </h1>
    </div>
  );

  // Showing error message if error is true
  const errorMessage = () => (
    <div
      className="error"
      style={{
        display: error ? '' : 'none',
      }}
    >
      <h1>{errorMsg}</h1>
    </div>
  );
  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <form
        className="max-w-lg border border-gray-200 shadow-xs mx-auto rounded-lg p-10 bg-white text-center space-y-6 flex-grow"
        onSubmit={handleSubmit}
      >
        <h1 className="title font-bold text-gray-900 text-center">Sign Up</h1>
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="self-start mb-2 font-medium text-gray-800"
          >
            Ingresa tu nombre
          </label>
          <input
            onChange={handleName}
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            placeholder="Escribe tu nombre"
            value={name}
            id="name"
            type="text"
            autoComplete="Off"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="self-start mb-2 font-medium text-gray-800"
          >
            Ingresa tu apellido
          </label>
          <input
            onChange={handleLastName}
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            placeholder="Escribe tu apellido"
            value={lastName}
            id="lastName"
            type="text"
            autoComplete="Off"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="self-start mb-2 font-medium text-gray-800"
          >
            Ingresa tu mail
          </label>
          <input
            type="email"
            id="email"
            placeholder="nombre@gmail.com"
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            onChange={handleEmail}
            value={email}
            autoComplete="Off"
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
            id="password"
            placeholder="*********"
            className="outline-none px-2 py-2 border shadow-sm placeholder-gray-500 opacity-50 rounded"
            onChange={handlePassword}
            value={password}
            type="password"
            autoComplete="Off"
          />
        </div>
        <button
          className="w-full bg-sky-600 py-2 rounded bg-blue text-white font-semibold"
          type="submit"
        >
          Registrate
        </button>
        <div className="flex items-center text-gray-800">
          <span className="block border border-gray-200 w-1/3 mr-2" />
          <span className="block whitespace-pre border w-1/3 " />
          <span className="block border border-gray-200 w-1/3 ml-2 align-right" />
        </div>
        <div className="flex justify-between">
          <span className="text-indigo-A300">
            Ya tienes cuenta? <a className='text-blue-500' href={routes.login}>Inicia Sesión</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
