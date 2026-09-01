"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem("smomo_sidebar_pinned")
    if (stored !== null) {
      setIsPinned(stored === "true")
    }
  }, [])

  const handleTogglePin = () => {
    const newState = !isPinned
    setIsPinned(newState)
    localStorage.setItem("smomo_sidebar_pinned", String(newState))
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Desktop Sidebar spacing & Fixed wrapper */}
      {isDesktop && (
        <>
          <div 
            className={cn(
              "hidden md:block shrink-0",
              isMounted ? "transition-[width] duration-300 ease-in-out" : "",
              isPinned ? "w-64" : "w-16"
            )} 
            aria-hidden="true" 
          />
          <div className="hidden md:block fixed left-0 top-0 bottom-0 z-40 h-full">
            <Sidebar isDesktop={true} isPinned={isPinned} onTogglePin={handleTogglePin} />
          </div>
        </>
      )}

      {/* Mobile Sidebar */}
      {!isDesktop && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar isDesktop={false} />
          </SheetContent>
        </Sheet>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden w-full min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
