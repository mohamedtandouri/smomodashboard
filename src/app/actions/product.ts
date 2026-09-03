"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const ext = file.name.split('.').pop() || 'png';
  const filename = `${uuidv4()}.${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string) || 0
  const stock = parseInt(formData.get("stock") as string) || 0
  
  const imageFile = formData.get("image") as File | null;
  let imageUrl = formData.get("imageUrl") as string | null;
  
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }
  
  // Category ID might be empty if not selected
  let categoryId = formData.get("categoryId") as string
  
  if (!name) {
    return { error: "Product name is required" }
  }

  if (categoryId === "") {
    categoryId = undefined as any;
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        ...(imageUrl ? { imageUrl } : {}),
        categoryId: categoryId || undefined,
      },
    })
    
    revalidatePath("/store")
    revalidatePath("/store/products")
    revalidatePath("/dashboard/products")
    
    return { success: true, productId: product.id }
  } catch (error) {
    console.error("Error creating product:", error)
    return { error: "Failed to create product" }
  }
}

export async function deleteProduct(productId: string) {
  try {
    // Manually delete related records to avoid SQLite foreign key constraint errors
    await prisma.orderItem.deleteMany({
      where: { productId }
    })
    
    await prisma.review.deleteMany({
      where: { productId }
    })

    await prisma.product.delete({
      where: { id: productId }
    })
    
    revalidatePath("/store")
    revalidatePath("/store/products")
    revalidatePath("/dashboard/products")
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { error: "Failed to delete product" }
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string) || 0
  const stock = parseInt(formData.get("stock") as string) || 0
  const imageFile = formData.get("image") as File | null;
  let imageUrl = formData.get("imageUrl") as string | null;
  
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }
  
  let categoryId = formData.get("categoryId") as string
  
  if (!name) {
    return { error: "Product name is required" }
  }

  if (categoryId === "") {
    categoryId = undefined as any;
  }

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        stock,
        ...(imageUrl ? { imageUrl } : {}),
        categoryId: categoryId || undefined,
      },
    })
    
    revalidatePath("/store")
    revalidatePath("/store/products")
    revalidatePath("/dashboard/products")
    revalidatePath(`/store/products/${productId}`)
    
    return { success: true, productId: product.id }
  } catch (error) {
    console.error("Error updating product:", error)
    return { error: "Failed to update product" }
  }
}

export async function duplicateProduct(productId: string) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!existingProduct) {
      return { error: "Product not found" }
    }

    const duplicatedProduct = await prisma.product.create({
      data: {
        name: `${existingProduct.name} - Copy`,
        description: existingProduct.description,
        price: existingProduct.price,
        stock: existingProduct.stock,
        imageUrl: existingProduct.imageUrl,
        categoryId: existingProduct.categoryId,
      }
    })

    revalidatePath("/store")
    revalidatePath("/store/products")
    revalidatePath("/dashboard/products")

    return { success: true, productId: duplicatedProduct.id }
  } catch (error) {
    console.error("Error duplicating product:", error)
    return { error: "Failed to duplicate product" }
  }
}
