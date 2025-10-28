import { useState, useCallback } from 'react';
import { PaginatedData } from '../types';

interface UsePaginatedFetchResult<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    retry: () => void;
}

export function usePaginatedFetch<T>(
    baseUrl: string,
    itemsPerPage: number = 10
): UsePaginatedFetchResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPage = useCallback(async (pageNum: number, reset: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call with pagination
            const response = await fetch(`${baseUrl}?_page=${pageNum}&_limit=${itemsPerPage}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newItems = await response.json();

            if (reset) {
                setData(newItems);
            } else {
                setData(prev => [...prev, ...newItems]);
            }

            // Check if there are more items (simple heuristic)
            setHasMore(newItems.length === itemsPerPage);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, itemsPerPage]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPage(nextPage);
        }
    }, [loading, hasMore, page, fetchPage]);

    const retry = useCallback(() => {
        setPage(1);
        setData([]);
        setHasMore(true);
        fetchPage(1, true);
    }, [fetchPage]);

    // Initial load
    useState(() => {
        fetchPage(1, true);
    });

    return {
        data,
        loading,
        error,
        hasMore,
        loadMore,
        retry,
    };
}