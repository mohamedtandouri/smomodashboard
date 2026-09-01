"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertCircle, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react"

const inventoryItems = [
  { id: "INV-001", product: "Wireless Headphones", sku: "WH-01", stock: 148, status: "in_stock", lastUpdated: "2023-10-24" },
  { id: "INV-002", product: "Bluetooth Speaker", sku: "BS-05", stock: 12, status: "low_stock", lastUpdated: "2023-10-23" },
  { id: "INV-003", product: "Smart Watch", sku: "SW-02", stock: 0, status: "out_of_stock", lastUpdated: "2023-10-22" },
  { id: "INV-004", product: "Phone Case", sku: "PC-11", stock: 300, status: "in_stock", lastUpdated: "2023-10-21" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground text-sm">Monitor your stock levels and inventory reviews.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.href = '/products/inventory/reviews'}>
            View Reviews
          </Button>
          <Button>Update Stock</Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">24</div>
            <p className="text-xs text-amber-500 flex items-center mt-1">
              Needs attention soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">3</div>
            <p className="text-xs text-rose-500 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" /> Revenue loss potential
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Current Stock</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
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
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                    <TableCell>
                      {item.status === "in_stock" && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> In Stock
                        </Badge>
                      )}
                      {item.status === "low_stock" && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <AlertCircle className="w-3 h-3 mr-1" /> Low Stock
                        </Badge>
                      )}
                      {item.status === "out_of_stock" && (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                          <AlertCircle className="w-3 h-3 mr-1" /> Out of Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
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
