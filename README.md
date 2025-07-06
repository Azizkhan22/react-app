# ShopHub - E-commerce React App

A modern, responsive e-commerce application built with React, Vite, and Tailwind CSS. This project follows the design patterns from the Figma E-commerce UI Kit and provides a complete shopping experience.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Product Catalog**: Browse products with filtering and sorting
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login and registration system
- **Checkout Process**: Multi-step checkout with shipping and payment
- **User Profile**: Manage account settings, orders, and preferences
- **Responsive Design**: Optimized for mobile and desktop
- **Search Functionality**: Find products quickly
- **Wishlist**: Save favorite items for later

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Custom button component
│   ├── Footer.jsx      # Site footer
│   ├── Navbar.jsx      # Navigation header
│   └── ProductCard.jsx # Product display card
├── context/            # React Context providers
│   └── CartContext.jsx # Shopping cart state management
├── pages/              # Page components
│   ├── Cart.jsx        # Shopping cart page
│   ├── Checkout.jsx    # Checkout process
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # User login
│   ├── ProductDetail.jsx # Individual product page
│   ├── Products.jsx    # Product catalog
│   ├── Profile.jsx     # User profile
│   └── Register.jsx    # User registration
├── assets/             # Static assets
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── index.css           # Global styles with Tailwind
└── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

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

### Checkout (`/checkout`)
- Multi-step checkout process
- Shipping information
- Payment details
- Order review

### User Authentication
- **Login** (`/login`): User sign-in with social options
- **Register** (`/register`): New user registration

### User Profile (`/profile`)
- Personal information management
- Order history
- Wishlist
- Address management
- Payment methods
- Notification preferences
- Account settings

## 🎨 Design System

The app uses a consistent design system with:

- **Colors**: Indigo primary color scheme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing using Tailwind's scale
- **Components**: Reusable UI components
- **Icons**: Lucide React icon set

## 🔧 Customization

### Adding New Products

Update the mock data in the respective components or integrate with a backend API.

### Styling Changes

Modify Tailwind classes or extend the configuration in `tailwind.config.js`.

### Adding New Pages

1. Create a new component in the `pages/` directory
2. Add the route in `App.jsx`
3. Update navigation if needed

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🧪 Testing

```bash
npm run test
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Note**: This is a frontend-only implementation. For a production application, you would need to integrate with a backend API for data persistence, user authentication, and payment processing.
