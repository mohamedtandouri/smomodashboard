import { StorefrontNavbar } from "@/components/storefront/StorefrontNavbar"
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smomo Shop",
  description: "Welcome to Smomo Shop",
}

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <StorefrontNavbar />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <StorefrontFooter />
    </div>
  )
}
