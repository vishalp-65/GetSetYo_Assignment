import React, { useMemo } from 'react';
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Product Catalog
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover amazing products with our advanced filtering system. Find exactly what you're looking for.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center mb-6">
                        <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900">Smart Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Search Products</label>
                            <SearchInput
                                value={filters.searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by name..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <CategoryDropdown
                                value={filters.category}
                                onChange={handleCategoryChange}
                                categories={categories}
                            />
                        </div>

                        <div className="space-y-2">
                            <PriceRangeSlider
                                min={priceRange.min}
                                max={priceRange.max}
                                value={filters.priceRange}
                                onChange={handlePriceRangeChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Products ({filteredProducts.length})
                        </h3>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {filteredProducts.length} of {mockProducts.length} products
                        </div>
                    </div>

                    {filteredProducts.length > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>Curated for you</span>
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">
                                We couldn't find any products matching your criteria. Try adjusting your filters.
                            </p>
                            <button
                                onClick={() => updateFilters({ searchTerm: '', category: '', priceRange: { min: priceRange.min, max: priceRange.max } })}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};