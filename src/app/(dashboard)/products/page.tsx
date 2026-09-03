import { PrismaClient } from "@prisma/client"
import { ProductsClient } from "./ProductsClient"

const prisma = new PrismaClient()

// Disable caching for this admin page so we always see fresh data
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true
    }
  })

  return <ProductsClient initialProducts={products} />
}
