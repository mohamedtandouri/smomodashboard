import Link from "next/link"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function StorefrontHomePage() {
  // Fetch some products to display as featured
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 border-b relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Discover Quality Products at <span className="text-[#b02a87]">SMOMO.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Shop our latest collections and find exactly what you need with fast shipping and secure payments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/store/products" 
                className="bg-[#b02a87] text-white px-8 py-3 rounded-md font-medium hover:bg-[#90226e] transition-colors shadow-lg shadow-[#b02a87]/20"
              >
                Shop Now
              </Link>
              <Link 
                href="/store/categories" 
                className="bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-gradient-to-bl from-[#b02a87] to-transparent pointer-events-none" />
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/store/products" className="text-[#b02a87] font-medium hover:underline">
              View All &rarr;
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No products found. Add some from the dashboard!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group block">
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl hover:border-[#b02a87]/30 transition-all duration-300">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${product.id}/400/400`} 
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                      <p className="text-[#b02a87] font-bold mt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#b02a87]/10 text-[#b02a87] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-500 text-sm">On all orders over $50.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-[#b02a87]/10 text-[#b02a87] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-500 text-sm">100% secure payment processing.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-[#b02a87]/10 text-[#b02a87] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-500 text-sm">We're here to help anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
