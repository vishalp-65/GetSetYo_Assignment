import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { PostList } from './components/PostList';
import { PaginatedList } from './components/PaginatedList';
import './App.css';

type ActiveTab = 'products' | 'posts' | 'paginated';

function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('products');

    const tabs = [
        { id: 'products' as const, label: 'Filterable Products', component: ProductList },
        { id: 'posts' as const, label: 'Posts (useFetch)', component: PostList },
        { id: 'paginated' as const, label: 'Paginated Posts', component: PaginatedList },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProductList;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
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