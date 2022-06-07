import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

import sessionsApi from '../api/session';
import ShortTextInput from './ShortTextInput';
import MainBtn from './MainBtn';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido.').required('Obligatorio'),
  password: Yup.string().min(6, 'Muy corta!').required('Obligatorio'),
});

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { currentUser, handleUserLogin } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(({ email, password }, { setErrors }) => {
    setLoading(true);

    sessionsApi.create(email, password)
      .then((jwt) => {
        handleUserLogin(jwt);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErrors({ email: 'Email no existe.' });
        } else if (err.response.status === 401) {
          setErrors({ password: 'Contraseña incorrecta.' });
        } else {
          toast.error('Hubo un error :(');
        }

        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.isAdmin ? routes.admin : (state?.path || routes.games));
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col w-full space-y-8">
      <span className="text-2xl font-medium text-center">
        Iniciar sesión
      </span>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col w-full space-y-4">
            <ShortTextInput
              name="email"
              label="Email"
            />
            <ShortTextInput
              name="password"
              label="Password"
            />
            <MainBtn
              type="submit"
              label="Ingresar"
              classes="w-full"
              loading={loading}
            />
          </Form>
        )}
      </Formik>

      <span className="block mt-4 text-sm text-center">
        No tienes cuenta?
        <Link
          to={routes.signup}
          className="ml-1 text-blue-400 underline"
        >
          Registrate
        </Link>
      </span>
    </div>
  );
}
