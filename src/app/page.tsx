"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingBag, Users, BarChart } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
  { month: "Jul", sales: 3490 },
]

const trafficData = [
  { name: "Organic Search", value: 4500, color: "#3b82f6" }, // blue-500
  { name: "Direct", value: 3200, color: "#8b5cf6" }, // violet-500
  { name: "Social Media", value: 1800, color: "#ec4899" }, // pink-500
  { name: "Referral", value: 1200, color: "#14b8a6" }, // teal-500
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
        <p className="text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,245.00</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <ArrowUp className="h-3 w-3 mr-1" /> +12.5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <ArrowUp className="h-3 w-3 mr-1" /> +8.2%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1 font-medium">
              <ArrowUp className="h-3 w-3 mr-1" /> +18.3%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-destructive flex items-center mt-1 font-medium">
              <ArrowDown className="h-3 w-3 mr-1" /> -2.1%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 pb-0">
            <ChartContainer config={{ sales: { label: "Sales", color: "var(--primary)" } }} className="h-[350px] w-full mt-4">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="sales" stroke="var(--color-sales)" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New order #1002</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New customer registered</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Product stock updated</p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <ArrowUp className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Sales increased by 24%</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#111827', fontWeight: 500 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {trafficData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 text-sm font-medium">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group">
          <CardHeader>
            <CardTitle>Interactive Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* Blurred Placeholder */}
            <div className="absolute inset-0 bg-muted/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center transition-all duration-300">
              <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex flex-col items-center text-center max-w-[280px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">Advanced interactive charting capabilities are being developed for this section.</p>
              </div>
            </div>
            
            {/* Fake background chart */}
            <div className="w-full h-full opacity-30 pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData.map(d => ({...d, sales: d.sales * (Math.random() * 0.5 + 0.5)}))}>
                  <Area type="step" dataKey="sales" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
