import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: string, delay?: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
