"use client"

import { Search, Save } from "lucide-react"
import { createOrder } from "@/app/actions/orderActions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateOrderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [discount, setDiscount] = useState(0)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    const result = await createOrder(formData)
    setIsSubmitting(false)
    
    if (result.success) {
      alert("Order created successfully!")
      // Normally we would navigate to /orders here
      // router.push("/orders")
    } else {
      alert("Error: " + result.error)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col h-full min-h-[calc(100vh-theme(spacing.24))] relative">
      <div className="space-y-6 flex-1 pb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create order</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column (Forms & Table) */}
          <div className="flex-1 space-y-6">
            
            <div className="bg-card border rounded-xl shadow-sm p-4 sm:p-6 space-y-6">
              
              {/* Product Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="w-full pl-9 pr-4 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Discount Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Discount</label>
                  <input 
                    type="number"
                    name="discount"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Discount type</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none pr-8">
                      <option>Fixed amount</option>
                      <option>Percentage</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Discount reason</label>
                  <input 
                    type="text" 
                    placeholder="Discount reason" 
                    className="w-full px-3 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-md overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Subtotal</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Coupon</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Discount</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Shipping fee</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">VAT (0.00%)</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-4 text-foreground whitespace-nowrap">0.00 د.م</td>
                      <td className="px-4 py-4 text-foreground whitespace-nowrap">- 0.00 د.م</td>
                      <td className="px-4 py-4 text-foreground whitespace-nowrap">-{discount.toFixed(2)} د.م</td>
                      <td className="px-4 py-4 text-foreground whitespace-nowrap">0.00 د.م</td>
                      <td className="px-4 py-4 text-foreground whitespace-nowrap">0.00 د.م</td>
                      <td className="px-4 py-4 text-primary font-medium whitespace-nowrap">-{discount.toFixed(2)} د.م</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Note</label>
                <textarea 
                  name="note"
                  rows={3}
                  placeholder="Add a note to this order" 
                  className="w-full px-3 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                ></textarea>
              </div>

            </div>
          </div>

          {/* Right Column (Side Cards) */}
          <div className="w-full lg:w-[320px] space-y-6 shrink-0">
            
            {/* Customer Card */}
            <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="font-semibold text-foreground">Find or create a customer</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for custom..." 
                  className="w-full pl-9 pr-4 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="font-semibold text-foreground">Tags</h3>
              <input 
                type="text" 
                name="tags"
                placeholder="Type in (comma separated)" 
                className="w-full px-3 py-2 bg-transparent border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 -mb-4 sm:-mb-6 lg:-mb-8 mt-auto bg-card border-t p-4 flex justify-end z-20">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  )
}
