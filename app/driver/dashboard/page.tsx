"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MessageSquare, RotateCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
import { Input } from "@/components/ui/input"
import BusTrackingMap from "@/components/bus-tracking-map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DriverDashboard() {
  const { toast } = useToast()
  const [tripData, setTripData] = useState<any | null>(null)
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tripStatus, setTripStatus] = useState("not-started")

  useEffect(() => {
    // API INTEGRATION POINT: Fetch driver dashboard data
    // Example:
    // const fetchDriverData = async () => {
    //   try {
    //     const tripResponse = await fetch('/api/driver/current-trip');
    //     const tripData = await tripResponse.json();
    //     setTripData(tripData);
    //     setTripStatus(tripData.status);
    //
    //     const studentsResponse = await fetch('/api/driver/students');
    //     const studentsData = await studentsResponse.json();
    //     setStudentsData(studentsData);
    //   } catch (error) {
    //     console.error('Error fetching driver data:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load driver data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchDriverData();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock trip data
      setTripData({
        id: 1,
        busNumber: "Bus 42",
        route: "North Route",
        startTime: "3:00 PM",
        estimatedEndTime: "4:30 PM",
        stops: [
          { id: 1, name: "Lincoln Elementary School", time: "3:00 PM", status: "completed" },
          { id: 2, name: "Main St & 5th Ave", time: "3:15 PM", status: "current" },
          { id: 3, name: "Oak Park", time: "3:30 PM", status: "pending" },
          { id: 4, name: "Westside Community Center", time: "3:45 PM", status: "pending" },
          { id: 5, name: "Hillcrest Apartments", time: "4:00 PM", status: "pending" },
          { id: 6, name: "Maple Drive & Cedar Lane", time: "4:15 PM", status: "pending" },
          { id: 7, name: "Riverside Estates", time: "4:30 PM", status: "pending" },
        ],
      })

      // Mock students data
      setStudentsData([
        {
          id: 1,
          name: "Emma Johnson",
          grade: "5th Grade",
          stop: "Main St & 5th Ave",
          status: "on-bus",
          parent: "John Johnson",
          parentContact: "555-123-4567",
          address: "123 Main St, Anytown, USA",
        },
        {
          id: 2,
          name: "Liam Smith",
          grade: "4th Grade",
          stop: "Oak Park",
          status: "waiting",
          parent: "Sarah Smith",
          parentContact: "555-234-5678",
          address: "456 Oak Ave, Anytown, USA",
        },
        {
          id: 3,
          name: "Olivia Davis",
          grade: "5th Grade",
          stop: "Westside Community Center",
          status: "waiting",
          parent: "Michael Davis",
          parentContact: "555-345-6789",
          address: "789 Pine St, Anytown, USA",
        },
        {
          id: 4,
          name: "Noah Wilson",
          grade: "3rd Grade",
          stop: "Hillcrest Apartments",
          status: "waiting",
          parent: "Jennifer Wilson",
          parentContact: "555-456-7890",
          address: "101 Maple Dr, Anytown, USA",
        },
        {
          id: 5,
          name: "Ava Brown",
          grade: "4th Grade",
          stop: "Maple Drive & Cedar Lane",
          status: "waiting",
          parent: "David Brown",
          parentContact: "555-567-8901",
          address: "202 Cedar Ln, Anytown, USA",
        },
        {
          id: 6,
          name: "Sophia Miller",
          grade: "5th Grade",
          stop: "Riverside Estates",
          status: "waiting",
          parent: "Robert Miller",
          parentContact: "555-678-9012",
          address: "303 Birch Rd, Anytown, USA",
        },
      ])

      setTripStatus("in-progress")
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  // Add API integration point for starting trip
  const handleStartTrip = async () => {
    // API INTEGRATION POINT: Start trip
    // Example:
    // try {
    //   await fetch('/api/driver/start-trip', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tripId: tripData.id })
    //   });
    // } catch (error) {
    //   console.error('Error starting trip:', error);
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to start trip. Please try again.",
    //   });
    //   return;
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTripStatus("in-progress")
    toast({
      title: "Trip Started",
      description: "Your trip has been started successfully.",
    })
  }

  const handleEndTrip = async () => {
    // API INTEGRATION POINT: End trip
    // Example:
    // try {
    //   await fetch('/api/driver/end-trip', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tripId: tripData.id })
    //   });
    // } catch (error) {
    //   console.error('Error ending trip:', error);
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to end trip. Please try again.",
    //   });
    //   return;
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTripStatus("completed")
    toast({
      title: "Trip Completed",
      description: "Your trip has been completed successfully.",
    })
  }

  const handleReportDelay = async (reason: string, estimatedDelay: string) => {
    // API INTEGRATION POINT: Report delay
    // Example:
    // try {
    //   await fetch('/api/driver/report-delay', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tripId: tripData.id, reason, estimatedDelay })
    //   });
    // } catch (error) {
    //   console.error('Error reporting delay:', error);
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to report delay. Please try again.",
    //   });
    //   return;
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Delay Reported",
      description: "The delay has been reported successfully.",
    })
  }

  const handleNotifySupervisor = async (message: string) => {
    // API INTEGRATION POINT: Notify supervisor
    // Example:
    // try {
    //   await fetch('/api/driver/notify-supervisor', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tripId: tripData.id, message })
    //   });
    // } catch (error) {
    //   console.error('Error notifying supervisor:', error);
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to send message. Please try again.",
    //   });
    //   return;
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Supervisor Notified",
      description: "Your message has been sent to the supervisor.",
    })
  }

  const getStopStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "current":
        return <Badge className="bg-blue-500">Current</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStudentStatusBadge = (status: string) => {
    switch (status) {
      case "on-bus":
        return <Badge className="bg-green-500">On Bus</Badge>
      case "dropped-off":
        return <Badge className="bg-purple-500">Dropped Off</Badge>
      case "waiting":
        return <Badge variant="outline">Waiting</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>

      <Tabs defaultValue="trip">
        <TabsList className="mb-4">
          <TabsTrigger value="trip">Current Trip</TabsTrigger>
          <TabsTrigger value="map">Route Map</TabsTrigger>
        </TabsList>

        <TabsContent value="trip">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {tripData.busNumber} - {tripData.route}
                    </CardTitle>
                    <CardDescription>
                      {tripData.startTime} - {tripData.estimatedEndTime}
                    </CardDescription>
                  </div>
                  {tripStatus === "not-started" && <Button onClick={handleStartTrip}>Start Trip</Button>}
                  {tripStatus === "in-progress" && <Button onClick={handleEndTrip}>End Trip</Button>}
                  {tripStatus === "completed" && <Badge className="bg-green-500">Completed</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Stops</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Report Delay
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Report Delay</DialogTitle>
                          <DialogDescription>Please provide details about the delay.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="delay-reason">Reason for delay</Label>
                            <Textarea
                              id="delay-reason"
                              placeholder="Traffic, weather, mechanical issue, etc."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="estimated-delay">Estimated delay (minutes)</Label>
                            <Input id="estimated-delay" type="number" min="1" defaultValue="15" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => handleReportDelay("Traffic congestion", "15")}>
                            Submit Report
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-2">
                    {tripData.stops.map((stop: any, idx: number) => (
                      <div key={stop.id} className="flex justify-between items-center p-3 border rounded-md gap-4">
                        <div>
                          <p className="font-medium">{stop.name}</p>
                          <p className="text-sm text-muted-foreground">{stop.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStopStatusBadge(stop.status)}
                          <Select
                            value={stop.status}
                            onValueChange={async (newStatus) => {
                              // Simulate API call
                              await new Promise((resolve) => setTimeout(resolve, 500));
                              const updatedStops = tripData.stops.map((s: any, i: number) =>
                                i === idx ? { ...s, status: newStatus } : s
                              );
                              setTripData({ ...tripData, stops: updatedStops });
                              toast({
                                title: "Stop Status Updated",
                                description: `${stop.name} status changed to ${newStatus}.`,
                              });
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="current">Current</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Notify Supervisor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Notify Supervisor</DialogTitle>
                      <DialogDescription>
                        Send a message to your supervisor about any issues or updates.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-message">Message</Label>
                        <Textarea
                          id="supervisor-message"
                          placeholder="Type your message here..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => handleNotifySupervisor("Message")}>
                        Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="ghost" onClick={() => window.location.reload()}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>View your current route and location</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <BusTrackingMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
