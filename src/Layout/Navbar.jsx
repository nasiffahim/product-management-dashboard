'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', type: 'link' },
    { name: 'Shop', href: '#products', type: 'scroll' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/shopping.png"
                alt="ShopUp Logo"
              />
            </div>
            <span className="font-oswald text-xl font-extrabold text-gray-900">ShopUp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.type === 'scroll' ? (
                <button
                  key={link.name}
                  onClick={scrollToProducts}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition">
              <User className="w-4 h-4" />
              Log In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.type === 'scroll' ? (
                  <button
                    key={link.name}
                    onClick={scrollToProducts}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition w-full">
                <User className="w-4 h-4" />
                Log In
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}