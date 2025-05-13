"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, MessageSquare, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function TripsPage() {
  const { toast } = useToast()
  const [tripsData, setTripsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch trips
    // Example:
    // const fetchTrips = async () => {
    //   try {
    //     const response = await fetch('/api/supervisor/trips');
    //     const data = await response.json();
    //     setTripsData(data);
    //   } catch (error) {
    //     console.error('Error fetching trips:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load trips data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchTrips();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setTripsData([
        {
          id: 1,
          busNumber: "Bus 42",
          route: "North Route",
          driver: "Michael Brown",
          driverContact: "555-123-4567",
          date: "2023-05-10",
          startTime: "3:00 PM",
          endTime: "4:30 PM",
          status: "active",
          students: 15,
        },
        {
          id: 2,
          busNumber: "Bus 37",
          route: "South Route",
          driver: "Jessica Taylor",
          driverContact: "555-234-5678",
          date: "2023-05-10",
          startTime: "3:00 PM",
          endTime: "4:15 PM",
          status: "active",
          students: 18,
        },
        {
          id: 3,
          busNumber: "Bus 15",
          route: "East Route",
          driver: "Robert Wilson",
          driverContact: "555-345-6789",
          date: "2023-05-10",
          startTime: "3:00 PM",
          endTime: "4:45 PM",
          status: "active",
          students: 12,
        },
        {
          id: 4,
          busNumber: "Bus 42",
          route: "North Route",
          driver: "Michael Brown",
          driverContact: "555-123-4567",
          date: "2023-05-09",
          startTime: "3:00 PM",
          endTime: "4:30 PM",
          status: "completed",
          students: 15,
        },
        {
          id: 5,
          busNumber: "Bus 37",
          route: "South Route",
          driver: "Jessica Taylor",
          driverContact: "555-234-5678",
          date: "2023-05-09",
          startTime: "3:00 PM",
          endTime: "4:15 PM",
          status: "completed",
          students: 18,
        },
        {
          id: 6,
          busNumber: "Bus 15",
          route: "East Route",
          driver: "Robert Wilson",
          driverContact: "555-345-6789",
          date: "2023-05-11",
          startTime: "3:00 PM",
          endTime: "4:45 PM",
          status: "scheduled",
          students: 12,
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleContactDriver = (driverId: number, message: string) => {
    // API INTEGRATION POINT: Contact driver
    // Example:
    // const contactDriver = async () => {
    //   try {
    //     await fetch('/api/supervisor/contact-driver', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ driverId, message })
    //     });
    //   } catch (error) {
    //     console.error('Error contacting driver:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to send message. Please try again.",
    //     });
    //     return;
    //   }
    // };
    // contactDriver();

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the driver.",
    })
  }

  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearch =
      trip.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? trip.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getTripStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading trips...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trip History</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trip List</CardTitle>
          <CardDescription>View and manage all bus trips</CardDescription>
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
                <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
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
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.busNumber}</TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>{trip.driver}</TableCell>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell>
                        {trip.startTime} - {trip.endTime}
                      </TableCell>
                      <TableCell>{getTripStatusBadge(trip.status)}</TableCell>
                      <TableCell>{trip.students}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/supervisor/trips/${trip.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </Link>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Contact Driver</DialogTitle>
                                <DialogDescription>
                                  Send a message to {trip.driver}, the driver of {trip.busNumber}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="driver-message">Message</Label>
                                  <Textarea
                                    id="driver-message"
                                    placeholder="Type your message here..."
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={() => handleContactDriver(trip.id, "Message")}>
                                  Send Message
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
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
