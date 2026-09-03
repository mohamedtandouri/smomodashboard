"use client"

import Link from "next/link"

export function StorefrontFooter() {
  return (
    <footer className="bg-gray-950 pt-16 pb-8 border-t border-gray-900 text-gray-400 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">SMOMO<span className="text-[#ff2d55]">.</span></h3>
            <p className="text-sm leading-relaxed max-w-xs font-light text-gray-400">
              Your ultimate destination for premium lifestyle products. We combine quality, affordability, and exceptional design.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#ff2d55] hover:text-white transition-all hover:-translate-y-1"><span className="text-[10px] font-semibold">FB</span></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#ff2d55] hover:text-white transition-all hover:-translate-y-1"><span className="text-[10px] font-semibold">TW</span></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#ff2d55] hover:text-white transition-all hover:-translate-y-1"><span className="text-[10px] font-semibold">IG</span></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#ff2d55] hover:text-white transition-all hover:-translate-y-1"><span className="text-[10px] font-semibold">YT</span></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><Link href="/store" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> Home</Link></li>
              <li><Link href="/store/products" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> All Products</Link></li>
              <li><Link href="/store/categories" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> Categories</Link></li>
              <li><Link href="/store/about" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Support</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><Link href="/store/contact" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> Contact Us</Link></li>
              <li><Link href="/store/faq" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> FAQs</Link></li>
              <li><Link href="/store/shipping" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> Shipping & Returns</Link></li>
              <li><Link href="/store/privacy" className="hover:text-[#ff2d55] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#ff2d55] transition-colors"></span> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex gap-2">
                <span className="text-[#ff2d55] font-medium">Email:</span>
                <a href="mailto:support@smomo.shop" className="hover:text-white transition-colors">support@smomo.shop</a>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ff2d55] font-medium">Phone:</span>
                <span className="hover:text-white transition-colors cursor-default">+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ff2d55] font-medium">Address:</span>
                <span className="leading-relaxed">123 Commerce Avenue,<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row items-center justify-between text-xs">
          <p className="font-light text-gray-500">&copy; {new Date().getFullYear()} <span className="text-gray-300 font-medium">Smomo Shop</span>. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-medium text-gray-700 tracking-wide">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">VISA</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">MASTERCARD</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">PAYPAL</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
