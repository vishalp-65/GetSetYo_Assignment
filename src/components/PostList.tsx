import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export const PostList: React.FC = () => {
    const { data, error, loading, retry } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>
                <LoadingSpinner size="large" className="py-12" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>
                <ErrorMessage message={error} onRetry={retry} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>

            <div className="space-y-4">
                {data?.slice(0, 10).map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">{post.body}</p>
                        <div className="mt-3 text-sm text-gray-500">
                            Post #{post.id} • User {post.userId}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};