import { useState } from 'react'
import { Grid, List, Filter, X, SortAsc } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const Products = () => {
  // Mock categories data
  const categories = [
    {
      name: 'Cloths',
      image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=400&h=400&fit=crop',
      count: 5,
    },
    {
      name: 'Cloths',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400&h=400&fit=crop',
      count: 5,
    },
    {
      name: 'Cloths',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&h=400&fit=crop',
      count: 5,
    },
    {
      name: 'Cloths',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=400&h=400&fit=crop',
      count: 5,
    },
    {
      name: 'Cloths',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400&h=400&fit=crop',
      count: 5,
    },
  ];

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Yellow Shirt',
      price: 29.99,
      image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    },
    {
      id: 2,
      name: 'Blue Dress',
      price: 49.99,
      image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    },
    {
      id: 3,
      name: 'White Top',
      price: 19.99,
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    },
    {
      id: 4,
      name: 'Casual Jacket',
      price: 59.99,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    },
    {
      id: 5,
      name: 'Trendy Outfit',
      price: 39.99,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    },
    // Add more products as needed
  ];

  // Add more products for pagination (must be before filtering/sorting)
  while (products.length < 16) {
    products.push({
      id: products.length + 1,
      name: `Product ${products.length + 1}`,
      price: 19.99 + products.length,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400&h=400&fit=crop',
      category: 'Cloths',
    });
  }

  // All useState hooks at the top
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filtered and sorted products
  const filteredProducts = products.filter(
    (p) => !selectedCategory || p.category === selectedCategory
  );
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Pagination controls with transition
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Category Images */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              className={`relative group flex-shrink-0 w-40 h-48 overflow-hidden transition-all duration-200 ${selectedCategory === cat.name ? 'shadow-lg' : ''}`}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-lg drop-shadow">{cat.name.toUpperCase()}</span>
                <span className="text-white text-sm mt-1 drop-shadow">{cat.count} items</span>
              </div>
            </button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="text-gray-700 text-sm">
            Showing all {sortedProducts.length} results
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm hidden sm:inline">Views:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setShowFilter(true)}
            >
              <Filter className="inline h-4 w-4 mr-1" /> Filter
            </button>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowFilter(false)}>
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Filters
              </h3>
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setPriceRange([0, 100]);
                  setShowFilter(false);
                }}
                className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {sortedProducts.length > 0 ? (
          <>
            <div
              className={
                (viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                  : 'space-y-4') +
                ' transition-all duration-500 ' +
                (isTransitioning ? 'opacity-0' : 'opacity-100')
              }
            >
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded shadow border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    First
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => goToPage(idx + 1)}
                      className={`px-4 py-2 text-sm font-medium border-l border-gray-200 focus:z-10 ${
                        currentPage === idx + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium border-l border-gray-200 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-50'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-12">No products found.</div>
        )}
      </div>
    </div>
  )
}

export default Products 