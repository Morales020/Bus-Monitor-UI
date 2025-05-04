"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ArrowLeft, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/api-service"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TripDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [tripData, setTripData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [availableSupervisors, setAvailableSupervisors] = useState<any[]>([])
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([])
  const [availableBuses, setAvailableBuses] = useState<any[]>([])

  const tripId = Number(params.id)

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setIsLoading(true)

        // Fetch trip details
        const trip = await adminApi.getTripById(tripId)
        setTripData(trip)

        // Fetch available supervisors, drivers, and buses for assignment
        const users = await adminApi.getUsers()
        setAvailableSupervisors(users.filter((user: any) => user.role === "supervisor"))
        setAvailableDrivers(users.filter((user: any) => user.role === "driver"))

        const buses = await adminApi.getBuses()
        setAvailableBuses(buses)
      } catch (error) {
        console.error("Error fetching trip data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load trip data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTripData()
  }, [tripId, toast])

  const handleDeleteTrip = async () => {
    try {
      await adminApi.deleteTrip(tripId)
      toast({
        title: "Trip Deleted",
        description: "The trip has been deleted successfully.",
      })
      router.push("/admin/trips")
    } catch (error) {
      console.error("Error deleting trip:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trip. Please try again.",
      })
    }
  }

  const handleAssignSupervisor = async (supervisorId: number) => {
    try {
      await adminApi.assignSupervisorToTrip(tripId, supervisorId)

      // Update local state with the new supervisor
      const supervisor = availableSupervisors.find((s) => s.id === supervisorId)
      setTripData({
        ...tripData,
        supervisorId,
        supervisor: supervisor.name,
      })

      toast({
        title: "Supervisor Assigned",
        description: "The supervisor has been assigned to this trip.",
      })
    } catch (error) {
      console.error("Error assigning supervisor:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign supervisor. Please try again.",
      })
    }
  }

  const handleAssignDriver = async (driverId: number) => {
    try {
      await adminApi.assignDriverToTrip(tripId, driverId)

      // Update local state with the new driver
      const driver = availableDrivers.find((d) => d.id === driverId)
      setTripData({
        ...tripData,
        driverId,
        driver: driver.name,
      })

      toast({
        title: "Driver Assigned",
        description: "The driver has been assigned to this trip.",
      })
    } catch (error) {
      console.error("Error assigning driver:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign driver. Please try again.",
      })
    }
  }

  const handleAssignBus = async (busId: number) => {
    try {
      await adminApi.assignBusToTrip(tripId, busId)

      // Update local state with the new bus
      const bus = availableBuses.find((b) => b.id === busId)
      setTripData({
        ...tripData,
        busId,
        busNumber: bus.busNumber,
      })

      toast({
        title: "Bus Assigned",
        description: "The bus has been assigned to this trip.",
      })
    } catch (error) {
      console.error("Error assigning bus:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign bus. Please try again.",
      })
    }
  }

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
          <Link href="/admin/trips">
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
          <Link href="/admin/trips">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Trip Details</h1>
          {getTripStatusBadge(tripData.status)}
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/trips/${tripId}/edit`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Trip
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this trip? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteTrip}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  <p className="font-medium">{tripData.busNumber || "Not Assigned"}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="font-medium">{getTripStatusBadge(tripData.status)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Driver</CardTitle>
              <CardDescription>Assigned driver information</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Driver</DialogTitle>
                  <DialogDescription>Select a driver to assign to this trip</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {availableDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="flex items-center justify-between p-2 border rounded-md cursor-pointer hover:bg-accent"
                      onClick={() => handleAssignDriver(driver.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-xs text-muted-foreground">{driver.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {tripData.driver ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={tripData.driver} />
                  <AvatarFallback>{tripData.driver.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{tripData.driver}</p>
                  <p className="text-sm text-muted-foreground">Contact: {tripData.driverContact || "N/A"}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <UserPlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No driver assigned</p>
                <p className="text-xs text-muted-foreground">Click Assign to add a driver to this trip</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Supervisor</CardTitle>
              <CardDescription>Assigned supervisor information</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Supervisor</DialogTitle>
                  <DialogDescription>Select a supervisor to assign to this trip</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {availableSupervisors.map((supervisor) => (
                    <div
                      key={supervisor.id}
                      className="flex items-center justify-between p-2 border rounded-md cursor-pointer hover:bg-accent"
                      onClick={() => handleAssignSupervisor(supervisor.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{supervisor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{supervisor.name}</p>
                          <p className="text-xs text-muted-foreground">{supervisor.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {tripData.supervisor ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={tripData.supervisor} />
                  <AvatarFallback>{tripData.supervisor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{tripData.supervisor}</p>
                  <p className="text-sm text-muted-foreground">Contact: {tripData.supervisorContact || "N/A"}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <UserPlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No supervisor assigned</p>
                <p className="text-xs text-muted-foreground">Click Assign to add a supervisor to this trip</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="stops">Stops</TabsTrigger>
          <TabsTrigger value="history">Trip History</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students on Trip</CardTitle>
                <CardDescription>Students assigned to this trip</CardDescription>
              </div>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </CardHeader>
            <CardContent>
              {tripData.students && tripData.students.length > 0 ? (
                <div className="space-y-4">
                  {tripData.students.map((student: any) => (
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
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No students assigned to this trip</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click Add Student to assign students to this trip
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stops">
          <Card>
            <CardHeader>
              <CardTitle>Trip Stops</CardTitle>
              <CardDescription>Scheduled stops for this trip</CardDescription>
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
                      <Badge variant={stop.status === "completed" ? "default" : "outline"}>
                        {stop.status === "completed" ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No stops defined for this trip</p>
                  <p className="text-xs text-muted-foreground mt-1">Click Add Stop to define the route for this trip</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Stop
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>Activity log for this trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm font-medium">Trip Created</p>
                  <p className="text-xs text-muted-foreground">Admin created this trip - 2 days ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm font-medium">Driver Assigned</p>
                  <p className="text-xs text-muted-foreground">Michael Brown was assigned as driver - 1 day ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm font-medium">Supervisor Assigned</p>
                  <p className="text-xs text-muted-foreground">Sarah Williams was assigned as supervisor - 1 day ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="text-sm font-medium">Students Added</p>
                  <p className="text-xs text-muted-foreground">15 students were added to the trip - 12 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
