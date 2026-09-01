"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const MOCK_ORDERS = [
  { id: "ORD-1002", date: "Today, 10:24 AM", customer: "Sarah Jenkins", total: 129.99, status: "Processing" },
  { id: "ORD-1001", date: "Yesterday", customer: "Michael Chen", total: 45.00, status: "Shipped" },
  { id: "ORD-1000", date: "Oct 24, 2023", customer: "Emma Watson", total: 399.50, status: "Delivered" },
  { id: "ORD-0999", date: "Oct 23, 2023", customer: "James Smith", total: 89.99, status: "Cancelled" },
  { id: "ORD-0998", date: "Oct 23, 2023", customer: "Olivia Brown", total: 15.50, status: "Processing" },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Processing": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>
      case "Shipped": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>
      case "Delivered": return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
      case "Cancelled": return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground text-sm">Manage and track your customer orders.</p>
        </div>
        <Button>Create Order</Button>
      </div>

      <Card>
        <CardHeader className="py-4 bg-muted/20 border-b">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No orders found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
