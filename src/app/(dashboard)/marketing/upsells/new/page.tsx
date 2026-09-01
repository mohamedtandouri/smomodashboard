"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function NewUpSellPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/marketing/upsells" />} nativeButton={false}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Up Sell</h1>
          <p className="text-muted-foreground text-sm">Offer customers an upgraded product or add-on.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offer Details</CardTitle>
              <CardDescription>
                Define the core details of your up sell offer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer-name">Offer Name</Label>
                <Input id="offer-name" placeholder="e.g. Premium Protection Plan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the benefits of this up sell..." className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Targeting</CardTitle>
              <CardDescription>
                Select which products will trigger this up sell.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trigger Product</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">Smartphone X</SelectItem>
                      <SelectItem value="p2">Laptop Pro</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon"><Plus className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Up Sell Product (The Offer)</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p3">Extended Warranty</SelectItem>
                      <SelectItem value="p4">Premium Case</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discount</CardTitle>
              <CardDescription>
                Incentivize the up sell with a discount.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-value">Value</Label>
                <Input id="discount-value" type="number" placeholder="20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Up Sell</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
