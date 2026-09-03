"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, Search, User } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { usePathname } from "next/navigation"

export function StorefrontNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  
  const cartItemCount = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/store' },
    { name: 'Products', href: '/store/products' },
    { name: 'Categories', href: '/store/categories' },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-0' : 'bg-white border-b border-gray-100 py-0'}`}>
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/store" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            SMOMO<span className="text-[#ff2d55] group-hover:text-rose-500 transition-colors">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/store' && pathname?.startsWith(link.href))
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive ? 'text-[#ff2d55]' : 'text-gray-500 hover:text-[#ff2d55]'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-[#ff2d55] hover:bg-rose-50 rounded-full transition-all hidden sm:block" aria-label="Search">
            <Search className="w-[18px] h-[18px]" />
          </button>
          
          <Link href="/store/login" className="p-2 text-gray-500 hover:text-[#ff2d55] hover:bg-rose-50 rounded-full transition-all hidden sm:block" aria-label="User Account">
            <User className="w-[18px] h-[18px]" />
          </Link>
          
          <Link href="/store/cart" className="relative p-2 text-gray-500 hover:text-[#ff2d55] hover:bg-rose-50 rounded-full transition-all group">
            <ShoppingCart className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
            {isMounted && cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#ff2d55] rounded-full shadow-sm ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-[#ff2d55] hover:bg-rose-50 rounded-full transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-xl absolute w-full left-0 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="block text-base font-medium text-gray-700 hover:text-[#ff2d55] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex gap-4">
            <Link 
              href="/store/login" 
              className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-gray-50 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-4 h-4" /> Account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
