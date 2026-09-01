"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"

export function StorefrontNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const cartItemCount = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/store" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">SMOMO<span className="text-[#b02a87]">.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/store" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/store/products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Products
          </Link>
          <Link href="/store/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Categories
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors hidden sm:block" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/store/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {isMounted && cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#b02a87] rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
          <Link 
            href="/store" 
            className="block text-base font-medium text-gray-600 hover:text-[#b02a87]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/store/products" 
            className="block text-base font-medium text-gray-600 hover:text-[#b02a87]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            href="/store/categories" 
            className="block text-base font-medium text-gray-600 hover:text-[#b02a87]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>
        </div>
      )}
    </header>
  )
}
