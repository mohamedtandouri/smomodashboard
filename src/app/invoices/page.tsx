"use client"

import { useState } from "react"
import { Search, Download, Eye, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const MOCK_INVOICES = [
  { id: "INV-2023-001", date: "Oct 24, 2023", customer: "Acme Corp", amount: 1450.00, status: "Paid", name: "Premium Widget", sku: "WIDG-001", orders: 12, inventory: 450 },
  { id: "INV-2023-002", date: "Oct 25, 2023", customer: "Global Tech LLC", amount: 3200.00, status: "Pending", name: "Super Gadget", sku: "GADG-002", orders: 8, inventory: 120 },
  { id: "INV-2023-003", date: "Oct 15, 2023", customer: "Sarah Jenkins", amount: 450.00, status: "Overdue", name: "Basic Thing", sku: "THIN-003", orders: 4, inventory: 15 },
]

export default function InvoicesPage() {
  const [filter, setFilter] = useState("All")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground text-sm">Manage billing, track payments, and generate invoices.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4 bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
              {["All", "Paid", "Pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filter === f ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-9 bg-background w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Add quantity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_INVOICES.filter(i => filter === "All" || i.status === filter).map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>{invoice.sku}</TableCell>
                  <TableCell>{invoice.orders}</TableCell>
                  <TableCell>{invoice.inventory}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {invoice.status === "Paid" && <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" /> Paid</Badge>}
                    {invoice.status === "Pending" && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
                    {invoice.status === "Overdue" && <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="h-3 w-3 mr-1" /> Overdue</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="0" className="w-16 h-8" />
                      <Button size="sm" variant="outline">Add</Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
