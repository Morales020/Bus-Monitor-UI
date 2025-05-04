"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface ThemeWrapperProps {
  children: React.ReactNode
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Determine user role based on URL path
    if (pathname.includes("/admin")) {
      setUserRole("admin")
    } else if (pathname.includes("/supervisor")) {
      setUserRole("supervisor")
    } else if (pathname.includes("/parent")) {
      setUserRole("parent")
    } else if (pathname.includes("/driver")) {
      setUserRole("driver")
    } else {
      setUserRole(null)
    }
  }, [pathname])

  return (
    <div data-theme={userRole}>
      {userRole && <div className={`role-indicator role-indicator-${userRole}`} />}
      {children}
    </div>
  )
}
