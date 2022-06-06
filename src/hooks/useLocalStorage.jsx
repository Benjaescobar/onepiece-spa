import { useState } from 'react';

function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  function setValue(value) {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  function clearValue() {
    localStorage.removeItem(key);
    setStoredValue(null);
  }

  return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
