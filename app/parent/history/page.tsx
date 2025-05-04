"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TripHistoryPage() {
  const { toast } = useToast()
  const [tripsData, setTripsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [childFilter, setChildFilter] = useState<string | null>(null)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch trip history
    // Example:
    // const fetchTripHistory = async () => {
    //   try {
    //     const response = await fetch('/api/parent/trip-history');
    //     const data = await response.json();
    //     setTripsData(data);
    //   } catch (error) {
    //     console.error('Error fetching trip history:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load trip history. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchTripHistory();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setTripsData([
        {
          id: 1,
          date: "2023-05-10",
          childName: "Emma Johnson",
          busNumber: "Bus 42",
          route: "North Route",
          pickupTime: "3:05 PM",
          dropoffTime: "3:45 PM",
          status: "completed",
        },
        {
          id: 2,
          date: "2023-05-09",
          childName: "Emma Johnson",
          busNumber: "Bus 42",
          route: "North Route",
          pickupTime: "3:05 PM",
          dropoffTime: "3:50 PM",
          status: "completed",
        },
        {
          id: 3,
          date: "2023-05-08",
          childName: "Emma Johnson",
          busNumber: "Bus 42",
          route: "North Route",
          pickupTime: "3:05 PM",
          dropoffTime: "3:40 PM",
          status: "completed",
        },
        {
          id: 4,
          date: "2023-05-10",
          childName: "Noah Johnson",
          busNumber: "Bus 37",
          route: "South Route",
          pickupTime: "3:05 PM",
          dropoffTime: "4:15 PM",
          status: "completed",
        },
        {
          id: 5,
          date: "2023-05-09",
          childName: "Noah Johnson",
          busNumber: "Bus 37",
          route: "South Route",
          pickupTime: "3:05 PM",
          dropoffTime: "4:10 PM",
          status: "completed",
        },
        {
          id: 6,
          date: "2023-05-08",
          childName: "Noah Johnson",
          busNumber: "Bus 37",
          route: "South Route",
          pickupTime: "3:05 PM",
          dropoffTime: "4:20 PM",
          status: "completed",
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearch =
      trip.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.childName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesChild = childFilter ? trip.childName === childFilter : true

    return matchesSearch && matchesChild
  })

  const getTripStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "delayed":
        return <Badge className="bg-yellow-500">Delayed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUniqueChildren = () => {
    const children = tripsData.map((trip) => trip.childName)
    return [...new Set(children)]
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading trip history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trip History</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trip History</CardTitle>
          <CardDescription>View your children's past bus trips</CardDescription>
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
                  {childFilter ? `Child: ${childFilter}` : "Filter by Child"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setChildFilter(null)}>All Children</DropdownMenuItem>
                {getUniqueChildren().map((child) => (
                  <DropdownMenuItem key={child} onClick={() => setChildFilter(child)}>
                    {child}
                  </DropdownMenuItem>
                ))}
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
                  <TableHead>Date</TableHead>
                  <TableHead>Child</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Dropoff</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.date}</TableCell>
                      <TableCell>{trip.childName}</TableCell>
                      <TableCell>{trip.busNumber}</TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>{trip.pickupTime}</TableCell>
                      <TableCell>{trip.dropoffTime}</TableCell>
                      <TableCell>{getTripStatusBadge(trip.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
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
