"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

export function StorefrontFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">SMOMO<span className="text-[#b02a87]">.</span></h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Your one-stop shop for premium products. Experience quality and affordability like never before.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-[#b02a87] transition-colors"><span className="text-xs font-bold">FB</span></a>
              <a href="#" className="text-gray-400 hover:text-[#b02a87] transition-colors"><span className="text-xs font-bold">TW</span></a>
              <a href="#" className="text-gray-400 hover:text-[#b02a87] transition-colors"><span className="text-xs font-bold">IG</span></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/store" className="hover:text-[#b02a87] transition-colors">Home</Link></li>
              <li><Link href="/store/products" className="hover:text-[#b02a87] transition-colors">Products</Link></li>
              <li><Link href="/store/categories" className="hover:text-[#b02a87] transition-colors">Categories</Link></li>
              <li><Link href="/about" className="hover:text-[#b02a87] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/contact" className="hover:text-[#b02a87] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#b02a87] transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-[#b02a87] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-[#b02a87] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Newsletter</h4>
            <p className="text-sm text-gray-500">Subscribe to get special offers and updates.</p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#b02a87] focus:border-[#b02a87] text-sm"
              />
              <button 
                type="submit" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-r-md transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Smomo Shop. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
