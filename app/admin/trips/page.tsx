"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Filter, Download, Eye, Pencil } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/api-service"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TripsPage() {
  const { toast } = useToast()
  const [trips, setTrips] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await adminApi.getTrips()
        setTrips(data)
      } catch (error) {
        console.error("Error fetching trips:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load trips data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, [toast])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminApi.getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load users data. Please try again.",
        })
      }
    }

    fetchUsers()
  }, [toast])

  const handleDeleteTrip = async (tripId: number) => {
    try {
      await adminApi.deleteTrip(tripId)
      setTrips((prev) => prev.filter((trip) => trip.id !== tripId))
      toast({
        title: "Trip Deleted",
        description: "The trip has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting trip:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trip. Please try again.",
      })
    }
  }

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.supervisor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? trip.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getTripStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500 text-white">{status}</Badge>
      case "completed":
        return <Badge className="bg-blue-500 text-white">{status}</Badge>
      case "planned":
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white">{status}</Badge>
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>
    }
  }


  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading trips...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trips Management</h1>
        <Link href="/admin/trips/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trip List</CardTitle>
          <CardDescription>Manage all bus trips in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search trips..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("planned")}>Planned</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
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
                  <TableHead>Id</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>ArrivalTime</TableHead>
                  <TableHead>DepartureTime</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.id}</TableCell>
                      <TableCell>{getTripStatusBadge(trip.status)}</TableCell>
                      <TableCell>{trip.busNumber}</TableCell>
                      <TableCell>{trip.routeName}</TableCell>
                      <TableCell>{trip.driverName}</TableCell>
                      <TableCell>{trip.supervisorName}</TableCell>
                      <TableCell>{trip.adminName}</TableCell>
                      <TableCell>{trip.arrivalTime ?? "N/A"}</TableCell>
                      <TableCell>{trip.departureTime ?? "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <div className="flex space-x-2">
                            <Link href={`/admin/trips/${trip.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/trips/${trip.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTrip(trip.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No trips found matching your criteria
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
