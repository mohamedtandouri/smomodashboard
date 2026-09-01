"use server"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function createOrder(formData: FormData, cartItems: { id: string; quantity: number; price: number }[]) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string

    if (!name || !email || cartItems.length === 0) {
      return { success: false, error: "Missing required fields or empty cart" }
    }

    // 1. Find or create customer
    let customer = await prisma.customer.findUnique({ where: { email } })
    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, email, phone }
      })
    }

    // 2. Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const shippingFee = subtotal > 50 ? 0 : 10 // Example logic
    const total = subtotal + shippingFee

    // 3. Create Order
    const orderNumber = `ORD-${Date.now()}`
    
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        status: "PENDING",
        subtotal,
        shippingFee,
        total,
        note: `Shipping Address: ${address}, ${city}`,
        items: {
          create: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    // 4. Update Stock (Simple version without transactions for this demo)
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } }
      })
    }

    return { success: true, orderNumber }
  } catch (error) {
    console.error("Checkout error:", error)
    return { success: false, error: "Something went wrong during checkout" }
  }
}
