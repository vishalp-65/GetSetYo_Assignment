import React from 'react';

interface CategoryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    categories: string[];
    className?: string;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    value,
    onChange,
    categories,
    className = ''
}) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
};