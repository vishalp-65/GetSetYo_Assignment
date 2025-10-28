import { Product } from '../types';

export const mockProducts: Product[] = [
    { id: 1, name: 'iPhone 14', category: 'Electronics', price: 999, description: 'Latest Apple smartphone' },
    { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 1999, description: 'Professional laptop' },
    { id: 3, name: 'Nike Air Max', category: 'Clothing', price: 120, description: 'Comfortable running shoes' },
    { id: 4, name: 'Levi\'s Jeans', category: 'Clothing', price: 80, description: 'Classic denim jeans' },
    { id: 5, name: 'Coffee Maker', category: 'Home', price: 150, description: 'Automatic drip coffee maker' },
    { id: 6, name: 'Blender', category: 'Home', price: 75, description: 'High-speed blender' },
    { id: 7, name: 'Samsung Galaxy', category: 'Electronics', price: 899, description: 'Android smartphone' },
    { id: 8, name: 'Adidas Hoodie', category: 'Clothing', price: 60, description: 'Comfortable hoodie' },
    { id: 9, name: 'Desk Lamp', category: 'Home', price: 45, description: 'LED desk lamp' },
    { id: 10, name: 'Wireless Headphones', category: 'Electronics', price: 200, description: 'Noise-canceling headphones' },
    { id: 11, name: 'Running Shorts', category: 'Clothing', price: 35, description: 'Athletic shorts' },
    { id: 12, name: 'Kitchen Scale', category: 'Home', price: 25, description: 'Digital kitchen scale' },
    { id: 13, name: 'Tablet', category: 'Electronics', price: 399, description: '10-inch tablet' },
    { id: 14, name: 'Winter Jacket', category: 'Clothing', price: 180, description: 'Waterproof winter jacket' },
    { id: 15, name: 'Air Purifier', category: 'Home', price: 250, description: 'HEPA air purifier' },
];

export const getUniqueCategories = (products: Product[]): string[] => {
    return Array.from(new Set(products.map(product => product.category)));
};

export const getPriceRange = (products: Product[]): { min: number; max: number } => {
    const prices = products.map(product => product.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };
};