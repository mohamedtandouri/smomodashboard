"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Star, StarHalf } from "lucide-react"

const productReviews = [
  { id: "1", product: "Wireless Headphones", customer: "Alice Smith", rating: 5, date: "2023-10-24", comment: "Excellent sound quality and very comfortable!" },
  { id: "2", product: "Bluetooth Speaker", customer: "Bob Jones", rating: 4, date: "2023-10-23", comment: "Good bass, but battery life could be better." },
  { id: "3", product: "Smart Watch", customer: "Charlie Brown", rating: 5, date: "2023-10-22", comment: "Tracks everything perfectly. Highly recommend." },
  { id: "4", product: "Phone Case", customer: "Diana Prince", rating: 3, date: "2023-10-21", comment: "Looks nice but scratches easily." },
]

export default function ProductReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Reviews</h1>
          <p className="text-muted-foreground text-sm">Manage and respond to customer reviews.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Reviews</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reviews..."
                  className="pl-9 bg-muted/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.product}</TableCell>
                    <TableCell>{review.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                    <TableCell className="text-muted-foreground">{review.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
