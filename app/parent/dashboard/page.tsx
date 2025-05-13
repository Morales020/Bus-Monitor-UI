"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, AlertTriangle, MessageSquare } from "lucide-react"
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
import BusTrackingMap from "@/components/bus-tracking-map"

export default function ParentDashboard() {
  const { toast } = useToast()
  const [childrenData, setChildrenData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch parent dashboard data
    // Example:
    // const fetchChildrenData = async () => {
    //   try {
    //     const response = await fetch('/api/parent/children');
    //     const data = await response.json();
    //     setChildrenData(data);
    //   } catch (error) {
    //     console.error('Error fetching children data:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load children data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchChildrenData();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setChildrenData([
        {
          id: 1,
          name: "Emma Johnson",
          grade: "5th Grade",
          busNumber: "Bus 42",
          status: "on-bus",
          estimatedArrival: "3:45 PM",
          lastLocation: "Main St & 5th Ave",
          supervisor: "Sarah Williams",
        },
        {
          id: 2,
          name: "Noah Johnson",
          grade: "3rd Grade",
          busNumber: "Bus 37",
          status: "at-school",
          estimatedArrival: "4:15 PM",
          lastLocation: "School",
          supervisor: "Michael Brown",
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleReportAbsence = (childId: number, reason: string) => {
    // API INTEGRATION POINT: Report child absence
    // Example:
    // const reportAbsence = async () => {
    //   try {
    //     await fetch('/api/parent/report-absence', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ childId, reason })
    //     });
    //   } catch (error) {
    //     console.error('Error reporting absence:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to report absence. Please try again.",
    //     });
    //     return;
    //   }
    // };
    // reportAbsence();

    toast({
      title: "Absence Reported",
      description: "The school has been notified of your child's absence.",
    })
  }

  const handleContactSupervisor = (supervisorName: string, message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the supervisor.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-bus":
        return <Badge className="bg-green-500">On Bus</Badge>
      case "at-school":
        return <Badge className="bg-blue-500">At School</Badge>
      case "dropped-off":
        return <Badge className="bg-purple-500">Dropped Off</Badge>
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
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>

      <Tabs defaultValue="tracking" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="tracking">Bus Tracking</TabsTrigger>
          <TabsTrigger value="children">My Children</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle>Live Bus Tracking</CardTitle>
                  <CardDescription>Track your children's buses in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <BusTrackingMap />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {childrenData.map((child) => (
                <Card key={child.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{child.name}</CardTitle>
                        <CardDescription>
                          {child.grade} • {child.busNumber}
                        </CardDescription>
                      </div>
                      {getStatusBadge(child.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>ETA: {child.estimatedArrival}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Last seen: {child.lastLocation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="children">
          <div className="grid gap-6 md:grid-cols-2">
            {childrenData.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={child.name} />
                      <AvatarFallback>
                        {child.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>
                        {child.grade} • {child.busNumber}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Status</p>
                        <div>{getStatusBadge(child.status)}</div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Supervisor</p>
                        <p className="text-sm">{child.supervisor}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Recent Activity</p>
                      <ul className="text-sm space-y-1">
                        <li className="text-muted-foreground">Boarded bus at 3:05 PM</li>
                        <li className="text-muted-foreground">Left school at 3:10 PM</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Report Absence
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report Absence for {child.name}</DialogTitle>
                        <DialogDescription>Please provide a reason for your child's absence.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="absence-reason">Reason for absence</Label>
                          <Textarea
                            id="absence-reason"
                            placeholder="Please explain why your child will be absent..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleReportAbsence(child.id, "Sick")}>
                          Submit Report
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communication">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Supervisor</CardTitle>
                <CardDescription>Send a message to your child's bus supervisor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="select-child">Select Child</Label>
                    <select id="select-child" className="w-full p-2 border rounded-md">
                      {childrenData.map((child) => (
                        <option key={child.id} value={child.id}>
                          {child.name} - {child.busNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleContactSupervisor("Sarah Williams", "Message")}>
                  Send Message
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>Your recent messages with supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Sarah Williams (Bus 42)</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 4:15 PM</p>
                      </div>
                      <Badge variant="outline">Supervisor</Badge>
                    </div>
                    <p className="text-sm">
                      Emma was safely dropped off at the bus stop. She left her water bottle on the bus, but we'll keep
                      it for her to collect tomorrow.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">You</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 3:30 PM</p>
                      </div>
                      <Badge variant="outline">Parent</Badge>
                    </div>
                    <p className="text-sm">
                      Will Emma be dropped off at the usual stop today? There's construction on Main Street.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
