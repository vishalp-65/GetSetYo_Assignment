import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';

interface PaginatedItem {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export const PaginatedList: React.FC = () => {
    const [items, setItems] = useState<PaginatedItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPage = async (pageNum: number, reset: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newItems = await response.json();

            if (reset) {
                setItems(newItems);
            } else {
                setItems(prev => [...prev, ...newItems]);
            }

            // JSONPlaceholder has 100 posts, so we can calculate if there are more
            setHasMore(newItems.length === 10 && pageNum * 10 < 100);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPage(nextPage);
        }
    };

    const retry = () => {
        setPage(1);
        setItems([]);
        setHasMore(true);
        fetchPage(1, true);
    };

    // Initial load
    useEffect(() => {
        fetchPage(1, true);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Paginated Posts</h2>

            {error && (
                <ErrorMessage message={error} onRetry={retry} className="mb-6" />
            )}

            <div className="space-y-4 mb-8">
                {items.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">{item.body}</p>
                        <div className="mt-3 text-sm text-gray-500">
                            Post #{item.id} • User {item.userId}
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
                {loading && <LoadingSpinner size="medium" className="mb-4" />}

                {hasMore && !loading && (
                    <button
                        onClick={loadMore}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Load More Posts
                    </button>
                )}

                {!hasMore && items.length > 0 && (
                    <p className="text-gray-500">No more posts to load</p>
                )}
            </div>
        </div>
    );
};