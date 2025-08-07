import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Star, Truck, Shield, RefreshCw, CreditCard } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import heroImage from '../assets/hero.jpg'
import apiService from '../services/api'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroTransitioning, setHeroTransitioning] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [featuredData, categoriesData] = await Promise.all([
          apiService.getFeaturedProducts(),
          apiService.getCategories()
        ])
        
        // Ensure we have arrays
        setFeaturedProducts(Array.isArray(featuredData) ? featuredData : [])
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        // Set empty arrays as fallback
        setFeaturedProducts([])
        setCategories([])
      } finally {
        setLoading(false)        
      }
    }

    fetchData()    
  }, [])

  const nextSlide = () => {
    setHeroTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      setHeroTransitioning(false)
    }, 300)
  }

  const prevSlide = () => {
    setHeroTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      setHeroTransitioning(false)
    }, 300)
  }

  // Hero slides data
  const heroSlides = [
    {
      title: "Discover Amazing Products",
      subtitle: "Shop the latest trends and find your perfect style",
      cta: "Shop Now",
      image: heroImage
    },
    {
      title: "Exclusive Deals & Offers",
      subtitle: "Get up to 50% off on selected items",
      cta: "Explore Deals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
    },
    {
      title: "Premium Quality Guaranteed",
      subtitle: "Quality products with excellent customer service",
      cta: "Learn More",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
    }
  ]

  // Admin-featured products carousel data
  const adminCarousel = [
    {
      season: "SUMMER 2025",
      title: "Sustainable Men's Clothing",
      description:
        "We have a wide range of sustainable men's clothing for you to choose from. We are committed to providing you with the best quality products.",
      price: 16.48,
      image:
        "https://www.thegoodtrade.com/wp-content/uploads/2024/06/buck-mason-mens-clothing-header.webp",
    },
    {
      season: "WINTER 2025",
      title: "Modern Denim Jackets",
      description:
        "We have a wide range of modern denim jackets for you to choose from. We are committed to providing you with the best quality products.",
      price: 49.99,
      image:
        "https://thedenimcompany.pk/cdn/shop/files/DSC04809.jpg?crop=center&height=1512&v=1711974923&width=1080",
    },
    {
      season: "Summer 2025",
      title: "Summer footwear",
      description:
        "We have a wide range of summer footwear for you to choose from. We are committed to providing you with the best quality products.",
      price: 29.99,
      image:
        "https://arqs.pk/cdn/shop/articles/women_shoes_for_summer_1024x1024.jpg?v=1622296942",
    },
  ];
  const [adminCurrent, setAdminCurrent] = useState(0);
  const [adminTransitioning, setAdminTransitioning] = useState(false);
  const nextAdmin = () => {
    setAdminTransitioning(true);
    setTimeout(() => {
      setAdminCurrent((prev) => (prev + 1) % adminCarousel.length);
      setAdminTransitioning(false);
    }, 300);
  };
  const prevAdmin = () => {
    setAdminTransitioning(true);
    setTimeout(() => {
      setAdminCurrent((prev) => (prev - 1 + adminCarousel.length) % adminCarousel.length);
      setAdminTransitioning(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className={`w-full h-full object-cover transition-opacity duration-300 ${ 
              heroTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />          
        </div>
        
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className={`text-3xl md:text-5xl font-bold mb-4 transition-opacity duration-300 ${
              heroTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {heroSlides[currentSlide].title}
            </h1>
            <p className={`text-l md:text-2xl mb-8 max-w-2xl mx-auto transition-opacity duration-300 ${
              heroTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-[#2DC071] text-white hover:bg-[#40BB15]">
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 cursor-pointer top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Hero Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No featured products available</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} items</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No categories available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Admin Featured Carousel */}
      <section className="py-16 bg-[#23856D]">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${adminCurrent * 100}%)` }}
              >
                {adminCarousel.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-center lg:text-left sm:pl-22">
                        <p className="text-[12px] md:text-sm font-medium text-white mb-2">{item.season}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-white text-[12px] md:text-sm mb-6 max-w-md mx-auto lg:mx-0">{item.description}</p>
                        <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                          <span className="text-2xl font-bold text-white">${item.price}</span>
                          <Link to="/products">
                            <Button size="lg" className="ml-10 hover:bg-[#40BB15]">Shop Now</Button>
                          </Link>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full max-w-md rounded-lg shadow-lg object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={prevAdmin}
              className="absolute left-1   top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={nextAdmin}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ArrowRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Payment</h3>
              <p className="text-gray-600">Credit card, PayPal, and more</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 