import type React from "react"
import Navbar from "@/components/navbar"

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar userRole="driver" />
      {children}
    </>
  )
}
