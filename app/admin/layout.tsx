import type React from "react"
import Navbar from "@/components/navbar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar userRole="admin" />
      {children}
    </>
  )
}
