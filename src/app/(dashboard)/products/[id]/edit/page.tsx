import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import EditProductClient from "./EditProductClient"

const prisma = new PrismaClient()

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!product) {
    notFound()
  }

  return <EditProductClient initialProduct={product} />
}
