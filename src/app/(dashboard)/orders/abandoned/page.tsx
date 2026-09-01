"use client"

import { Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AbandonedCartsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Abandoned Carts</h1>
          <p className="text-muted-foreground text-sm">Recover lost sales by reaching out to these customers.</p>
        </div>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" /> Send Bulk Recovery
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Abandoned</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/30">
                <TableCell className="font-medium">David Smith</TableCell>
                <TableCell className="text-muted-foreground">david@example.com</TableCell>
                <TableCell>3 items</TableCell>
                <TableCell className="font-medium">$245.50</TableCell>
                <TableCell className="text-destructive font-medium flex items-center">
                  <Clock className="mr-1.5 h-4 w-4" /> 2 hrs ago
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Send Email
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/30">
                <TableCell className="font-medium">Guest User</TableCell>
                <TableCell className="text-muted-foreground">guest84@mail.com</TableCell>
                <TableCell>1 item</TableCell>
                <TableCell className="font-medium">$89.99</TableCell>
                <TableCell className="text-muted-foreground flex items-center">
                  <Clock className="mr-1.5 h-4 w-4" /> 1 day ago
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Send Email
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
