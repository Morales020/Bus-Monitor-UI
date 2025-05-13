"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Users, BusIcon, Calendar, AlertTriangle, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { adminApi } from "@/lib/api-service"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuses: 0,
    activeTrips: 0,
    pendingIssues: 0,
  })
  const [users, setUsers] = useState<any[]>([])
  const [trips, setTrips] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  // If you have issues API, add: const [issues, setIssues] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, tripsData] = await Promise.all([
          adminApi.getUsers(),
          adminApi.getTrips(),
        ])
        setUsers(usersData)
        setTrips(tripsData)
        // Simulate fetching students (replace with adminApi.getStudents() when available)
        setStudents([
          { id: 1, name: "Emma Johnson" },
          { id: 2, name: "Liam Smith" },
          { id: 3, name: "Olivia Davis" },
          { id: 4, name: "Noah Wilson" },
          { id: 5, name: "Ava Brown" },
          { id: 6, name: "Sophia Miller" },
        ])
        // Simulate fetching buses (replace with adminApi.getBuses() when available)
        setStats((prev) => ({
          ...prev,
          totalBuses: 6,
          pendingIssues: 3, // Set mock value for pending issues
        }))
        // setIssues(issuesData)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [toast])

  const totalUsers = users.length
  const totalTrips = trips.length
  const activeTrips = trips.filter(t => t.status?.toLowerCase() === "active").length
  const totalStudents = students.length
  // const pendingIssues = issues.length // If you have issues API

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
      <h1 className="text-3xl font-bold mb-6">Administrator Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  View All Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Buses</p>
                <p className="text-3xl font-bold">{stats.totalBuses}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <BusIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/buses">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  View All Buses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/students">
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
                <p className="text-sm font-medium text-muted-foreground">Active Trips</p>
                <p className="text-3xl font-bold">{activeTrips}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/trips">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  View All Trips
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
                <p className="text-3xl font-bold">{stats.pendingIssues}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                View Issues
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-8 mb-6">
        <div className="text-lg font-semibold">
          Total Users: <span className="text-primary">{users.length}</span>
        </div>
        <div className="text-lg font-semibold">
          Total Trips: <span className="text-primary">{trips.length}</span>
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="trips">Active Trips</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Latest actions and events in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm font-medium">New User Created</p>
                  <p className="text-xs text-muted-foreground">Admin created a new parent account - 10 mins ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm font-medium">Trip Started</p>
                  <p className="text-xs text-muted-foreground">Bus 42 started its morning route - 30 mins ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="text-sm font-medium">Delay Reported</p>
                  <p className="text-xs text-muted-foreground">Bus 37 reported a 15-minute delay - 45 mins ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm font-medium">Supervisor Assignment</p>
                  <p className="text-xs text-muted-foreground">Sarah Williams assigned to Bus 42 - 1 hour ago</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="text-sm font-medium">Maintenance Scheduled</p>
                  <p className="text-xs text-muted-foreground">Bus 23 scheduled for maintenance - 2 hours ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trips">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Trips</CardTitle>
                <CardDescription>Currently active bus trips</CardDescription>
              </div>
              <Link href="/admin/trips/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Trip
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trips.filter(trip => trip.status?.toLowerCase() === "active").length > 0 ? (
                  trips
                    .filter(trip => trip.status?.toLowerCase() === "active")
                    .map((trip) => (
                      <div key={trip.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">
                            {trip.busNumber} - {trip.routeName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Driver: {trip.driverName} | Supervisor: {trip.supervisorName}
                          </p>
                        </div>
                        <Link href={`/admin/trips/${trip.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No active trips at the moment</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/trips" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Trips
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Pending Issues</CardTitle>
              <CardDescription>Issues that require attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md bg-red-50 dark:bg-red-900/20">
                  <div>
                    <p className="font-medium">Bus 37 Breakdown</p>
                    <p className="text-sm text-muted-foreground">
                      Bus 37 reported a mechanical issue and needs immediate attention
                    </p>
                  </div>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md bg-yellow-50 dark:bg-yellow-900/20">
                  <div>
                    <p className="font-medium">Route Delay</p>
                    <p className="text-sm text-muted-foreground">
                      Bus 42 is running 20 minutes behind schedule due to traffic
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-500 text-white">
                    Medium Priority
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <div>
                    <p className="font-medium">Missing Student Report</p>
                    <p className="text-sm text-muted-foreground">
                      A student was reported absent but was seen boarding the bus
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    Low Priority
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Issues
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
