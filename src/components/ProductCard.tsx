import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
            </div>

            <div className="mb-2">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                </span>
            </div>

            {product.description && (
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            )}
        </div>
    );
};