'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import useDebounce from '@/hooks/useDebounce';

export default function Home() {
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Initialize state from URL query parameters using window
  const getInitialParams = () => {
    if (typeof window === 'undefined') return { search: '', category: 'all', page: 1 };
    
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      category: params.get('category') || 'all',
      page: parseInt(params.get('page') || '1')
    };
  };

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  // Initialize from URL on mount
  useEffect(() => {
    const initialParams = getInitialParams();
    setSearch(initialParams.search);
    setCategory(initialParams.category);
    setPage(initialParams.page);
    setMounted(true);
  }, []);

  // Update URL when state changes (only after mounted)
  useEffect(() => {
    if (!mounted) return;

    const params = new URLSearchParams();
    
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }
    
    if (category && category !== 'all') {
      params.set('category', category);
    }
    
    if (page > 1) {
      params.set('page', page.toString());
    }

    // Update URL without page reload
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    
    // Use window.history.pushState for better compatibility
    if (window.history.pushState) {
      window.history.pushState(null, '', newUrl);
    } else {
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedSearch, category, page, mounted, router]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
    (category === 'all' || p.category === category)
  );

  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [debouncedSearch, category, totalPages, page]);

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">            
            <h1 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-5">
              Discover, Explore, and Shop the<br className="hidden md:block" />
              Latest Innovations in Our Collection
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base mb-8">
              Discover innovative technology and products! Our store offers the latest advancements to enhance
              your lifestyle. Browse our selection, find revolutionary items, and enjoy a seamless shopping
              experience. From gadgets to tools, we meet all your needs. Join us in shaping the future of shopping!
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Our Products
            </button>
          </div>

          {/* Three Images Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="md:row-span-2">
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/groceries.jpg" 
                  alt="Construction tools on wooden surface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full h-[190px] md:h-[190px] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/cosmetics.jpg" 
                  alt="Engineering tools and supplies"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full h-[190px] md:h-[190px] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/furniture.jpg" 
                  alt="Yellow hard hat with blueprints"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-12 md:py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-sm text-orange-500 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 bg-orange-500 rounded-sm"></span>
              See all Products
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Discover High-Quality Products
            </h2>
            <p className="text-gray-600 max-w-md text-sm">
              Browse our curated selection of premium products trusted by professionals worldwide.
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={search} onChange={handleSearchChange} />
              </div>
              <div className="lg:w-auto">
                <CategoryFilter
                  categories={categories}
                  value={category}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginated.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}