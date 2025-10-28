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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Posts Collection</h2>
                    <p className="text-gray-600">Demonstrating the useFetch hook with caching</p>
                </div>

                <div className="space-y-6">
                    {data?.slice(0, 10).map(post => (
                        <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900 capitalize leading-tight">
                                    {post.title}
                                </h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 ml-4">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>User {post.userId}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">{post.body}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                                        Post #{post.id}
                                    </span>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};