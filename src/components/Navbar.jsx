import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, User, Heart ,SearchIcon} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { MdCall, MdMail } from 'react-icons/md';
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')  
  const { getCartCount } = useCart()  
  const searchButtonRef = useRef(null)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className='grid grid-cols-3 items-center p-3 hidden md:grid' style={{backgroundColor: '#252B42', color: 'white'}}>
            <div className="flex justify-between items-center pl-2">
                <div>
                    <MdCall className="inline-block mr-1" />
                    <span className="text-sm">+1 234 567 890</span>
                </div>
                <div>
                    <MdMail className="inline-block mr-1" />
                    <span className="text-sm" >khan@gmail.com</span>  
                </div>
            </div>
            <div>
                <p className='text-sm flex justify-end items-center'>Follow Us  and get a chance to win 80% off</p>
            </div>
            <div className='flex justify-end items-center space-x-2 pr-2'>
                <span className='text-sm font-bold'>Follow Us</span>
                <span>:</span>
                <FaInstagram className="inline-block mx-1 text-base cursor-pointer" />
                <FaYoutube className="inline-block mx-1 text-base cursor-pointer" />                 
                <FaFacebook className="inline-block mx-1 text-base cursor-pointer" />               
                <FaTwitter className="inline-block mx-1 text-base cursor-pointer" /> 
            </div>
        </div>
      <div className="max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#252B42]">ShopHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="hover:!text-[#23A6F0] px-3 py-2 rounded-md text-sm font-semibold transition-colors"
                  style={{color: '#737373'}}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className='transition-all duration-300 ease-in-out hidden lg:block flex-1 max-w-lg mx-8'>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:text-[#23A6F0] focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>       

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">      
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="block lg:hidden text-[#23A6F0] p-2"
          >
            <SearchIcon className="h-6 w-6 cursor-pointer" />
          </button>
            <div className='flex justify-center items-center space-x-2 text-[#23A6F0]'>
              <a href="/login" className='flex items-center space-x-2'>
              <User className="h-6 w-6 hidden lg:block" />
              <span className='text-sm font-semibold'>Login / Signup</span>
              </a>          
            </div>
            <Link to="/wishlist" className="text-gray-700 text-[#23A6F0]">
              <Heart className="h-6 w-6 text-[#23A6F0]" />
            </Link>            
            <Link to="/cart" className="text-gray-700 text-[#23A6F0] relative">
              <ShoppingCart className="h-6 w-6 text-[#23A6F0]" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex justify-center items-center space-x-4">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="block lg:hidden text-black hover:text-[#23A6F0]"
            >
              <SearchIcon className="h-5 w-5 cursor-pointer" />
            </button>
            <Link to="/cart" className="text-black relative hover:text-[#23A6F0]">
                <ShoppingCart className="h-5 w-5 text-black hover:text-[#23A6F0]" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#23A6F0]"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`fixed top-0 left-0 w-full h-[80px] md:h-[110px] flex justify-center items-center z-50 p-2 bg-[#676D75] opacity-100 transition-transform duration-300 rounded-md ${!isMobileSearchOpen ? 'translate-y-[-80px] sm:translate-y-[-80px] md:translate-y-[-110px]' : 'translate-y-[0px]'}`}>          
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white" />
            <span onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className='absolute right-3 top-2.5 h-5 w-5 text-white cursor-pointer'>X</span>
          </div>
        </div>
      
        {/* Mobile Navigation */}        
          <div className={`absolute left-0 w-full md:hidden z-45 transition-all duration-500 ease-in-out overflow-hidden border-b-1 border-gray-300 shadow-black shadow-md ${isMenuOpen ? 'max-h-[400px]' : 'max-h-[0px]'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-[#23A6F0] block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-around space-x-4 pt-4 border-t">
                <Link to="/wishlist" className="text-gray-700 hover:text-[#23A6F0]">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-[#23A6F0]">
                  <User className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-[#23A6F0] relative">
                  <ShoppingCart className="h-6 w-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>        
      </div>
    </nav>
  )
}

export default Navbar 