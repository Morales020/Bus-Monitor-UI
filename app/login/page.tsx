"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Extract role from username (format: name.role)
      const usernameParts = username.split(".")

      if (usernameParts.length !== 2) {
        throw new Error("Username should be in the format 'name.role' (e.g., john.admin)")
      }

      const role = usernameParts[1].toLowerCase()

      // Validate role
      if (!["admin", "supervisor", "driver", "parent"].includes(role)) {
        throw new Error("Invalid role. Role must be admin, supervisor, or parent")
      }

      // In a real app, you would validate credentials with your backend here
      // API INTEGRATION POINT: Add your authentication API call here

      // Store user info for the session
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: usernameParts[0],
          role: role,
        }),
      )

      toast({
        title: "Login successful",
        description: `Welcome back, ${usernameParts[0]}!`,
      })

      // Redirect based on role
      router.push(`/${role}/dashboard`)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username.role (e.g., john.admin)"
                required
              />
              <p className="text-xs text-muted-foreground">
                Format: name.role (e.g., john.admin, sarah.supervisor, mike.driver, emma.parent)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Forgot your password?{" "}
            <a href="/reset-password" className="text-primary hover:underline">
              Reset it here
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
