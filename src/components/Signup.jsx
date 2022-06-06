import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import ShortTextInput from './ShortTextInput';
import MainBtn from './MainBtn';
import routes from '../routes';
import usersApi from '../api/users';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido.').required('Obligatorio'),
  password: Yup.string().min(6, 'Muy corta!').required('Obligatorio'),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

export default function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(({
    email, password, firstName, lastName,
  }) => {
    setLoading(true);

    usersApi.create({
      email, password, firstName, lastName,
    })
      .then((response) => {
        toast.success('Usuario creado.');
        navigate(routes.login);
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full space-y-8">
      <span className="text-2xl font-medium text-center">
        Crear cuenta
      </span>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={SignupSchema}
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
            <ShortTextInput
              name="firstName"
              label="Nombre"
            />
            <ShortTextInput
              name="lastName"
              label="Apellido"
            />
            <MainBtn
              type="submit"
              label="Registrarse"
              classes="w-full"
              loading={loading}
            />
          </Form>
        )}
      </Formik>

      <span className="block mt-4 text-sm text-center">
        Ya tienes cuenta?
        <Link
          to={routes.login}
          className="ml-1 text-blue-400 underline"
        >
          Inicia sesión
        </Link>
      </span>
    </div>
  );
}
