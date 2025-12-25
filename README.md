# 🛍️ Product Management Dashboard

A modern, responsive e-commerce product management dashboard built with Next.js 14, featuring real-time search, filtering, pagination, and seamless API integration.

## ✨ Features

### Core Functionality
- **Product Listing**: Display products in a responsive grid layout with images, titles, prices, and categories
- **Product Details**: Comprehensive product detail page with image gallery, specifications, and stock information
- **Real-time Search**: Debounced search functionality for smooth user experience (500ms delay)
- **Category Filtering**: Filter products by category with dynamic category list
- **Pagination**: Client-side pagination with 8 products per page
- **URL Query Parameters**: Shareable links with search, filter, and page state preserved in URL

### User Experience
- **Loading States**: 
  - Skeleton loading on product details page
  - Spinner loader on homepage during data fetch
- **Error Handling**: User-friendly error messages for failed API requests
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Smooth Navigation**: Browser back/forward buttons work with filters
- **State Persistence**: Filters persist on page refresh

### UI/UX Features
- Hero section with call-to-action
- Product image gallery with thumbnail selection
- Star rating display
- Stock availability indicators
- Price with discount calculation
- Favorite/wishlist toggle
- Quantity selector

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: DummyJSON REST API

## 🔌 API Handling

### API Configuration

The application uses Axios for HTTP requests with a centralized configuration:

```javascript
// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
```

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/products` | GET | Fetch all products |
| `/products/:id` | GET | Fetch single product details |

### Error Handling Strategy

- **Try-Catch Blocks**: All API calls wrapped in try-catch for error handling
- **User Feedback**: Display error messages when API requests fail
- **Graceful Degradation**: Show appropriate UI when no data is available

### Loading States

1. **Initial Load**: Display full-page loader while fetching products
2. **Product Details**: Show skeleton loading for better perceived performance
3. **No Loading on Filter/Search**: Client-side filtering provides instant results

## 🚀 How to Run

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://dummyjson.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.js                 # Home page with product listing
│   ├── product/
│   │   └── [id]/
│   │       └── page.js         # Product details page
│   └── layout.js               # Root layout
├── components/
│   ├── ProductCard.js          # Product card component
│   ├── SearchBar.js            # Search input with debouncing
│   ├── CategoryFilter.js       # Category dropdown filter
│   ├── Pagination.js           # Pagination controls
│   ├── Loader.js               # Loading spinner
│   ├── ErrorMessage.js         # Error display component
│   └── ProductDetailsSkeleton.js # Skeleton loader
├── lib/
│   └── api.js                  # Axios API configuration
├── hooks/
│   └── useDebounce.js          # Custom debounce hook
└── .env.local                  # Environment variables
```

## 🎯 Key Implementation Details

### 1. Debounced Search

Implements a custom `useDebounce` hook to delay search execution by 500ms, reducing unnecessary re-renders and improving performance:

```javascript
const debouncedSearch = useDebounce(search, 500);
```

### 2. URL Query Parameters

Search, category, and page state are synced with URL query parameters:
- `/?search=phone` - Search for "phone"
- `/?category=smartphones` - Filter by smartphones
- `/?search=phone&category=smartphones&page=2` - Combined filters with pagination

Benefits:
- Shareable links with filters
- Browser back/forward navigation
- State persistence on refresh

### 3. Client-Side Filtering

All filtering and pagination happen client-side after initial data fetch:
- Fast, instant filtering without API calls
- Better user experience
- Reduced server load

### 4. Responsive Design

- Mobile-first approach with Tailwind CSS
- Grid layout adapts: 1 column (mobile) → 2 (tablet) → 4 (desktop)
- Touch-friendly buttons and inputs

## 🌟 Bonus Features Implemented

- ✅ Debounced search
- ✅ URL query parameters
- ✅ Responsive UI
- ✅ Skeleton loading
- ✅ Environment variables
- ✅ Image gallery with thumbnails
- ✅ Star ratings
- ✅ Stock indicators
- ✅ Discount pricing

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | `https://dummyjson.com` |

## 🐛 Troubleshooting

### Products not loading
- Check if `.env.local` file exists with correct API URL
- Verify internet connection
- Check browser console for errors

### Search not working
- Ensure `useDebounce` hook is properly implemented
- Check console for JavaScript errors

### Build errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

This is a practice project. Feel free to fork and modify as needed.

---

**Built with ❤️ using Next.js and DummyJSON API**
