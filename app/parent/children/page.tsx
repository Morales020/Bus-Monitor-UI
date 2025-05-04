"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, MessageSquare, Clock, MapPin } from "lucide-react"
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

export default function ChildrenPage() {
  const { toast } = useToast()
  const [childrenData, setChildrenData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch children data
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
          school: "Lincoln Elementary School",
          busNumber: "Bus 42",
          route: "North Route",
          supervisor: "Sarah Williams",
          supervisorContact: "555-987-6543",
          status: "on-bus",
          estimatedArrival: "3:45 PM",
          lastLocation: "Main St & 5th Ave",
          recentActivity: [
            { id: 1, action: "Boarded bus", time: "3:05 PM", date: "2023-05-10" },
            { id: 2, action: "Left school", time: "3:10 PM", date: "2023-05-10" },
          ],
        },
        {
          id: 2,
          name: "Noah Johnson",
          grade: "3rd Grade",
          school: "Lincoln Elementary School",
          busNumber: "Bus 37",
          route: "South Route",
          supervisor: "Michael Brown",
          supervisorContact: "555-876-5432",
          status: "at-school",
          estimatedArrival: "4:15 PM",
          lastLocation: "School",
          recentActivity: [
            { id: 1, action: "Arrived at school", time: "8:00 AM", date: "2023-05-10" },
            { id: 2, action: "Checked in at classroom", time: "8:10 AM", date: "2023-05-10" },
          ],
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleReportAbsence = (childId: number, reason: string) => {
    // API INTEGRATION POINT: Report absence
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
    // API INTEGRATION POINT: Contact supervisor
    // Example:
    // const contactSupervisor = async () => {
    //   try {
    //     await fetch('/api/parent/contact-supervisor', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ supervisorName, message })
    //     });
    //   } catch (error) {
    //     console.error('Error contacting supervisor:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to send message. Please try again.",
    //     });
    //     return;
    //   }
    // };
    // contactSupervisor();

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
          <p className="mt-4 text-lg">Loading children data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">My Children</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {childrenData.map((child) => (
          <Card key={child.id} className="overflow-hidden">
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
                <div className="flex-1">
                  <div className="flex justify-between">
                    <CardTitle>{child.name}</CardTitle>
                    {getStatusBadge(child.status)}
                  </div>
                  <CardDescription>
                    {child.grade} • {child.school}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Bus Assignment</p>
                    <p className="text-sm">
                      {child.busNumber} - {child.route}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Supervisor</p>
                    <p className="text-sm">{child.supervisor}</p>
                  </div>
                </div>

                {child.status === "on-bus" && (
                  <div className="space-y-2 bg-muted p-3 rounded-md">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>ETA: {child.estimatedArrival}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Last seen: {child.lastLocation}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium">Recent Activity</p>
                  <ul className="text-sm space-y-1">
                    {child.recentActivity.map((activity: any) => (
                      <li key={activity.id} className="text-muted-foreground">
                        {activity.action} at {activity.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Supervisor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Supervisor</DialogTitle>
                    <DialogDescription>
                      Send a message to {child.supervisor}, the supervisor for {child.busNumber}.
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
                    <Button type="submit" onClick={() => handleContactSupervisor(child.supervisor, "Message")}>
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
