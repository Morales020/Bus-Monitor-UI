"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  userRole: "admin" | "supervisor" | "driver" | "parent"
}

export default function Navbar({ userRole }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userData, setUserData] = useState<any | null>(null)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Try to get user data from localStorage first
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserData({
            name: user.name || user.username || 'User',
            email: user.email || `${user.username}@example.com`,
            role: user.role,
            avatar: null,
          });
          setUnreadNotifications(3);
          return;
        } catch { }
      }
    }
    // Fallback to mock data
    setTimeout(() => {
      setUserData({
        name:
          userRole === "admin"
            ? "Admin User"
            : userRole === "supervisor"
              ? "Supervisor User"
              : userRole === "driver"
                ? "Driver User"
                : "Parent User",
        email: `${userRole}@example.com`,
        role: userRole,
        avatar: null,
      });
      setUnreadNotifications(3);
    }, 500);
  }, [userRole]);

  const handleLogout = async () => {
    // API integration point: Logout
    // Example:
    // try {
    //   const response = await fetch('/api/auth/logout', {
    //     method: 'POST',
    //   });
    //   if (!response.ok) throw new Error('Logout failed');
    //   window.location.href = '/login';
    // } catch (error) {
    //   console.error('Error during logout:', error);
    // }

    // Simulate logout
    router.push("/login")
  }

  const getNavLinks = () => {
    switch (userRole) {
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/buses", label: "Buses" },
          { href: "/admin/trips", label: "Trips" },
          { href: "/admin/students", label: "Students" },
        ]
      case "supervisor":
        return [
          { href: "/supervisor/dashboard", label: "Dashboard" },
          { href: "/supervisor/students", label: "Students" },
          { href: "/supervisor/trips", label: "Trips" },
        ]
      case "driver":
        return [
          { href: "/driver/dashboard", label: "Dashboard" },
          { href: "/driver/trips", label: "Trips" },
          { href: "/driver/students", label: "Students" },
        ]
      case "parent":
        return [
          { href: "/parent/dashboard", label: "Dashboard" },
          { href: "/parent/children", label: "Children" },
          { href: "/parent/history", label: "History" },
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href={`/${userRole}/dashboard`} className="flex items-center space-x-2">
            <span className="font-bold text-xl">BusTracker</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground/80 ${pathname === link.href ? "text-foreground font-bold" : "text-foreground/60"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href={`/${userRole}/notifications`}>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </Link>

            <ModeToggle />

            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.avatar || "/placeholder.svg?height=32&width=32"} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${userRole}/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${userRole}/notifications`}>Notifications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              </Button>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="px-2 py-6">
                  <Link
                    href={`/${userRole}/dashboard`}
                    className="flex items-center space-x-2 mb-6"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-bold text-xl">BusTracker</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-foreground/80 ${pathname === link.href ? "text-foreground font-bold" : "text-foreground/60"
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <Link
                      href={`/${userRole}/profile`}
                      className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/${userRole}/notifications`}
                      className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                    <button
                      className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80 text-left"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
