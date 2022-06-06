import classNames from 'classnames';
import { useField } from 'formik';

export default function ShortTextInput({ label, ...props }) {
  const [field, { touched, error }] = useField(props);

  return (
    <div className="flex flex-col w-full">
      <label
        className={classNames('block mb-2 text-sm font-medium', error ? 'text-red-700' : 'text-green-700')}
      >
        {label}
      </label>
      <input
        {...props}
        {...field}
        className={classNames(
          'border text-sm rounded-lg block w-full p-2.5',
          error ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900 placeholder-green-700',
        )}
      />
      {error && touched
        ? (<span className="mt-1 text-xs font-medium text-red-600">{ error }</span>)
        : null}
    </div>
  );
}
