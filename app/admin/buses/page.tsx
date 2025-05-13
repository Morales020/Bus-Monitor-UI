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

export default function BusesPage() {
  const { toast } = useToast()
  const [busesData, setBusesData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch buses
    // Example:
    // const fetchBuses = async () => {
    //   try {
    //     const response = await fetch('/api/admin/buses');
    //     const data = await response.json();
    //     setBusesData(data);
    //   } catch (error) {
    //     console.error('Error fetching buses:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load buses data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchBuses();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setBusesData([
        {
          id: 1,
          busNumber: "Bus 42",
          licensePlate: "ABC-1234",
          capacity: 40,
          driver: "Michael Brown",
          status: "active",
          lastMaintenance: "2023-04-15",
        },
        {
          id: 2,
          busNumber: "Bus 37",
          licensePlate: "DEF-5678",
          capacity: 35,
          driver: "Jessica Taylor",
          status: "active",
          lastMaintenance: "2023-04-20",
        },
        {
          id: 3,
          busNumber: "Bus 15",
          licensePlate: "GHI-9012",
          capacity: 40,
          driver: "Robert Wilson",
          status: "active",
          lastMaintenance: "2023-04-10",
        },
        {
          id: 4,
          busNumber: "Bus 23",
          licensePlate: "JKL-3456",
          capacity: 35,
          driver: "Unassigned",
          status: "maintenance",
          lastMaintenance: "2023-05-05",
        },
        {
          id: 5,
          busNumber: "Bus 18",
          licensePlate: "MNO-7890",
          capacity: 40,
          driver: "Thomas Anderson",
          status: "active",
          lastMaintenance: "2023-03-25",
        },
        {
          id: 6,
          busNumber: "Bus 29",
          licensePlate: "PQR-1234",
          capacity: 30,
          driver: "Unassigned",
          status: "inactive",
          lastMaintenance: "2023-02-15",
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleDeleteBus = (busId: number) => {
    // API INTEGRATION POINT: Delete bus
    // Example:
    // const deleteBus = async () => {
    //   try {
    //     await fetch(`/api/admin/buses/${busId}`, {
    //       method: 'DELETE'
    //     });
    //     setBusesData(prev => prev.filter(bus => bus.id !== busId));
    //     toast({
    //       title: "Bus Deleted",
    //       description: "The bus has been deleted successfully.",
    //     });
    //   } catch (error) {
    //     console.error('Error deleting bus:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to delete bus. Please try again.",
    //     });
    //   }
    // };
    // deleteBus();

    // Update local state
    setBusesData((prev) => prev.filter((bus) => bus.id !== busId))

    toast({
      title: "Bus Deleted",
      description: "The bus has been deleted successfully.",
    })
  }

  const filteredBuses = busesData.filter((bus) => {
    const matchesSearch =
      bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bus.driver && bus.driver.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter ? bus.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getBusStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading buses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Buses Management</h1>
        <Link href="/admin/buses/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Bus
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bus List</CardTitle>
          <CardDescription>Manage all buses in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search buses..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>Maintenance</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
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
                  <TableHead>Bus Number</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium">{bus.busNumber}</TableCell>
                      <TableCell>{bus.licensePlate}</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>{bus.driver || "Unassigned"}</TableCell>
                      <TableCell>{getBusStatusBadge(bus.status)}</TableCell>
                      <TableCell>{bus.lastMaintenance}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <div className="flex space-x-2">
                            <Link href={`/admin/buses/${bus.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/buses/${bus.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteBus(bus.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No buses found matching your criteria
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
