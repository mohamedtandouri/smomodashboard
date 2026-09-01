"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react"
import Link from "next/link"

export default function NewCouponPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/marketing/coupons" />} nativeButton={false}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Coupon</h1>
          <p className="text-muted-foreground text-sm">Create a new discount code for your customers.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Code</CardTitle>
              <CardDescription>
                The code customers will enter at checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="coupon-code">Discount Code</Label>
                  <button className="text-xs text-primary hover:underline font-medium">Generate random code</button>
                </div>
                <Input id="coupon-code" placeholder="e.g. SUMMER2024" className="font-mono uppercase" />
                <p className="text-xs text-muted-foreground">Customers must enter this code at checkout.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Value</CardTitle>
              <CardDescription>
                Define the discount amount and type.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input id="discount-value" type="number" placeholder="10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minimum Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Requirement Type</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="purchase_amount">Minimum purchase amount ($)</SelectItem>
                    <SelectItem value="quantity">Minimum quantity of items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p className="font-medium text-lg text-primary">SUMMER2024</p>
                <ul className="list-disc pl-4 text-muted-foreground space-y-1">
                  <li>10% off entire order</li>
                  <li>No minimum purchase requirement</li>
                  <li>Active from today</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Coupon</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
