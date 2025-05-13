"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Filter, Download, Eye, Pencil, MoreVertical } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { adminApi } from "@/lib/api-service"

export default function UsersPage() {
  const { toast } = useToast()
  const [usersData, setUsersData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleRoleFilter = (role: string | null) => {
    setRoleFilter(role)
  }

  useEffect(() => {
    // Fetch all users once
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const data = await adminApi.getUsers()
        setUsersData(data)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load users data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [toast])

  // Client-side filtering
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      String(user.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter ? (String(user.role || "").toLowerCase() === roleFilter.toLowerCase()) : true
    return matchesSearch && matchesRole
  })

  const handleDeleteUser = (userId: number) => {
    // API INTEGRATION POINT: Delete user
    // Example:
    const deleteUser = async () => {
      try {
        await adminApi.deleteUser(userId);
        setUsersData(prev => prev.filter(user => user.id !== userId));
        toast({
          title: "User Deleted",
          description: "The user has been deleted successfully.",
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete user. Please try again.",
        });
      }
    };
    deleteUser();

    // Update local state
    setUsersData((prev) => prev.filter((user) => user.id !== userId))

    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    })
  }

  const getUserRoleBadge = (role: string) => {
    console.log('Rendering role badge for:', role); // Debug log
    switch (role?.toLowerCase()) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>
      case "supervisor":
        return <Badge className="bg-purple-500">Supervisor</Badge>
      case "driver":
        return <Badge className="bg-blue-500">Driver</Badge>
      case "parent":
        return <Badge className="bg-green-500">Parent</Badge>
      default:
        return <Badge variant="outline">{role || 'Unknown'}</Badge>
    }
  }

  const getUserStatusBadge = (IsActive: string) => {
    console.log('Rendering status badge for:', IsActive); // Debug log
    switch (IsActive?.toLowerCase()) {
      case "true":
        return <Badge className="bg-green-500">Active</Badge>
      case "false":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="outline">{IsActive || 'Unknown'}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Link href="/admin/users/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New User
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {roleFilter ? `Role: ${roleFilter}` : "Filter by Role"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleRoleFilter(null)}>All Roles</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleFilter("admin")}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleFilter("supervisor")}>Supervisor</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleFilter("driver")}>Driver</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleFilter("parent")}>Parent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{getUserRoleBadge(user.role)}</TableCell>
                      <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.phoneNumber ?? "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <div className="flex space-x-2">
                            {user.role?.toLowerCase() !== "admin" && (
                              <Link href={`/admin/users/${user.id}/edit`}>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </div>
                          {user.role?.toLowerCase() !== "admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </Button>
                          )}
                          {user.role?.toLowerCase() === "admin" && (
                            <span className="text-muted-foreground italic">Admin</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No users found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
