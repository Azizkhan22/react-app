const API_BASE_URL = 'http://localhost:8000/api';


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method with credentials
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const csrfToken = getCookie('csrftoken');
    const config = {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // Helps with CSRF
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Helper method to handle paginated responses
  extractResults(data) {
    // If the response has a 'results' property (paginated), return that
    // Otherwise, return the data as is (for single items or non-paginated lists)
    return data && data.results ? data.results : data;
  }
  
  // Authentication methods
  async login(credentials) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout/', {
      method: 'POST',
    });
  }

  async register(userData) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async checkAuth() {
    return this.request('/auth/check/');
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const data = await this.request(`/products/${queryString ? `?${queryString}` : ''}`);
    return this.extractResults(data);
  }

  async getProduct(id) {
    return this.request(`/products/${id}/`);
  }

  async getFeaturedProducts() {
    const data = await this.request('/products/featured/');
    return this.extractResults(data);
  }

  async getRelatedProducts(productId) {
    const data = await this.request(`/products/related/?product_id=${productId}`);
    return this.extractResults(data);
  }

  async addProductReview(productId, reviewData) {
    return this.request(`/products/${productId}/add_review/`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Categories
  async getCategories() {
    const data = await this.request('/categories/');
    return this.extractResults(data);
  }

  async getCategory(id) {
    return this.request(`/categories/${id}/`);
  }

  async getCategoryProducts(categoryId) {
    const data = await this.request(`/categories/${categoryId}/products/`);
    return this.extractResults(data);
  }

  // Cart
  async getCart() {
    const data = await this.request('/cart/');
    return this.extractResults(data);
  }

  async addToCart(productId, quantity = 1) {
    return this.request('/cart/', {
      method: 'POST',
      body: JSON.stringify({
        product: productId,
        quantity: quantity,
      }),
    });
  }

  async updateCartItem(cartItemId, quantity) {
    return this.request(`/cart/${cartItemId}/update_quantity/`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(cartItemId) {
    return this.request(`/cart/${cartItemId}/`, {
      method: 'DELETE',
    });
  }

  async getCartTotal() {
    return this.request('/cart/total/');
  }

  // Wishlist
  async getWishlist() {
    const data = await this.request('/wishlist/');
    return this.extractResults(data);
  }

  async addToWishlist(productId) {
    return this.request('/wishlist/', {
      method: 'POST',
      body: JSON.stringify({ product: productId }),
    });
  }

  async removeFromWishlist(wishlistItemId) {
    return this.request(`/wishlist/${wishlistItemId}/`, {
      method: 'DELETE',
    });
  }

  async toggleWishlist(productId) {
    return this.request('/wishlist/toggle/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    });
  }

  // Orders
  async getOrders() {
    const data = await this.request('/orders/');
    return this.extractResults(data);
  }

  async createOrder(orderData) {
    return this.request('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async createOrderFromCart(orderData) {
    return this.request('/orders/create_from_cart/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // User Profile
  async getUserProfile() {
    return this.request('/profile/');
  }

  async updateUserProfile(profileData) {
    return this.request('/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService; 