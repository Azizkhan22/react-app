# ShopHub - Full-Stack E-Commerce Application

A modern e-commerce platform built with React frontend and Django backend, featuring complete session management, user authentication, and persistent shopping cart functionality.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI/UX** with Tailwind CSS
- **Responsive Design** for all devices
- **User Authentication** with session management
- **Persistent Shopping Cart** (guest & authenticated users)
- **Product Catalog** with filtering and search
- **User Profile Management**
- **Order Management**
- **Wishlist Functionality**

### Backend (Django + DRF)
- **RESTful API** with Django REST Framework
- **Session-based Authentication**
- **Database Models** for products, users, orders, cart
- **Admin Interface** for content management
- **CORS Support** for cross-origin requests
- **Pagination** for large datasets

### Session Management
- **User Authentication** with login/register/logout
- **Session Persistence** across browser sessions
- **Cart Synchronization** between guest and authenticated users
- **Profile Management** with editable user information
- **Secure Password Handling**

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management

### Backend
- **Django 5.2.5** - Web framework
- **Django REST Framework 3.16.0** - API framework
- **Django CORS Headers 4.7.0** - CORS support
- **SQLite** - Database (can be changed to PostgreSQL/MySQL)

## 📁 Project Structure

```
react-app/
├── ecommerce_backend/          # Django backend
│   ├── ecommerce_backend/      # Django project settings
│   ├── api/                    # Django app
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   ├── urls.py            # API URLs
│   │   └── admin.py           # Admin interface
│   ├── manage.py
│   └── requirements.txt
├── src/                        # React frontend
│   ├── components/            # Reusable components
│   ├── context/               # React Context providers
│   │   ├── AuthContext.jsx    # Authentication state
│   │   └── CartContext.jsx    # Cart state management
│   ├── pages/                 # Page components
│   ├── services/              # API service layer
│   └── hooks/                 # Custom React hooks
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd ecommerce_backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv django_env
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   django_env\Scripts\activate
   
   # macOS/Linux
   source django_env/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Populate database with sample data:**
   ```bash
   python manage.py populate_data
   ```

8. **Start Django server:**
   ```bash
   python manage.py runserver
   ```

   The Django backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

   The React frontend will be available at `http://localhost:5173`

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Product catalog with filtering
- **Product Detail** (`/product/:id`) - Individual product view
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages
- **Profile** (`/profile`) - User profile management
- **Cart** (`/cart`) - Shopping cart (works for guests too)
- **Checkout** (`/checkout`) - Order completion
- **Orders** (`/orders`) - Order history

## 🔐 Authentication System

### Features
- **Session-based authentication** using Django sessions
- **User registration** with email validation
- **Login/logout functionality**
- **Profile management** with editable fields
- **Password security** with Django's built-in hashing

### User Flow
1. **Guest users** can browse products and add items to cart
2. **Registration** creates a new user account
3. **Login** establishes a session and loads user's cart
4. **Profile management** allows updating personal information
5. **Logout** clears session and returns to guest state

## 🛒 Cart Management

### Features
- **Persistent cart** for authenticated users
- **Guest cart** stored in local state
- **Cart synchronization** when user logs in
- **Real-time updates** with backend API
- **Quantity management** and item removal

### Cart Flow
1. **Guest users** - Cart stored in React state
2. **Login** - Cart items transferred to backend
3. **Authenticated users** - Cart persisted in database
4. **Logout** - Cart cleared from backend, returns to guest state

## 🗄️ Database Models

### Core Models
- **User** - Extended Django User model
- **Category** - Product categories
- **Product** - Product information with images
- **Review** - Product reviews and ratings
- **Cart** - Shopping cart items
- **Wishlist** - User wishlist items
- **Order** - Customer orders
- **OrderItem** - Individual order items

### Relationships
- Products belong to Categories
- Reviews belong to Products and Users
- Cart items belong to Users and Products
- Orders belong to Users
- Order items belong to Orders and Products

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration
- `GET /api/auth/check/` - Check authentication status

### Products
- `GET /api/products/` - List products (with filtering)
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/related/` - Get related products
- `POST /api/products/{id}/add_review/` - Add product review

### Categories
- `GET /api/categories/` - List categories
- `GET /api/categories/{id}/` - Get category details
- `GET /api/categories/{id}/products/` - Get category products

### Cart
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}/` - Update cart item
- `DELETE /api/cart/{id}/` - Remove cart item
- `GET /api/cart/total/` - Get cart total

### Orders
- `GET /api/orders/` - Get user's orders
- `POST /api/orders/` - Create new order
- `POST /api/orders/create_from_cart/` - Create order from cart

### User Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update user profile

## 🔧 Configuration

### Django Settings
- **CORS_ALLOWED_ORIGINS** - Configured for React dev server
- **REST_FRAMEWORK** - DRF settings with pagination
- **SESSION_COOKIE_SECURE** - Set to False for development
- **CSRF_COOKIE_SECURE** - Set to False for development

### React Configuration
- **API_BASE_URL** - Points to Django backend
- **Credentials** - Include cookies for session management
- **Error Handling** - Comprehensive error handling in API calls

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up static file serving
4. Configure CORS for production domain
5. Set secure session and CSRF settings

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Serve static files from a web server
3. Update API_BASE_URL to production backend
4. Configure environment variables

## 🧪 Testing

### Backend Testing
```bash
cd ecommerce_backend
python manage.py test
```

### Frontend Testing
```bash
npm test
```

## 📝 Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Note:** This is a development setup. For production deployment, additional security measures and configurations are required.
