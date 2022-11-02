import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  const fetchData = useCallback(
    async ({ url, method = "get", body = null, headers = {} }) => {
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        setIsLoading(true);
        const { data, status } = await axios[method](url, body, {
          headers,
          signal: httpAbortController.signal,
        });
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );
        if (status > 399) {
          throw new Error(data.response.data.message);
        }
        return data;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((ctrl) => ctrl.abort());
    };
  }, []);
  const clearError = () => setError(null);
  return { isLoading, error, fetchData, clearError };
};
