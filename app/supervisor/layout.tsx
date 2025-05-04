import type React from "react"
import Navbar from "@/components/navbar"

export default function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar userRole="supervisor" />
      {children}
    </>
  )
}
