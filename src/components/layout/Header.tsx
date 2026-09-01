"use client"

import { Bell, Menu, Moon, Search, Sun, User, Store, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { buttonVariants } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 md:hidden font-bold text-lg tracking-tight shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Store className="h-4 w-4" />
          </div>
          <span>Smomo</span>
        </div>

        <div className="hidden md:flex items-center text-sm font-medium text-muted-foreground">
          <span className="text-foreground">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1"
          />
        </div>

        <Link href="/store" target="_blank" title="Go to Storefront">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-primary border-primary/20 hover:bg-primary/10">
            <ExternalLink className="h-4 w-4" />
            <span>View Store</span>
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden text-primary">
            <ExternalLink className="h-5 w-5" />
            <span className="sr-only">View Store</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Popover>
          <PopoverTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "relative" })}>
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b font-semibold">Notifications</div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="text-sm font-medium">New Order #1003</p>
                <p className="text-xs text-muted-foreground mt-1">Just now</p>
              </div>
              <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="text-sm font-medium">Product stock running low</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full text-primary rounded-none p-3 h-auto font-medium">
              View All
            </Button>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm" })}>
            JD
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
