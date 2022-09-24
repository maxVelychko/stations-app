import { useEffect, useState } from 'react';

interface UseFetchDataReturnType {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export const useFetchData = (endpointUrl: string): UseFetchDataReturnType => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(endpointUrl);
        const dataResult = await response.json();

        setData(dataResult);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [endpointUrl]);

  return { data, isLoading, isError };
}
