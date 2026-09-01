import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { DashboardLayout } from "@/components/layout/DashboardLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smomo Dashboard",
  description: "Advanced e-commerce management dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} h-full overflow-hidden bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <DashboardLayout>
            {children}
          </DashboardLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
