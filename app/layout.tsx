import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeWrapper from "@/components/theme-wrapper"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bus Monitoring System",
  description: "Track and monitor school buses in real-time",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeWrapper>
            <div className="min-h-screen flex flex-col">
              {/* Navbar will be rendered inside each page that needs it */}
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
