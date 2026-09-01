import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smomo Dashboard",
  description: "Advanced e-commerce management dashboard",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  )
}
