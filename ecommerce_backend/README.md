# E-commerce Django Backend

This is the Django REST API backend for the React e-commerce application.

## Features

- **Products Management**: CRUD operations for products with categories, images, and reviews
- **User Authentication**: User registration, login, and profile management
- **Shopping Cart**: Add, remove, and update cart items
- **Wishlist**: Add and remove products from wishlist
- **Orders**: Create and manage orders
- **Reviews**: Product reviews and ratings
- **Categories**: Product categorization

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/related/?product_id={id}` - Get related products
- `POST /api/products/{id}/add_review/` - Add product review

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details
- `GET /api/categories/{id}/products/` - Get products in category

### Cart (Authenticated)
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}/` - Update cart item
- `DELETE /api/cart/{id}/` - Remove item from cart
- `GET /api/cart/total/` - Get cart total and count

### Wishlist (Authenticated)
- `GET /api/wishlist/` - Get user's wishlist
- `POST /api/wishlist/` - Add item to wishlist
- `DELETE /api/wishlist/{id}/` - Remove item from wishlist
- `POST /api/wishlist/toggle/` - Toggle wishlist item

### Orders (Authenticated)
- `GET /api/orders/` - Get user's orders
- `POST /api/orders/` - Create new order
- `POST /api/orders/create_from_cart/` - Create order from cart

### User Profile (Authenticated)
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update user profile

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   python -m venv django_env
   django_env\Scripts\activate  # Windows
   source django_env/bin/activate  # Linux/Mac
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Populate Sample Data**
   ```bash
   python manage.py populate_data
   ```

5. **Create Superuser (Optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

## Sample Data

The `populate_data` command creates:
- 4 categories (Men's Clothing, Women's Fashion, Electronics, Home & Garden)
- 7 sample products with images, descriptions, and features
- 1 test user (username: testuser, password: testpass123)
- Sample reviews for products

## Database Models

- **Category**: Product categories with name, image, and count
- **Product**: Products with details, pricing, images, and features
- **Review**: Product reviews with ratings and comments
- **Cart**: Shopping cart items for users
- **Wishlist**: User wishlist items
- **Order**: User orders with status tracking
- **OrderItem**: Individual items in orders

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

## Authentication

The API uses Django's built-in authentication system. Protected endpoints require user authentication via session or token authentication. 