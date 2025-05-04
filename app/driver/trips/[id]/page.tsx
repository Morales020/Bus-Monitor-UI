"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import BusTrackingMap from "@/components/bus-tracking-map"

export default function TripDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [tripData, setTripData] = useState<any | null>(null)
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tripStatus, setTripStatus] = useState("in-progress")

  const tripId = Number(params.id)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch trip details
    // Example:
    // const fetchTripData = async () => {
    //   try {
    //     const tripResponse = await fetch(`/api/driver/trips/${tripId}`);
    //     const tripData = await tripResponse.json();
    //     setTripData(tripData);
    //     setTripStatus(tripData.status);
    //
    //     const studentsResponse = await fetch(`/api/driver/trips/${tripId}/students`);
    //     const studentsData = await studentsResponse.json();
    //     setStudentsData(studentsData);
    //   } catch (error) {
    //     console.error('Error fetching trip data:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load trip data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchTripData();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock trip data
      setTripData({
        id: tripId,
        busNumber: "Bus 42",
        route: "North Route",
        driver: "Michael Brown",
        supervisor: "Sarah Williams",
        supervisorContact: "555-987-6543",
        date: "2023-05-10",
        startTime: "3:00 PM",
        endTime: "4:30 PM",
        status: "in-progress",
        lastLocation: "Main St & 5th Ave",
        lastUpdated: "2 mins ago",
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
      ])

      setTripStatus("in-progress")
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [tripId, toast])

  const handleStartTrip = async () => {
    // API INTEGRATION POINT: Start trip
    // Example:
    // try {
    //   await fetch(`/api/driver/trips/${tripId}/start`, {
    //     method: 'POST'
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
    //   await fetch(`/api/driver/trips/${tripId}/end`, {
    //     method: 'POST'
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
    //   await fetch(`/api/driver/trips/${tripId}/delay`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ reason, estimatedDelay })
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
    //   await fetch(`/api/driver/notify-supervisor`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ tripId, message })
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
          <p className="mt-4 text-lg">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (!tripData) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trip Not Found</h1>
          <p className="mb-6">The trip you are looking for does not exist or has been deleted.</p>
          <Link href="/driver/trips">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trips
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/driver/trips">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Trip Details</h1>
          <Badge className="bg-green-500">Active</Badge>
        </div>
        <div className="flex gap-2">
          {tripStatus === "not-started" && <Button onClick={handleStartTrip}>Start Trip</Button>}
          {tripStatus === "in-progress" && <Button onClick={handleEndTrip}>End Trip</Button>}
          {tripStatus === "completed" && <Badge className="bg-green-500">Completed</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip Information</CardTitle>
            <CardDescription>Basic trip details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Bus Number</p>
                  <p className="font-medium">{tripData.busNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Route</p>
                  <p className="font-medium">{tripData.route}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="font-medium">{tripData.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {tripData.startTime} - {tripData.endTime}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Supervisor</p>
                <p className="font-medium">{tripData.supervisor}</p>
                <p className="text-sm text-muted-foreground">Contact: {tripData.supervisorContact}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Last Location</p>
                <p className="font-medium">{tripData.lastLocation}</p>
                <p className="text-sm text-muted-foreground">Updated: {tripData.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Bus Tracking</CardTitle>
              <CardDescription>Track your bus in real-time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <BusTrackingMap />
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="stops">
        <TabsList className="mb-4">
          <TabsTrigger value="stops">Stops</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="map">Route Map</TabsTrigger>
        </TabsList>

        <TabsContent value="stops">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trip Stops</CardTitle>
                <CardDescription>Scheduled stops for this trip</CardDescription>
              </div>
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
            </CardHeader>
            <CardContent>
              {tripData.stops && tripData.stops.length > 0 ? (
                <div className="space-y-2">
                  {tripData.stops.map((stop: any, index: number) => (
                    <div key={stop.id} className="flex items-center p-3 border rounded-md">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{stop.name}</p>
                        <p className="text-sm text-muted-foreground">{stop.time}</p>
                      </div>
                      {getStopStatusBadge(stop.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No stops defined for this trip</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students on Trip</CardTitle>
              <CardDescription>Students assigned to this trip</CardDescription>
            </CardHeader>
            <CardContent>
              {studentsData && studentsData.length > 0 ? (
                <div className="space-y-4">
                  {studentsData.map((student: any) => (
                    <div key={student.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} • {student.stop}
                          </p>
                          <p className="text-xs text-muted-foreground">Address: {student.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">{getStudentStatusBadge(student.status)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No students assigned to this trip</p>
                </div>
              )}
            </CardContent>
          </Card>
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

      <div className="mt-6">
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
              <DialogDescription>Send a message to your supervisor about any issues or updates.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="supervisor-message">Message</Label>
                <Textarea id="supervisor-message" placeholder="Type your message here..." className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleNotifySupervisor("Message")}>
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
