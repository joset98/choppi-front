# 🛒 Choppi - E-commerce Platform Frontend

A modern, responsive e-commerce frontend built with **Next.js 16** that enables users to discover stores, browse products, manage shopping carts, and provides admin capabilities for store and product management.

## ✨ Features

### 🏪 Store Discovery
- Browse stores with advanced search and filtering
- View store details and available products
- Real-time inventory status for each store

### 📦 Product Catalog
- Paginated product listings with search functionality
- Category-based filtering
- Detailed product information with store availability
- Price comparison across different stores

### 🛒 Shopping Cart
- Add products from different stores to cart
- Real-time quote calculations
- Cart persistence in browser storage
- Itemized pricing and subtotals

### 🔐 Admin Panel
- **Full CRUD operations** for stores and products
- JWT-based authentication required
- Real-time inventory management
- Store-product relationship management

### 📱 Responsive Design
- Mobile-first approach with touch-friendly interactions
- Tablet and desktop optimizations
- Accessible navigation and components

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API (Cart & Auth providers)
- **API Integration**: RESTful API calls with automatic JWT token handling
- **Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Forms**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui for consistent, accessible design

## 📋 Prerequisites

- **Node.js 18+** and npm/pnpm
- **Backend API running** (see [choppi-api README](../choppi-api/README.md))
- Database with sample data seeded

## 🚀 Quick Start

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd choppi-app/choppi

# Install dependencies
npm install
# or
pnpm install
```

### 2. Environment Setup
Create `.env.local` (optional - defaults to localhost:4000):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4. Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Access**: Login with `admin@choppi.com` / `admin123`
- **User Access**: Login with `user@choppi.com` / `user123`

## 📁 Project Architecture

```
choppi/
├── app/                    # Next.js App Router (pages & API routes)
│   ├── admin/             # 🔐 Admin panel (authenticated)
│   │   ├── stores/        # Store management (CRUD)
│   │   └── products/      # Product management (CRUD)
│   ├── api/               # 🔄 API routes (proxy to backend)
│   ├── login/             # 🔑 Authentication page
│   ├── stores/            # 🏪 Store discovery & details
│   ├── products/          # 📦 Product catalog & details
│   └── layout.tsx         # 🎨 Root layout with providers
├── components/            # 🧩 Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # shadcn/ui design system
│   ├── auth-provider.tsx # 🔐 Authentication context
│   ├── cart-provider.tsx # 🛒 Shopping cart context
│   └── *-provider.tsx    # State management providers
├── hooks/                 # 🪝 Custom React hooks
├── lib/                   # 🛠️ Utilities & configurations
│   ├── auth.ts           # JWT token management
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
├── public/                # 📸 Static assets & images
└── styles/                # 🎨 Global styles & Tailwind config
```

## 🔐 Authentication & Authorization

### User Management
- **JWT-based authentication** with secure HTTP-only cookies
- **Two user roles**: Admin and Regular users
- **Automatic token refresh** and session management

### Test Credentials
```bash
# Admin User (full access)
Email: admin@choppi.com
Password: admin123

# Regular User (read-only)
Email: user@choppi.com
Password: user123
```

### Session Management
- **Secure cookies** with httpOnly flag
- **Automatic logout** on invalid/expired tokens
- **Real-time UI updates** after authentication state changes
- **Route protection** for admin pages

## 🛒 Advanced Cart System

### Features
- **Multi-store shopping**: Add products from different stores
- **Real-time pricing**: Automatic quote calculations
- **Persistent cart**: Browser storage with localStorage
- **Item management**: Add/remove/update quantities

### Cart API Integration
```typescript
// Example cart quote request
POST /api/cart/quote
[
  {
    "storeProductId": "uuid",
    "quantity": 2
  }
]
```

## 🗺️ Application Routes

### 🌐 Public Routes
| Route | Description | Features |
|-------|-------------|----------|
| `/` | **Homepage** | Welcome page with navigation |
| `/stores` | **Store Discovery** | Search, filter, pagination |
| `/stores/[id]` | **Store Details** | Products, inventory, pricing |
| `/products/[id]` | **Product Details** | Store availability, price comparison |
| `/login` | **Authentication** | JWT login with validation |

### 🔐 Protected Routes (Admin Only)
| Route | Description | Operations |
|-------|-------------|------------|
| `/admin` | **Dashboard** | Overview statistics |
| `/admin/stores` | **Store Management** | Create, read, update, delete |
| `/admin/products` | **Product Management** | Full CRUD operations |

## 🔄 API Integration Architecture

### Proxy Pattern
- **Next.js API routes** act as proxies to backend
- **Automatic JWT injection** for authenticated requests
- **Error handling** with user-friendly messages
- **Type-safe responses** with TypeScript interfaces

### Key Endpoints Integration

#### Store Management
```typescript
GET  /api/stores           # Paginated store list
GET  /api/stores/[id]      # Store details + products
POST /api/admin/stores     # Create store (JWT required)
PUT  /api/admin/stores/[id] # Update store (JWT required)
```

#### Product Management
```typescript
GET  /api/products           # Product catalog
GET  /api/products/[id]      # Product with store availability
POST /api/admin/products     # Create product (JWT required)
PUT  /api/admin/products/[id] # Update product (JWT required)
```

#### Cart & Checkout
```typescript
POST /api/cart/quote         # Calculate cart total
```

### Authentication Flow
```typescript
POST /api/auth/login         # Authenticate user
POST /api/auth/logout        # Clear session
```

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible components:

- Buttons, forms, tables, dialogs
- Pagination, search, filters
- Loading states and empty states
- Toast notifications

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Accessible navigation

## 🔧 Development

### Development Commands

```bash
# Development & Production
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues automatically

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

### Environment Configuration

```env
# Optional: Custom API endpoint (defaults to localhost:4000)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Production settings
NODE_ENV=production
```

### Build Optimization

- **Next.js 16** with Turbopack for faster development
- **Automatic code splitting** and optimization
- **Image optimization** with Next.js Image component
- **CSS optimization** with Tailwind purging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Choppi e-commerce platform.