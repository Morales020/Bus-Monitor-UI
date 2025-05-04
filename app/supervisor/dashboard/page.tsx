"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Star, User, AlertCircle, Clock } from "lucide-react"
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
import Link from "next/link"

export default function SupervisorDashboard() {
  const { toast } = useToast()
  const [tripsData, setTripsData] = useState<any[]>([])
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalStudents: 0,
    absentStudents: 0,
    activeTrips: 0,
    pendingReports: 0,
  })

  useEffect(() => {
    // API INTEGRATION POINT: Fetch supervisor dashboard data
    // Example:
    // const fetchDashboardData = async () => {
    //   try {
    //     const tripsResponse = await fetch('/api/supervisor/trips');
    //     const tripsData = await tripsResponse.json();
    //     setTripsData(tripsData);
    //
    //     const studentsResponse = await fetch('/api/supervisor/students');
    //     const studentsData = await studentsResponse.json();
    //     setStudentsData(studentsData);
    //
    //     const statsResponse = await fetch('/api/supervisor/stats');
    //     const statsData = await statsResponse.json();
    //     setStats(statsData);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load dashboard data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchDashboardData();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setTripsData([
        {
          id: 1,
          busNumber: "Bus 42",
          route: "North Route",
          driver: "Michael Brown",
          status: "active",
          lastLocation: "Main St & 5th Ave",
          lastUpdated: "2 mins ago",
          students: 15,
        },
        {
          id: 2,
          busNumber: "Bus 37",
          route: "South Route",
          driver: "Jessica Taylor",
          status: "active",
          lastLocation: "Oak Park",
          lastUpdated: "5 mins ago",
          students: 18,
        },
      ])

      setStudentsData([
        {
          id: 1,
          name: "Emma Johnson",
          grade: "5th Grade",
          busNumber: "Bus 42",
          parent: "John Johnson",
          status: "on-bus",
          behavior: "excellent",
        },
        {
          id: 2,
          name: "Liam Smith",
          grade: "4th Grade",
          busNumber: "Bus 37",
          parent: "Sarah Smith",
          status: "at-school",
          behavior: "good",
        },
        {
          id: 3,
          name: "Olivia Davis",
          grade: "5th Grade",
          busNumber: "Bus 37",
          parent: "Michael Davis",
          status: "at-school",
          behavior: "needs-improvement",
        },
        {
          id: 4,
          name: "Noah Wilson",
          grade: "3rd Grade",
          busNumber: "Bus 23",
          parent: "Jennifer Wilson",
          status: "absent",
          behavior: "good",
        },
        {
          id: 5,
          name: "Ava Brown",
          grade: "4th Grade",
          busNumber: "Bus 23",
          parent: "David Brown",
          status: "on-bus",
          behavior: "excellent",
        },
      ])

      setStats({
        totalStudents: 35,
        absentStudents: 3,
        activeTrips: 2,
        pendingReports: 2,
      })

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRateStudent = (studentId: number, rating: string, notes: string) => {
    // API INTEGRATION POINT: Rate student
    // Example:
    // const rateStudent = async () => {
    //   try {
    //     await fetch(`/api/supervisor/students/${studentId}/rate`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ rating, notes })
    //     });
    //   } catch (error) {
    //     console.error('Error rating student:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to rate student. Please try again.",
    //     });
    //     return;
    //   }
    // };
    // rateStudent();

    // Update local state
    setStudentsData((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, behavior: rating } : student)),
    )

    toast({
      title: "Student Rated",
      description: "The student has been rated successfully.",
    })
  }

  const handleRecordAbsence = (studentId: number, reason: string) => {
    // Update local state
    setStudentsData((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, status: "absent" } : student)),
    )

    // Update stats
    setStats((prev) => ({
      ...prev,
      absentStudents: prev.absentStudents + 1,
    }))

    toast({
      title: "Absence Recorded",
      description: "The student's absence has been recorded.",
    })
  }

  const handleContactParent = (parentName: string, message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the parent.",
    })
  }

  const handleContactDriver = (driverId: number, message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the driver.",
    })
  }

  const getStudentBehaviorBadge = (behavior: string) => {
    switch (behavior) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-500">Good</Badge>
      case "needs-improvement":
        return <Badge variant="destructive">Needs Improvement</Badge>
      default:
        return <Badge variant="outline">Not Rated</Badge>
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
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Supervisor Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/supervisor/students">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  View All Students
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Students</p>
                <p className="text-3xl font-bold">{stats.absentStudents}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                View Absences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Trips</p>
                <p className="text-3xl font-bold">{stats.activeTrips}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/supervisor/trips">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  View Trips
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                <p className="text-3xl font-bold">{stats.pendingReports}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="trips">Active Trips</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentsData.slice(0, 6).map((student) => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>
                        {student.grade} • {student.busNumber}
                      </CardDescription>
                    </div>
                    {getStudentBehaviorBadge(student.behavior)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Parent: {student.parent}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Badge variant={student.status === "absent" ? "destructive" : "outline"}>
                        {student.status === "absent" ? "Absent" : "Present"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Star className="mr-2 h-4 w-4" />
                        Rate Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rate {student.name}</DialogTitle>
                        <DialogDescription>Rate the student's behavior during bus transportation.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="behavior-rating">Behavior Rating</Label>
                          <select id="behavior-rating" className="w-full p-2 border rounded-md">
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="needs-improvement">Needs Improvement</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rating-notes">Notes</Label>
                          <Textarea
                            id="rating-notes"
                            placeholder="Add any additional notes about the student's behavior..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleRateStudent(student.id, "excellent", "Great behavior")}
                        >
                          Submit Rating
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Parent
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {student.parent}</DialogTitle>
                        <DialogDescription>Send a message to the parent of {student.name}.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="parent-message">Message</Label>
                          <Textarea
                            id="parent-message"
                            placeholder="Type your message here..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleContactParent(student.parent, "Message")}>
                          Send Message
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trips">
          <div className="grid gap-6">
            {tripsData.map((trip) => (
              <Card key={trip.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {trip.busNumber} - {trip.route}
                      </CardTitle>
                      <CardDescription>Driver: {trip.driver}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-2xl font-bold">{trip.students}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Last Location</p>
                      <p className="text-sm">{trip.lastLocation}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm">{trip.lastUpdated}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Trip Details
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Driver
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
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>Your recent messages with parents and drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">John Johnson (Parent)</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 4:15 PM</p>
                      </div>
                      <Badge variant="outline">Parent</Badge>
                    </div>
                    <p className="text-sm">
                      Thank you for letting me know about Emma's excellent behavior on the bus this week.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Michael Brown (Driver)</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 3:30 PM</p>
                      </div>
                      <Badge variant="outline">Driver</Badge>
                    </div>
                    <p className="text-sm">We'll be arriving about 10 minutes late due to traffic on Main Street.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">You</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 3:15 PM</p>
                      </div>
                      <Badge variant="outline">Supervisor</Badge>
                    </div>
                    <p className="text-sm">Please let me know if there are any issues with the new route today.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Messages
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Absence Management</CardTitle>
                <CardDescription>Record student absences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-select">Select Student</Label>
                    <select id="student-select" className="w-full p-2 border rounded-md">
                      {studentsData.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} - {student.busNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="absence-reason">Reason for Absence</Label>
                    <Textarea
                      id="absence-reason"
                      placeholder="Enter the reason for the student's absence..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleRecordAbsence(1, "Sick")}>
                  Record Absence
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
