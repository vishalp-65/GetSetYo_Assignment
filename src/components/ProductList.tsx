import React, { useMemo } from 'react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SearchInput } from './filters/SearchInput';
import { CategoryDropdown } from './filters/CategoryDropdown';
import { PriceRangeSlider } from './filters/PriceRangeSlider';
import { mockProducts, getUniqueCategories, getPriceRange } from '../utils/mockData';
import { useUrlParams } from '../hooks/useUrlParams';

export const ProductList: React.FC = () => {
    const { filters, updateFilters } = useUrlParams();

    const categories = useMemo(() => getUniqueCategories(mockProducts), []);
    const priceRange = useMemo(() => getPriceRange(mockProducts), []);

    const filteredProducts = useMemo(() => {
        return mockProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesCategory = !filters.category || product.category === filters.category;
            const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [filters]);

    const handleSearchChange = (searchTerm: string) => {
        updateFilters({ ...filters, searchTerm });
    };

    const handleCategoryChange = (category: string) => {
        updateFilters({ ...filters, category });
    };

    const handlePriceRangeChange = (newPriceRange: { min: number; max: number }) => {
        updateFilters({ ...filters, priceRange: newPriceRange });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Catalog</h1>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SearchInput
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                    />

                    <CategoryDropdown
                        value={filters.category}
                        onChange={handleCategoryChange}
                        categories={categories}
                    />

                    <PriceRangeSlider
                        min={priceRange.min}
                        max={priceRange.max}
                        value={filters.priceRange}
                        onChange={handlePriceRangeChange}
                    />
                </div>
            </div>

            {/* Results */}
            <div className="mb-4">
                <p className="text-gray-600">
                    Showing {filteredProducts.length} of {mockProducts.length} products
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};