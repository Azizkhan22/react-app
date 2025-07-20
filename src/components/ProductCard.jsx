import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group h-full flex flex-col border border-gray-100">
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-base font-medium text-gray-900 mb-1 hover:text-[#23A6F0] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">Fashion Department</p>
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
            <span className="text-lg font-semibold text-gray-900">${product.price}</span>
          </div>
          
        </div>

        {/* Color Swatches */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full border border-gray-200"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full border border-gray-200"></div>
            <div className="w-4 h-4 bg-orange-500 rounded-full border border-gray-200"></div>
            <div className="w-4 h-4 bg-black rounded-full border border-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 