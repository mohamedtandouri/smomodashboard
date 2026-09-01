"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart,
  FileText,
  Settings,
  Grid,
  ChevronDown,
  TrendingUp,
  Menu,
  ShoppingCart,
  AlertCircle,
  PlusCircle,
  Folder,
  Star,
  Store,
  List,
  Plus,
  Tag,
  Ticket,
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type MenuItem = {
  name: string
  icon: React.ElementType
  href: string
  badge?: string
  subItems?: { name: string; href: string; icon?: React.ElementType }[]
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { 
    name: "Orders", 
    icon: ShoppingBag, 
    href: "/orders",
    badge: "5",
    subItems: [
      { name: "All Orders", href: "/orders", icon: Package },
      { name: "New Order", href: "/orders/new", icon: ShoppingCart },
      { name: "Abandoned Carts", href: "/orders/abandoned", icon: AlertCircle },
    ]
  },
  { 
    name: "Products", 
    icon: Package, 
    href: "/products",
    badge: "12",
    subItems: [
      { name: "All Products", href: "/products", icon: Package },
      { name: "New Product", href: "/products/new", icon: PlusCircle },
      { name: "Categories", href: "/products/categories", icon: Folder },
      { name: "Reviews", href: "/products/reviews", icon: Star },
      { name: "Inventory", href: "/products/inventory", icon: Store },
    ]
  },
  { 
    name: "Up Sells", 
    icon: TrendingUp, 
    href: "/marketing/upsells",
    subItems: [
      { name: "All Up Sells", href: "/marketing/upsells", icon: List },
      { name: "New Up Sell", href: "/marketing/upsells/new", icon: Plus },
    ]
  },
  { 
    name: "Coupons", 
    icon: Tag, 
    href: "/marketing/coupons",
    subItems: [
      { name: "All Coupons", href: "/marketing/coupons", icon: Ticket },
      { name: "New Coupon", href: "/marketing/coupons/new", icon: Plus },
    ]
  },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Insights", icon: BarChart, href: "/insights" },
  { name: "Invoices", icon: FileText, href: "/invoices" },
  { name: "Apps", icon: Grid, href: "/apps" },
  { name: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar({ 
  className, 
  isDesktop = true,
  isPinned = false,
  onTogglePin
}: { 
  className?: string, 
  isDesktop?: boolean,
  isPinned?: boolean,
  onTogglePin?: () => void
}) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  // Automatically open menus that contain the active path and close others
  useEffect(() => {
    const activeMenus: Record<string, boolean> = {}
    menuItems.forEach(item => {
      if (item.subItems) {
        if (item.subItems.some(sub => sub.href === pathname)) {
          activeMenus[item.name] = true
        }
      }
    })
    setOpenMenus(activeMenus)
  }, [pathname])

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      if (prev[name]) {
        return {}
      }
      return { [name]: true }
    })
  }

  return (
    <div 
      className={cn(
        "group flex h-full flex-col bg-sidebar text-sidebar-foreground border-r transition-[width] duration-300 ease-in-out overflow-hidden custom-scrollbar",
        isDesktop 
          ? (isPinned ? "w-64" : "w-16 hover:w-64") 
          : "w-64",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b shrink-0 transition-all duration-300">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight shrink-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Store className="h-5 w-5" />
          </div>
          <span 
            className={cn(
              "logo-text whitespace-nowrap transition-opacity duration-300",
              isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
          >
            Smomo
          </span>
        </div>
        {isDesktop && (
          <button 
            onClick={onTogglePin}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-opacity shrink-0 outline-none",
              !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
            title={isPinned ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const isOpen = openMenus[item.name]

          return (
            <div key={item.name}>
              {item.subItems ? (
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition-colors outline-none",
                    isActive || isOpen
                      ? "text-foreground" 
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 w-full">
                    <item.icon 
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors", 
                        (isActive || isOpen) ? "text-primary" : "text-muted-foreground"
                      )} 
                    />
                    <span 
                      className={cn(
                        "whitespace-nowrap truncate transition-opacity duration-300 text-left flex-1",
                        isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div 
                    className={cn(
                      "flex items-center gap-2 shrink-0 transition-opacity duration-300",
                      isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    )}
                  >
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full font-bold bg-primary/10 text-primary">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-300 opacity-50", isOpen && "rotate-180")} />
                  </div>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition-colors outline-none",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <item.icon 
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors", 
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} 
                    />
                    <span 
                      className={cn(
                        "whitespace-nowrap truncate transition-opacity duration-300 text-left flex-1",
                        isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              )}

              <AnimatePresence initial={false}>
                {item.subItems && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={cn(
                      "relative pr-2 py-1 space-y-0.5 transition-[padding] duration-300",
                      isDesktop && !isPinned ? "pl-0 group-hover:pl-[40px]" : "pl-[40px]"
                    )}>
                      {/* Main vertical line for the sub-menu */}
                      <div className={cn(
                        "absolute left-[21px] top-0 bottom-[20px] w-[1px] bg-border/60 transition-opacity duration-300",
                        isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      )} />
                        
                        {item.subItems.map((subItem, index) => {
                          const activeIndex = item.subItems!.findIndex(sub => pathname === sub.href)
                          const isSubActive = index === activeIndex
                          const isAboveActive = activeIndex !== -1 && index < activeIndex
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "relative flex items-center gap-3 px-2.5 py-1.5 text-sm rounded-lg transition-all duration-300 outline-none",
                                  isSubActive 
                                    ? cn(
                                        "text-primary font-medium",
                                        isDesktop && !isPinned ? "bg-transparent group-hover:bg-primary/5" : "bg-primary/5"
                                      )
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                {/* Active line filler (above active item) */}
                                {isAboveActive && (
                                  <div 
                                    className={cn(
                                      "absolute left-[-19px] top-[-4px] bottom-[-4px] w-[2px] bg-primary z-10 transition-opacity duration-300",
                                      isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                                    )} 
                                  />
                                )}
                                
                                {/* Active gap filler (for the active item itself) */}
                                {isSubActive && (
                                  <div 
                                    className={cn(
                                      "absolute left-[-19px] top-[-4px] h-[4px] w-[2px] bg-primary z-10 transition-opacity duration-300",
                                      isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                                    )} 
                                  />
                                )}

                                {/* Branch indicator */}
                                <div 
                                  className={cn(
                                    "absolute left-[-19px] top-0 h-[16px] w-[19px] rounded-bl-[12px] bg-transparent transition-opacity duration-300",
                                    isSubActive 
                                      ? "border-l-2 border-b-2 border-primary z-10" 
                                      : "border-l border-b border-border/60",
                                    isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                                  )} 
                                />
                                
                                {subItem.icon && (
                                  <subItem.icon 
                                    className={cn(
                                      "h-[18px] w-[18px] shrink-0 transition-colors duration-300",
                                      isSubActive ? "text-primary" : "text-muted-foreground"
                                    )} 
                                  />
                                )}
                                
                                <span 
                                  className={cn(
                                    "whitespace-nowrap transition-opacity duration-300",
                                    isDesktop && !isPinned ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                                  )}
                                >
                                  {subItem.name}
                                </span>
                              </Link>
                            )
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
