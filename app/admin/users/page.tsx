"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Filter, Download, Eye, Pencil } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UsersPage() {
  const { toast } = useToast()
  const [usersData, setUsersData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch users
    // Example:
    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch('/api/admin/users');
    //     const data = await response.json();
    //     setUsersData(data);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load users data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchUsers();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setUsersData([
        {
          id: 1,
          name: "John Smith",
          email: "john.admin@example.com",
          role: "admin",
          status: "active",
          lastLogin: "2023-05-10 14:30:22",
        },
        {
          id: 2,
          name: "Sarah Williams",
          email: "sarah.supervisor@example.com",
          role: "supervisor",
          status: "active",
          lastLogin: "2023-05-09 09:15:45",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael.driver@example.com",
          role: "driver",
          status: "active",
          lastLogin: "2023-05-10 07:45:12",
        },
        {
          id: 4,
          name: "Jessica Taylor",
          email: "jessica.driver@example.com",
          role: "driver",
          status: "active",
          lastLogin: "2023-05-10 08:10:33",
        },
        {
          id: 5,
          name: "David Johnson",
          email: "david.parent@example.com",
          role: "parent",
          status: "active",
          lastLogin: "2023-05-08 18:22:10",
        },
        {
          id: 6,
          name: "Emily Davis",
          email: "emily.parent@example.com",
          role: "parent",
          status: "inactive",
          lastLogin: "2023-04-25 11:30:45",
        },
        {
          id: 7,
          name: "Robert Wilson",
          email: "robert.driver@example.com",
          role: "driver",
          status: "active",
          lastLogin: "2023-05-09 06:55:18",
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleDeleteUser = (userId: number) => {
    // API INTEGRATION POINT: Delete user
    // Example:
    // const deleteUser = async () => {
    //   try {
    //     await fetch(`/api/admin/users/${userId}`, {
    //       method: 'DELETE'
    //     });
    //     setUsersData(prev => prev.filter(user => user.id !== userId));
    //     toast({
    //       title: "User Deleted",
    //       description: "The user has been deleted successfully.",
    //     });
    //   } catch (error) {
    //     console.error('Error deleting user:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to delete user. Please try again.",
    //     });
    //   }
    // };
    // deleteUser();

    // Update local state
    setUsersData((prev) => prev.filter((user) => user.id !== userId))

    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    })
  }

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter ? user.role === roleFilter : true

    return matchesSearch && matchesRole
  })

  const getUserRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>
      case "supervisor":
        return <Badge className="bg-purple-500">Supervisor</Badge>
      case "driver":
        return <Badge className="bg-blue-500">Driver</Badge>
      case "parent":
        return <Badge className="bg-green-500">Parent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUserStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <DropdownMenuItem onClick={() => setRoleFilter(null)}>All Roles</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("admin")}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("supervisor")}>Supervisor</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("driver")}>Driver</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("parent")}>Parent</DropdownMenuItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getUserRoleBadge(user.role)}</TableCell>
                      <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/users/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
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
