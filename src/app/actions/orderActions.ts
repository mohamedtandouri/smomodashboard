"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createOrder(formData: FormData) {
  const discount = parseFloat(formData.get("discount") as string) || 0
  const note = formData.get("note") as string
  const tags = formData.get("tags") as string
  
  // Create a unique order number
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`

  // For this proof of concept, we assume default values for subtotal, etc.
  const subtotal = 0
  const shippingFee = 0
  const total = subtotal - discount + shippingFee

  try {
    const order = await db.order.create({
      data: {
        orderNumber,
        discount,
        note,
        tags,
        subtotal,
        shippingFee,
        total,
      }
    })

    revalidatePath("/orders")
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Failed to create order:", error)
    return { success: false, error: "Failed to create order" }
  }
}
