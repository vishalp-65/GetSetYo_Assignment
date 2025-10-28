import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { PostList } from './components/PostList';
import { PaginatedList } from './components/PaginatedList';
import './App.css';

type ActiveTab = 'products' | 'posts' | 'paginated';

function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('products');

    const tabs = [
        { id: 'products' as const, label: 'Filterable Products', component: ProductList, icon: '🛍️' },
        { id: 'posts' as const, label: 'Posts (useFetch)', component: PostList, icon: '📝' },
        { id: 'paginated' as const, label: 'Paginated Posts', component: PaginatedList, icon: '📄' },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProductList;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">DF</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Dynamic Filter</span>
                            </div>
                        </div>

                        <div className="flex space-x-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.id
                                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main>
                <ActiveComponent />
            </main>
        </div>
    );
}

export default App;