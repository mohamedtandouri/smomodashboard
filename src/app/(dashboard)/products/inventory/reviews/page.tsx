"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertCircle, CheckCircle2 } from "lucide-react"

const inventoryReviews = [
  { id: "REV-001", product: "Wireless Headphones", sku: "WH-01", expected: 150, actual: 148, status: "discrepancy", date: "2023-10-24" },
  { id: "REV-002", product: "Bluetooth Speaker", sku: "BS-05", expected: 45, actual: 45, status: "matched", date: "2023-10-23" },
  { id: "REV-003", product: "Smart Watch", sku: "SW-02", expected: 80, actual: 75, status: "discrepancy", date: "2023-10-22" },
  { id: "REV-004", product: "Phone Case", sku: "PC-11", expected: 300, actual: 300, status: "matched", date: "2023-10-21" },
]

export default function InventoryReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Reviews</h1>
          <p className="text-muted-foreground text-sm">Monitor and reconcile stock discrepancies.</p>
        </div>
        <Button>New Review</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recent Reviews</CardTitle>
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
                  <TableHead>Review ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                  <TableHead className="text-right">Actual</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.id}</TableCell>
                    <TableCell>{review.product}</TableCell>
                    <TableCell>{review.sku}</TableCell>
                    <TableCell className="text-right">{review.expected}</TableCell>
                    <TableCell className="text-right">{review.actual}</TableCell>
                    <TableCell>
                      {review.status === "matched" ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Matched
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                          <AlertCircle className="w-3 h-3 mr-1" /> Discrepancy
                        </Badge>
                      )}
                    </TableCell>
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
