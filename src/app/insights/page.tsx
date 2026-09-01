"use client"

import { Download, Calendar as CalendarIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const trafficData = [
  { source: "Organic", visitors: 4000 },
  { source: "Social", visitors: 3000 },
  { source: "Direct", visitors: 2000 },
  { source: "Email", visitors: 2780 },
  { source: "Referral", visitors: 1890 },
]

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Store Insights</h1>
          <p className="text-muted-foreground text-sm">Detailed analytics and performance metrics for your store.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Last 30 Days
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</h3>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold">3.24%</span>
              <span className="text-emerald-500 text-sm font-medium flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +0.4%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: "45%" }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Order Value</h3>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold">$84.50</span>
              <span className="text-emerald-500 text-sm font-medium flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "65%" }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Cart Abandonment</h3>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold">68.2%</span>
              <span className="text-destructive text-sm font-medium flex items-center mb-1">
                <TrendingDown className="h-3 w-3 mr-1" /> -2.1%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: "68%" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={{ visitors: { label: "Visitors", color: "var(--primary)" } }} className="h-[300px] w-full">
              <BarChart data={trafficData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="visitors" fill="var(--primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Interactive chart coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
