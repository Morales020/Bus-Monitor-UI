"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminApi } from "@/lib/api-service"

// --- Types ---
type TripData = {
  id: string | number
  status: string
  busId: string | number
  busNumber: string
  routeId: string | number
  routeName: string
  driverId: string | number
  driverName: string
  supervisorId: string | number
  supervisorName: string
  arrivalTime: string
  departureTime: string
}

export default function EditTripPage() {
  // --- Hooks & State ---
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [tripData, setTripData] = useState<TripData>({
    id: "",
    status: "",
    busId: "",
    busNumber: "",
    routeId: "",
    routeName: "",
    driverId: "",
    driverName: "",
    supervisorId: "",
    supervisorName: "",
    arrivalTime: "",
    departureTime: "",
  })
  const [availableBuses, setAvailableBuses] = useState<any[]>([])
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([])
  const [availableSupervisors, setAvailableSupervisors] = useState<any[]>([])
  const tripId = Number(params.id)

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const trip = await adminApi.getTripById(tripId)
        setTripData(trip)
        setAvailableBuses([{ id: trip.busId, busNumber: trip.busNumber }, { id: 2, busNumber: "Bus 2" }])
        const users = await adminApi.getUsers()
        setAvailableSupervisors(users.filter((user: any) => user.role === "Supervisor"))
        setAvailableDrivers(users.filter((user: any) => user.role === "Driver"))
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [tripId, toast])

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTripData(prev => ({ ...prev, [name]: value }))
  }

  const handleBusChange = (value: string) => {
    const bus = availableBuses.find(b => b.id === value)
    setTripData(prev => ({
      ...prev,
      busId: value,
      busNumber: bus ? bus.busNumber : "",
    }))
  }
  const handleDriverChange = (value: string) => {
    const driver = availableDrivers.find(d => String(d.id) === value)
    setTripData(prev => ({
      ...prev,
      driverId: value,
      driverName: driver ? driver.name : "",
    }))
  }
  const handleSupervisorChange = (value: string) => {
    const supervisor = availableSupervisors.find(s => String(s.id) === value)
    setTripData(prev => ({
      ...prev,
      supervisorId: value,
      supervisorName: supervisor ? supervisor.name : "",
    }))
  }
  const handleStatusChange = (value: string) => {
    setTripData(prev => ({ ...prev, status: value.charAt(0).toUpperCase() + value.slice(1) }))
  }

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      if (!tripData.busId || !tripData.driverId || !tripData.supervisorId || !tripData.status || !tripData.arrivalTime || !tripData.departureTime || !tripData.routeId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required fields.",
        })
        setIsSaving(false)
        return
      }
      const payload = {
        id: tripData.id,
        busId: tripData.busId,
        routeId: tripData.routeId,
        driverId: tripData.driverId,
        supervisorId: tripData.supervisorId,
        status: tripData.status,
        arrivalTime: tripData.arrivalTime.slice(0, 16),
        departureTime: tripData.departureTime.slice(0, 16)
      }
      await adminApi.updateTrip(tripId, payload)
      toast({
        title: "Trip Updated",
        description: "The trip has been updated successfully.",
      })
      router.push(`/admin/trips/${tripId}`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trip. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading trip data...</p>
        </div>
      </div>
    )
  }

  // --- UI ---
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href={`/admin/trips/${tripId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Trip</h1>
        </div>
        <Button type="submit" form="edit-trip-form" disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <form id="edit-trip-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* --- Basic Information Tab --- */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>Basic information about the trip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="route">Route Name</Label>
                    <Input
                      id="route"
                      name="routeName"
                      value={tripData.routeName || ""}
                      onChange={handleInputChange}
                      placeholder="Enter route name"
                      required
                    />
                  </div>
                  {/* TODO: Add a select for routeId if you want to allow changing the route */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="datetime-local"
                      value={tripData?.arrivalTime?.slice(0, 16) || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="departureTime"
                      name="departureTime"
                      type="datetime-local"
                      value={tripData?.departureTime?.slice(0, 16) || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={tripData.status ? tripData.status.toLowerCase() : ""}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={tripData.status || "Select status"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Assignments Tab --- */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Trip Assignments</CardTitle>
                <CardDescription>Assign bus, driver, and supervisor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="busNumber">Bus</Label>
                  <Select defaultValue={tripData.busId ? String(tripData.busId) : ""} value={tripData.busId ? String(tripData.busId) : ""} onValueChange={handleBusChange}>
                    <SelectTrigger>
                      <SelectValue defaultValue={tripData.busId ? String(tripData.busId) : ""} placeholder={tripData.busNumber || "Select bus"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBuses.map(bus => (
                        <SelectItem key={bus.id} value={String(bus.id)}>
                          {bus.busNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Select
                    value={tripData.driverId ? String(tripData.driverId) : ""}
                    onValueChange={value => {
                      const driver = availableDrivers.find(d => String(d.id) === value);
                      setTripData(prev => ({
                        ...prev,
                        driverId: value,
                        driverName: driver ? driver.name : "",
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={tripData.driverName || "Select driver"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDrivers.map(driver => (
                        <SelectItem key={driver.id} value={String(driver.id)}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Select
                    value={tripData.supervisorId ? String(tripData.supervisorId) : ""}
                    onValueChange={value => {
                      const supervisor = availableSupervisors.find(s => String(s.id) === value);
                      setTripData(prev => ({
                        ...prev,
                        supervisorId: value,
                        supervisorName: supervisor ? supervisor.name : "",
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={tripData.supervisorName || "Select supervisor"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSupervisors.map(supervisor => (
                        <SelectItem key={supervisor.id} value={String(supervisor.id)}>
                          {supervisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
