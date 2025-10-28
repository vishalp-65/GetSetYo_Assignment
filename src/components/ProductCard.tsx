import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
    const getCategoryColor = (category: string) => {
        const colors = {
            'Electronics': 'bg-blue-100 text-blue-800 border-blue-200',
            'Clothing': 'bg-green-100 text-green-800 border-green-200',
            'Home': 'bg-purple-100 text-purple-800 border-purple-200',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100 ${className}`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 truncate pr-2">{product.name}</h3>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-xs text-gray-500">USD</span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(product.category)}`}>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {product.category}
                </span>
            </div>

            {/* Description */}
            {product.description && (
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
            )}

            {/* Action Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
};