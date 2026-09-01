"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading cart...</div>
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you love!
        </p>
        <Link 
          href="/store/products" 
          className="inline-flex items-center justify-center bg-[#b02a87] text-white px-8 py-3 rounded-md font-medium hover:bg-[#90226e] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Item Rows */}
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <Link href={`/products/${item.id}`} className="shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={item.image || `https://picsum.photos/seed/${item.id}/200/200`} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.id}`} className="font-semibold text-gray-900 hover:text-[#b02a87] truncate block">
                        {item.title}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 mt-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center hidden md:block text-gray-600 font-medium">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        type="button"
                        className="p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button 
                        type="button"
                        className="p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-right w-full md:w-auto mt-2 md:mt-0 flex justify-between md:block font-bold text-gray-900">
                    <span className="md:hidden text-gray-500 font-normal">Subtotal:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center px-2">
             <Link href="/store/products" className="text-[#b02a87] font-medium hover:underline flex items-center gap-2">
                Continue Shopping
             </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Estimated Total</span>
              <span className="text-2xl font-black text-[#b02a87]">${getTotalPrice().toFixed(2)}</span>
            </div>

            <Link 
              href="/store/checkout" 
              className="w-full flex items-center justify-center gap-2 bg-[#b02a87] text-white py-4 rounded-lg font-bold hover:bg-[#90226e] transition-colors shadow-lg shadow-[#b02a87]/20"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-6 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
