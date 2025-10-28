import { useState, useEffect, useCallback } from 'react';
import { UseFetchResult } from '../types';

// Simple in-memory cache
const cache = new Map<string, any>();

export function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        if (!url) return;

        // Check cache first
        if (cache.has(url)) {
            setData(cache.get(url));
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Cache successful response
            cache.set(url, result);
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const retry = useCallback(() => {
        // Clear cache for this URL and refetch
        cache.delete(url);
        fetchData();
    }, [url, fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, loading, retry };
}