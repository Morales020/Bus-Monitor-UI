"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api-service"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError("") // Clear any previous errors

    try {
      // Extract role from username (format: name.role)
      const usernameParts = username.split(".")

      if (usernameParts.length !== 2) {
        setPassword("") // Clear password on error
        setError("Username should be in the format 'name.role' (e.g., john.admin)")
        return
      }

      const role = usernameParts[1].toLowerCase()

      // Validate role
      if (!["admin", "supervisor", "driver", "parent"].includes(role)) {
        setPassword("") // Clear password on error
        setError("Invalid role. Role must be admin, supervisor, driver, or parent")
        return
      }

      const response = await authApi.login({
        username: username,
        password,
        role
      })

      // Store user info for the session
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username,
          role: role,
          token: response.token
        })
      )

      toast({
        title: "Login successful",
        description: `Welcome back, ${usernameParts[0]}!`,
      })

      // Redirect based on role
      router.push(`/${role}/dashboard`)
    } catch (error: any) {
      setPassword("") // Clear password on error

      // Handle specific error cases
      let errorMessage = "Please check your credentials and try again."

      if (error.message) {
        errorMessage = error.message
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid username or password. Please try again."
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied. Please check your role and try again."
      } else if (error.response?.status === 404) {
        errorMessage = "User not found. Please check your username and try again."
      }

      setError(errorMessage)
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
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError("") // Clear error when user types
                }}
                placeholder="username.role (e.g., john.admin)"
                required
                className={error ? "border-red-500" : ""}
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
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("") // Clear error when user types
                }}
                required
                className={error ? "border-red-500" : ""}
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
