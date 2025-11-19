import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

export default function useAxios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const request = useCallback(async (url, options = {}) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        signal: abortControllerRef.current.signal,
        ...options,
      });
      
      return response.data;
    } catch (err) {
      // Don't set error if request was cancelled
      if (axios.isCancel(err)) {
        console.log('Request cancelled:', err.message);
        return null;
      }
      
      // Handle axios error response
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'An error occurred';
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return { request, loading, error, cancel };
}