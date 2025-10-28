export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface FilterState {
    searchTerm: string;
    category: string;
    priceRange: {
        min: number;
        max: number;
    };
}

export interface UseFetchResult<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
    retry: () => void;
}

export interface PaginatedData<T> {
    items: T[];
    hasMore: boolean;
    page: number;
    totalPages: number;
}