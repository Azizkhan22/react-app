import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Star, Truck, Shield, RefreshCw, CreditCard } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import heroImage from '../assets/hero.jpg'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroTransitioning, setHeroTransitioning] = useState(false)

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

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 128,
      discount: 25
    },
    {
      id: 2,
      name: "Designer Denim Jeans",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
      rating: 5,
      reviews: 89
    },
    {
      id: 3,
      name: "Casual Summer Dress",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 67,
      discount: 25
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
      rating: 4,
      reviews: 156
    }
  ]

  const categories = [
    { name: "Men's Clothing", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=200&fit=crop", count: 150 },
    { name: "Women's Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop", count: 200 },
    { name: "Kids & Baby", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop", count: 120 },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", count: 80 }
  ]

  // Admin-featured products carousel data
  const adminCarousel = [
    {
      season: "SUMMER 2020",
      title: "Vita Classic Product",
      description:
        "We know how large objects will act. We know how are objects will act. We know how are objects will act. We know",
      price: 16.48,
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=600&h=800&fit=crop",
    },
    {
      season: "WINTER 2020",
      title: "Modern Winter Jacket",
      description:
        "Stay warm and stylish with our premium winter collection. Limited stock available!",
      price: 49.99,
      image:
        "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=600&h=800&fit=crop",
    },
    {
      season: "SPRING 2021",
      title: "Fresh Spring Look",
      description:
        "Refresh your wardrobe with our new spring arrivals. Bright colors and comfy fits!",
      price: 29.99,
      image:
        "https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg?auto=compress&w=600&h=800&fit=crop",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative p-5 h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className="relative h-full mx-auto">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className={`w-full h-full object-cover object-center max-h-96 transition-all duration-500 ease-in-out ${heroTransitioning ? 'opacity-0' : 'opacity-100'}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-center text-white px-4 sm:px-6 md:px-8 transition-all duration-500 ease-in-out ${heroTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}> 
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button size="md" className="text-sm sm:text-base !bg-[#2DC071] px-3 sm:px-6 py-2 sm:py-3">
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full transition-all duration-300 z-10"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1 sm:p-2 rounded-full transition-all duration-300 z-10"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-white' : 'bg-white/50'
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
              <div className="bg-[#23A6F0]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="h-6 w-6 text-[#23A6F0]" />
              </div>
              <h3 className="text-base font-semibold mb-1">Free Shipping</h3>
              <p className="text-xs text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-[#23A6F0]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-[#23A6F0]" />
              </div>
              <h3 className="text-base font-semibold mb-1">Secure Payment</h3>
              <p className="text-xs text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-[#23A6F0]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw className="h-6 w-6 text-[#23A6F0]" />
              </div>
              <h3 className="text-base font-semibold mb-1">Easy Returns</h3>
              <p className="text-xs text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-[#23A6F0]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="h-6 w-6 text-[#23A6F0]" />
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
              Explore our wide range of fashion and clothing categories
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
                    className="w-full h-28 md:h-32 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-base font-bold mb-1 drop-shadow-lg">{category.name}</h3>
                      <p className="text-xs opacity-90 drop-shadow-md">{category.count} Products</p>
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Featured Fashion</h2>
              <p className="text-sm text-gray-600">Handpicked clothing and accessories for you</p>
            </div>
            <Link
              to="/products"
              className="text-[#23A6F0] hover:text-[#1e8fd8] font-medium flex items-center text-sm"
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

      {/* Admin Carousel Section */}
      <section className="w-full bg-[#219653] relative flex flex-col md:flex-row items-center justify-around min-h-[350px] md:min-h-[400px] lg:min-h-[440px] overflow-hidden mb-8 px-4 py-6 md:px-0">
        {/* Left: Info */}
        <div className={`flex flex-col justify-center items-center md:items-end md:pr-8 lg:pr-16 z-10 max-w-xl md:max-w-lg lg:max-w-xl text-center md:text-right transition-all duration-500 ease-in-out ${adminTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}> 
          <span className="text-white text-xs md:text-sm mb-2 tracking-widest uppercase opacity-80">
            {adminCarousel[adminCurrent].season}
          </span>
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            {adminCarousel[adminCurrent].title}
          </h2>
          <p className="text-white text-sm md:text-base mb-4 max-w-md opacity-90">
            {adminCarousel[adminCurrent].description}
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end gap-2 md:gap-4 mb-4">
            <span className="text-white text-lg md:text-xl font-bold">
              ${adminCarousel[adminCurrent].price.toFixed(2)}
            </span>
            <Button size="md" className="!bg-[#2DC071] px-4 py-2 text-white font-semibold mt-2 md:mt-0">
              ADD TO CART
            </Button>
          </div>
        </div>
        {/* Right: Image */}
        <div className={`flex items-center justify-center md:justify-start h-full relative z-10 mt-6 md:mt-0 transition-all duration-500 ease-in-out ${adminTransitioning ? 'opacity-0' : 'opacity-100'}`}> 
          <img
            src={adminCarousel[adminCurrent].image}
            alt={adminCarousel[adminCurrent].title}
            className="object-contain h-[220px] xs:h-[260px] sm:h-[300px] md:h-[340px] lg:h-[400px] w-auto drop-shadow-xl select-none pointer-events-none"
            draggable="false"
          />
        </div>
        {/* Arrows */}
        <button
          onClick={prevAdmin}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextAdmin}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {adminCarousel.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setAdminCurrent(idx)}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${
                idx === adminCurrent ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        {/* BG overlay for image fade */}
        <div className="absolute inset-0 bg-[#219653] opacity-90 pointer-events-none" />
      </section>

      {/* Newsletter Section */}
      <section className="py-8 bg-[#FAFAFA]">
        <div className="max-w-screen-md mx-auto px-2 md:px-4 text-center bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-2">
            Stay Updated
          </h2>
          <p className="text-black/90 mb-4 text-base">
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