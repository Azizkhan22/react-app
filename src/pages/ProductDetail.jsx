import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Heart, Truck, Shield, RefreshCw, Minus, Plus, Share2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data
  const product = {
    id: parseInt(id),
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4,
    reviews: 128,
    description: "Experience crystal-clear sound with these premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for long listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design",
      "Compatible with all devices"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"
    ],
    colors: ["Black", "White", "Blue"],
    sizes: ["One Size"],
    inStock: true,
    sku: "WH-001",
    category: "Electronics"
  }

  const relatedProducts = [
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

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent sound quality and very comfortable for long hours. Battery life is impressive!"
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great headphones, but the price could be a bit lower. Overall satisfied with the purchase."
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2024-01-05",
      comment: "Perfect for my daily commute. Noise cancellation works really well."
    }
  ]

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and breadcrumb */}
        <div className="flex items-center justify-between mb-6">          
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="list-reset flex">
              <li>
                <a href="/" className="hover:underline text-blue-600">Home</a>
              </li>
              <li>
                <span className="mx-2">&gt;</span>
              </li>
              <li>
                <a href="/products" className="hover:underline text-blue-600">Products</a>
              </li>
              <li>
                <span className="mx-2">&gt;</span>
              </li>
              <li className="text-gray-700 font-medium">{product.name}</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-indigo-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-red-600 text-sm">This item is currently out of stock</p>
              )}
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Easy returns and exchanges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 