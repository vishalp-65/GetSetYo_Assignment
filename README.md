# Dynamic Filterable List Application

A comprehensive React TypeScript application featuring filterable product lists, reusable data fetching hooks, and paginated content display.

## Features

### 1. Dynamic Filterable Product List
- Fetches/mocks array of products with name, category, and price
- Renders items in a responsive grid layout
- ext input for case-insensitive name filtering
- Dropdown for category filtering
- **Bonus**: Price range slider for min/max filtering
- **Bonus**: URL query params persistence for deep-linking
- **Bonus**: Reusable `useFetch` hook with caching and retry

### 2. Reusable useFetch Hook
- Fetches data when URL changes
- Exposes `{ data, error, loading, retry }` interface
- Caches successful responses in memory Map
- Returns cached data immediately for repeated URLs
- Includes PostList component demonstrating usage

### 3. Paginated Data Component
- Fetches paginated data from JSONPlaceholder API
- "Load More" functionality
- Loading spinner during requests
- Comprehensive error handling with retry
- Proper state management for pagination

## Technical Implementation

### Architecture
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Custom hooks for data fetching and URL state management
- **Tailwind CSS**: Utility-first styling with responsive design
- **Component Composition**: Reusable, modular components

### Key Components
- `ProductList`: Main filterable list with all filter controls
- `PostList`: Demonstrates useFetch hook usage
- `PaginatedList`: Load-more pagination implementation
- `useFetch`: Reusable data fetching with caching
- `useUrlParams`: URL state synchronization
- `LoadingSpinner` & `ErrorMessage`: Reusable UI components

### Best Practices
- **Error Boundaries**: Comprehensive error handling
- **Loading States**: User feedback during async operations
- **Accessibility**: ARIA labels and semantic HTML
- **Performance**: Memoization and efficient re-renders
- **Code Organization**: Clear separation of concerns

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Usage

### Product Filtering
- Use the search input to filter products by name
- Select a category from the dropdown to filter by category
- Adjust the price range slider to filter by price
- All filters work together and persist in the URL

### URL Deep-linking
The application supports deep-linking with query parameters:
- `?search=iphone` - Pre-fills search term
- `?category=Electronics` - Pre-selects category
- `?minPrice=100&maxPrice=500` - Sets price range

### Data Fetching
The `useFetch` hook provides:
- Automatic caching of successful responses
- Loading and error states
- Retry functionality
- URL change detection

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── filters/          # Filter-specific components
│   ├── ProductCard.tsx   # Product display component
│   ├── ProductList.tsx   # Main filterable list
│   ├── PostList.tsx      # useFetch demonstration
│   └── PaginatedList.tsx # Pagination implementation
├── hooks/
│   ├── useFetch.ts       # Reusable data fetching
│   ├── useUrlParams.ts   # URL state management
│   └── usePaginatedFetch.ts # Pagination logic
├── types/
│   └── index.ts          # TypeScript definitions
├── utils/
│   └── mockData.ts       # Sample data and utilities
└── App.tsx               # Main application component
```

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Custom Hooks** for state management
- **JSONPlaceholder API** for demo data
- **URL Search Params** for state persistence