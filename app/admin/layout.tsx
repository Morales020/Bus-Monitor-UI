"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for authentication
    const user = localStorage.getItem('user')
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to access the admin area.",
      })
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(user)
      if (!userData.token || userData.role !== 'admin') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access the admin area.",
        })
        router.push('/login')
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please log in again.",
      })
      router.push('/login')
    }
  }, [router, toast])

  return (
    <>
      <Navbar userRole="admin" />
      {children}
    </>
  )
}
