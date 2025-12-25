'use client';

import { use, useEffect, useState } from 'react';
import { getProductById } from '@/lib/api';
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Star, Package, TrendingUp, Shield, Truck } from 'lucide-react';

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  const images = product.images || [product.thumbnail];
  const discountPrice = product.discountPercentage 
    ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2)
    : null;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-orange-500 text-orange-500' 
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-50 rounded-lg p-8 mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-96 object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`bg-gray-50 rounded-lg p-3 border-2 transition ${
                        selectedImage === idx 
                          ? 'border-orange-500' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-20 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full uppercase">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="text-sm text-gray-500">
                    by <span className="font-medium text-gray-700">{product.brand}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                {renderStars(Math.round(product.rating))}
                <span className="text-gray-600 text-sm">
                  {product.rating} ({Math.floor(Math.random() * 500) + 50} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  {discountPrice ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${discountPrice}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        ${product.price}
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                        -{product.discountPercentage}%
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <Package className={`w-5 h-5 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-50 transition"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <span>1 year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">General Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900 capitalize">{product.category}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium text-gray-900">{product.brand}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-gray-900">SKU-{product.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Availability:</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Pricing & Rating</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-gray-900">${product.price}</span>
                </div>
                {product.discountPercentage > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-orange-600">{product.discountPercentage}% OFF</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium text-gray-900">{product.rating} / 5</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Stock Quantity:</span>
                  <span className="font-medium text-gray-900">{product.stock} units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}