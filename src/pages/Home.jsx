import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, RefreshCw, CreditCard } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 128,
      discount: 30
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      rating: 5,
      reviews: 89
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 67,
      discount: 25
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 156
    }
  ]

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop", count: 150 },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop", count: 200 },
    { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop", count: 120 },
    { name: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", count: 80 }
  ]

  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends in fashion and lifestyle",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Shop Now"
    },
    {
      title: "Tech Gadgets Sale",
      subtitle: "Up to 50% off on electronics and smart devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
      cta: "Explore Deals"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className="relative h-full max-w-screen-lg mx-auto">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover object-center max-h-96 rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-2 md:px-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-base md:text-lg mb-4 md:mb-6 max-w-xl mx-auto">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button size="md" className="text-base px-6 py-2">
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Hero Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white">
        <div className="max-w-screen-lg mx-auto px-2 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold mb-1">Free Shipping</h3>
              <p className="text-xs text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-base font-semibold mb-1">Secure Payment</h3>
              <p className="text-xs text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold mb-1">Easy Returns</h3>
              <p className="text-xs text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold mb-1">Flexible Payment</h3>
              <p className="text-xs text-gray-600">Multiple payment options available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-lg mx-auto px-2 md:px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-28 md:h-32 object-contain group-hover:scale-105 transition-transform duration-300 bg-gray-100 rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-colors rounded"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-base font-semibold mb-1">{category.name}</h3>
                      <p className="text-xs opacity-90">{category.count} Products</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 bg-white">
        <div className="max-w-screen-lg mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Featured Products</h2>
              <p className="text-sm text-gray-600">Handpicked products for you</p>
            </div>
            <Link
              to="/products"
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center text-sm"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 bg-indigo-600">
        <div className="max-w-screen-md mx-auto px-2 md:px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Stay Updated
          </h2>
          <p className="text-indigo-100 mb-4 text-base">
            Subscribe to our newsletter for the latest products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <Button variant="secondary" size="md" className="px-4 py-2">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 