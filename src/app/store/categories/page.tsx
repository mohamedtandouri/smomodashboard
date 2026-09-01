import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Folder } from "lucide-react"

const prisma = new PrismaClient()

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Browse Categories</h1>
        <p className="text-gray-600 mb-10 text-lg">
          Explore our wide range of products organized by category to find exactly what you're looking for.
        </p>

        {categories.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-xl border-dashed">
            <p className="text-gray-500 text-lg">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                href={`/store/products?category=${category.id}`} 
                key={category.id}
                className="group"
              >
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-[#b02a87]/30 transition-all duration-300 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 text-[#b02a87] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#b02a87]/10 transition-transform">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#b02a87] transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category._count.products} Product{category._count.products !== 1 && 's'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
