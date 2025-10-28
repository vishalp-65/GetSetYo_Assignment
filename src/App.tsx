import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { PostList } from './components/PostList';
import { PaginatedList } from './components/PaginatedList';
import './App.css';

type ActiveTab = 'products' | 'posts' | 'paginated';

function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('products');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'products' as const, label: 'Filterable Products', shortLabel: 'Products', component: ProductList, icon: '🛍️' },
        { id: 'posts' as const, label: 'Posts (useFetch)', shortLabel: 'Posts', component: PostList, icon: '📝' },
        { id: 'paginated' as const, label: 'Paginated Posts', shortLabel: 'Paginated', component: PaginatedList, icon: '📄' },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProductList;

    const handleTabClick = (tabId: ActiveTab) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DF</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">Dynamic Filter</span>
                            <span className="text-lg font-bold text-gray-900 sm:hidden">DF</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span className="hidden lg:block">{tab.label}</span>
                                    <span className="lg:hidden">{tab.shortLabel}</span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 mb-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`w-full text-left px-3 py-3 rounded-md font-medium text-base transition-all duration-200 flex items-center space-x-3 ${activeTab === tab.id
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                                        }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Content */}
            <main>
                <ActiveComponent />
            </main>
        </div>
    );
}

export default App;