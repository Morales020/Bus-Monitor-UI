import type React from "react"
import Navbar from "@/components/navbar"

export default function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar userRole="parent" />
      {children}
    </>
  )
}
