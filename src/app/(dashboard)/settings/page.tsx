"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your store preferences and configurations.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>
                Your store's name and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="Smomo" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" defaultValue="contact@smomo.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 000-0000" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Store Currency</CardTitle>
              <CardDescription>
                The currency your products are sold in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 max-w-sm">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" defaultValue="USD ($)" disabled />
                <p className="text-xs text-muted-foreground mt-1">Contact support to change your base currency.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>
                Manage where you ship and how much you charge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Domestic</h4>
                  <p className="text-sm text-muted-foreground">United States</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline">Add Shipping Zone</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>
                Configure how you accept payments from customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-[#635BFF] rounded flex items-center justify-center text-white font-bold text-[10px]">Stripe</div>
                  <div>
                    <h4 className="font-semibold text-sm">Stripe</h4>
                    <p className="text-xs text-muted-foreground">Credit Cards, Apple Pay, Google Pay</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="rounded-lg border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-[#00457C] rounded flex items-center justify-center text-white font-bold text-[10px] italic">PayPal</div>
                  <div>
                    <h4 className="font-semibold text-sm">PayPal</h4>
                    <p className="text-xs text-muted-foreground">PayPal Balance, Pay Later</p>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Your active subscription and payment methods for Smomo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Current Plan</span>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">Pro ($29/mo)</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Next Billing Date</span>
                  <span className="text-sm text-muted-foreground">October 1, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Privacy & Security</CardTitle>
              <CardDescription>
                Manage how customer data is collected and stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Require Customer Consent</Label>
                  <p className="text-sm text-muted-foreground">
                    Ask for consent before tracking analytics (GDPR compliance).
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Anonymize IP Addresses</Label>
                  <p className="text-sm text-muted-foreground">
                    Mask customer IP addresses in analytics and logs.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export & Deletion</CardTitle>
              <CardDescription>
                Download your store data or permanently delete your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Request Data Export (CSV)
              </Button>
              <Button variant="destructive" className="w-full justify-start mt-2">
                Delete Store Permanently
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
