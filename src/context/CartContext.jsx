import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'
import apiService from '../services/api'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload || []
      }
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  })
  const { isAuthenticated, user } = useAuth()

  // Load cart from API when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      loadCart()
    } else {
      // Clear cart when user logs out
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [isAuthenticated])

  const loadCart = async () => {
    try {
      const cartData = await apiService.getCart()
      dispatch({ type: 'SET_CART', payload: cartData })
    } catch (error) {
      console.error('Failed to load cart:', error)
    }
  }

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      // For guest users, just update local state
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { product, quantity, id: Date.now() } 
      })
      return
    }

    try {
      await apiService.addToCart(product.id, quantity)
      // Reload cart from API to get updated data
      await loadCart()
    } catch (error) {
      console.error('Failed to add to cart:', error)
      // Fallback to local state update
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { product, quantity, id: Date.now() } 
      })
    }
  }

  const removeFromCart = async (cartItemId) => {
    if (!isAuthenticated) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: cartItemId })
      return
    }

    try {
      await apiService.removeFromCart(cartItemId)
      await loadCart()
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      dispatch({ type: 'REMOVE_FROM_CART', payload: cartItemId })
    }
  }

  const updateQuantity = async (cartItemId, quantity) => {
    if (!isAuthenticated) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: cartItemId, quantity } })
      return
    }

    try {
      await apiService.updateCartItem(cartItemId, quantity)
      await loadCart()
    } catch (error) {
      console.error('Failed to update cart quantity:', error)
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: cartItemId, quantity } })
    }
  }

  const clearCart = async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'CLEAR_CART' })
      return
    }

    try {
      // Remove all items one by one (or implement a bulk delete endpoint)
      for (const item of state.items) {
        await apiService.removeFromCart(item.id)
      }
      dispatch({ type: 'CLEAR_CART' })
    } catch (error) {
      console.error('Failed to clear cart:', error)
      dispatch({ type: 'CLEAR_CART' })
    }
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.product ? item.product.price : 0
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isAuthenticated
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 