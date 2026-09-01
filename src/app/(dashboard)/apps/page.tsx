"use client"

import { Search, CreditCard, Mail, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const APPS = [
  {
    name: "Stripe Payments",
    description: "Accept credit cards and digital wallets securely on your store.",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    installed: true,
  },
  {
    name: "Mailchimp",
    description: "Automate your email marketing and reach out to abandoned carts.",
    icon: Mail,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    installed: true,
  },
  {
    name: "Google Analytics",
    description: "Get deeper insights into your store traffic and customer behavior.",
    icon: BarChart3,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    installed: false,
  },
]

export default function AppsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Apps & Integrations</h1>
          <p className="text-muted-foreground text-sm">Supercharge your store by connecting your favorite tools.</p>
        </div>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" /> Browse App Store
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {APPS.map((app) => (
          <Card key={app.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4 flex flex-row items-start justify-between">
              <div className={`w-12 h-12 rounded-lg ${app.bg} ${app.color} flex items-center justify-center`}>
                <app.icon className="h-6 w-6" />
              </div>
              {app.installed && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 uppercase text-[10px] tracking-wide">
                  Installed
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{app.name}</CardTitle>
              <CardDescription className="line-clamp-2 h-10">{app.description}</CardDescription>
            </CardContent>
            <CardFooter>
              {app.installed ? (
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" /> Manage Settings
                </Button>
              ) : (
                <Button className="w-full">Install App</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
