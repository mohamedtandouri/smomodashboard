import { notFound } from "next/navigation"
import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { ChevronRight, ShieldCheck, Truck, ArrowLeft } from "lucide-react"
import { AddToCartButton } from "@/components/storefront/AddToCartButton"

const prisma = new PrismaClient()

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/store" className="hover:text-gray-900">Home</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <Link href="/store/products" className="hover:text-gray-900">Products</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        {product.category && (
          <>
            <Link href={`/products?category=${product.category.id}`} className="hover:text-gray-900">{product.category.name}</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
          </>
        )}
        <span className="text-gray-900 font-medium truncate w-48 sm:w-auto">{product.name}</span>
      </nav>

      <Link href="/store/products" className="inline-flex items-center text-sm text-[#ff2d55] hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] sm:aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src={product.imageUrl || `https://picsum.photos/seed/${product.id}/800/800`} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <p className="text-3xl font-bold text-[#ff2d55]">${product.price.toFixed(2)}</p>
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart Section (Client Component) */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
            <AddToCartButton product={product} />
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">1-Year Warranty</p>
                <p className="text-xs">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-xs">2-4 business days</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm text-gray-600 mb-8">
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Description</h3>
            {product.description ? (
              <div 
                dangerouslySetInnerHTML={{ __html: product.description }} 
                className="prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-[#ff2d55] prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-gray-200 prose-img:max-h-[500px] prose-img:object-contain prose-img:mx-auto prose-headings:text-gray-900" 
              />
            ) : (
              <p className="italic text-gray-400">No description provided for this product.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
