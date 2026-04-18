import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { API_URL } from './api';

export { API_URL };

export function useApiQuery<T>(key: string[], fetcher: () => Promise<T>, options?: object) {
  return useQuery({ queryKey: key, queryFn: fetcher, ...options });
}

export function useApiMutation<T>(mutationFn: (data?: unknown) => Promise<T>) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api'] });
      setError(null);
    },
    onError: (err: Error) => {
      setError(err);
    },
  });

  return { ...mutation, error };
}

export { api };
export default api;