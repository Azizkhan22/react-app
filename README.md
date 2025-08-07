# E-commerce React + Django Full-Stack Application

A modern e-commerce application built with React frontend and Django REST API backend.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with filtering, sorting, and search
- **Product Details**: Detailed product pages with images, reviews, and related products
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login, register, and profile management
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Backend (Django)
- **RESTful API**: Complete REST API with Django REST Framework
- **Product Management**: CRUD operations for products, categories, and reviews
- **User Management**: Authentication and user profiles
- **Shopping Cart**: Server-side cart management
- **Order Management**: Order creation and tracking
- **Database**: PostgreSQL-ready with SQLite for development

## 📁 Project Structure

```
react-app/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── services/          # API service layer
│   ├── hooks/             # Custom React hooks
│   └── assets/            # Static assets
├── ecommerce_backend/      # Django backend
│   ├── api/               # Django app with models, views, serializers
│   ├── ecommerce_backend/ # Django project settings
│   └── requirements.txt   # Python dependencies
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - REST API framework
- **Django CORS Headers** - Cross-origin resource sharing
- **SQLite** - Database (can be easily switched to PostgreSQL)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Python 3.8 or higher
- npm or yarn

### Backend Setup

1. **Navigate to Django backend directory:**
   ```bash
   cd ecommerce_backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv django_env
   django_env\Scripts\activate  # Windows
   source django_env/bin/activate  # Linux/Mac
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Populate database with sample data:**
   ```bash
   python manage.py populate_data
   ```

6. **Start Django development server:**
   ```bash
   python manage.py runserver
   ```

The Django API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. **Navigate to React app directory:**
   ```bash
   cd react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The React app will be available at `http://localhost:5173`

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with promotional content
- Featured products showcase
- Category browsing
- Newsletter subscription

### Products Page (`/products`)
- Product grid with filtering options
- Category and price filters
- Sorting functionality
- Grid/list view toggle
- Search functionality

### Product Detail (`/product/:id`)
- Product images with gallery
- Detailed product information
- Add to cart functionality
- Customer reviews
- Related products

### Shopping Cart (`/cart`)
- Cart item management
- Quantity adjustments
- Order summary
- Promo code application

### User Authentication
- **Login** (`/login`): User sign-in
- **Register** (`/register`): New user registration
- **Profile** (`/profile`): User profile management

## 🔌 API Endpoints

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

## 🗄️ Database Models

- **Category**: Product categories with name, image, and count
- **Product**: Products with details, pricing, images, and features
- **Review**: Product reviews with ratings and comments
- **Cart**: Shopping cart items for users
- **Wishlist**: User wishlist items
- **Order**: User orders with status tracking
- **OrderItem**: Individual items in orders

## 🎨 Design System

The app uses a consistent design system with:

- **Colors**: Indigo primary color scheme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing using Tailwind's scale
- **Components**: Reusable UI components
- **Icons**: Lucide React icon set

## 🔧 Customization

### Adding New Products
Use the Django admin interface or add products through the API endpoints.

### Styling Changes
Modify Tailwind classes in the React components or update the Tailwind configuration.

### API Modifications
Add new endpoints in the Django views and update the React API service accordingly.

## 🚀 Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Run migrations
4. Deploy to your preferred hosting service (Heroku, DigitalOcean, AWS, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## 📝 Sample Data

The application comes with sample data including:
- 4 categories (Men's Clothing, Women's Fashion, Electronics, Home & Garden)
- 7 sample products with images, descriptions, and features
- 1 test user (username: testuser, password: testpass123)
- Sample reviews for products

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.
