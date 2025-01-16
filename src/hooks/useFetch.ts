import { useState, useEffect } from 'react';

//* A custom hook that behaves somewhat like React Query except it does not
// cache or dedupe requests
export function useFetch<T = Response>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setStatus(null)
    setError(null);

    const fn = async () => {
      try {
        const response = await fetch(url);
        setStatus(response.status)
        if (!response.ok) {
          throw new Error(await response?.text() || response.statusText);
        }
        const data = await response.json();
        setIsLoading(false);
        setData(data);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };
    fn();
  }, [url]);

  return { data, status, isLoading, error };
}
