import { useState, useEffect, useCallback } from 'react';
import { FilterState } from '../types';

export function useUrlParams() {
    const [filters, setFilters] = useState<FilterState>(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            searchTerm: params.get('search') || '',
            category: params.get('category') || '',
            priceRange: {
                min: Number(params.get('minPrice')) || 0,
                max: Number(params.get('maxPrice')) || 1000,
            },
        };
    });

    const updateUrl = useCallback((newFilters: FilterState) => {
        const params = new URLSearchParams();

        if (newFilters.searchTerm) {
            params.set('search', newFilters.searchTerm);
        }

        if (newFilters.category) {
            params.set('category', newFilters.category);
        }

        if (newFilters.priceRange.min > 0) {
            params.set('minPrice', newFilters.priceRange.min.toString());
        }

        if (newFilters.priceRange.max < 1000) {
            params.set('maxPrice', newFilters.priceRange.max.toString());
        }

        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
    }, []);

    const updateFilters = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
        updateUrl(newFilters);
    }, [updateUrl]);

    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setFilters({
                searchTerm: params.get('search') || '',
                category: params.get('category') || '',
                priceRange: {
                    min: Number(params.get('minPrice')) || 0,
                    max: Number(params.get('maxPrice')) || 1000,
                },
            });
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return { filters, updateFilters };
}