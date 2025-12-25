'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate rating from price (just for visual purposes, adjust based on your data)
  const rating = product.rating || Math.min(5, Math.floor(product.price / 10) || 4);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 ${
              star <= rating 
                ? 'fill-orange-500' 
                : star - rating < 1 && star - rating > 0
                ? 'fill-orange-500' 
                : 'fill-gray-300'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link href={`/Product/${product.id}`}>
        <div className="relative bg-gray-50 p-6 cursor-pointer group">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/Product/${product.id}`}>
          <h3 className="text-gray-900 font-medium mb-1 hover:text-orange-500 transition-colors line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 mb-3 capitalize">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          {renderStars(rating)}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded border border-gray-200 hover:bg-gray-50 transition"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
            
            <Link
              href={`/Product/${product.id}`}
              className="px-3 py-2 text-sm text-orange-500 border border-orange-500 rounded hover:bg-orange-50 transition flex items-center gap-2"
            >
              View Details
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}