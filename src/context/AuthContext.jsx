import { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check authentication status on app load
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await apiService.checkAuth()
      if (response.authenticated) {
        setUser(response.user)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setError(null)
      const response = await apiService.login(credentials)
      setUser(response.user)
      return { success: true }
    } catch (err) {
      setError(err.message || 'Login failed')
      return { success: false, error: err.message }
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await apiService.register(userData)
      setUser(response.user)
      return { success: true }
    } catch (err) {
      setError(err.message || 'Registration failed')
      return { success: false, error: err.message }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
      setUser(null)
      setError(null)
    } catch (err) {
      console.error('Logout failed:', err)
      // Still clear user state even if API call fails
      setUser(null)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setError(null)
      const response = await apiService.updateUserProfile(profileData)
      setUser(response)
      return { success: true }
    } catch (err) {
      setError(err.message || 'Profile update failed')
      return { success: false, error: err.message }
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register,
      updateProfile,
      clearError,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
