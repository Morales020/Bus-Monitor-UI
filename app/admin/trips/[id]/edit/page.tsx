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

export default function EditTripPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [tripData, setTripData] = useState<any>({
    id: "",
    busNumber: "",
    route: "",
    driver: "",
    supervisor: "",
    status: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
  })
  const [availableBuses, setAvailableBuses] = useState<any[]>([])
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([])
  const [availableSupervisors, setAvailableSupervisors] = useState<any[]>([])

  const tripId = params.id

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setIsLoading(true)

        // API integration point: Fetch trip data
        // Example:
        // const response = await fetch(`/api/trips/${tripId}`);
        // const data = await response.json();
        // setTripData(data);

        // Simulate API call with mock data
        setTimeout(() => {
          setTripData({
            id: tripId,
            busNumber: "Bus 42",
            route: "North Route",
            driver: "Michael Brown",
            driverId: "1",
            supervisor: "Sarah Williams",
            supervisorId: "2",
            status: "scheduled",
            date: "2025-05-10",
            startTime: "07:30",
            endTime: "08:30",
            notes: "Regular morning route with stops at Main St, Oak Ave, and Pine Rd.",
          })

          setAvailableBuses([
            { id: "1", busNumber: "Bus 42" },
            { id: "2", busNumber: "Bus 37" },
            { id: "3", busNumber: "Bus 15" },
          ])

          setAvailableDrivers([
            { id: "1", name: "Michael Brown" },
            { id: "2", name: "Jessica Taylor" },
            { id: "3", name: "Robert Wilson" },
          ])

          setAvailableSupervisors([
            { id: "1", name: "Sarah Williams" },
            { id: "2", name: "David Johnson" },
            { id: "3", name: "Emily Davis" },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching trip data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load trip data. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchTripData()
  }, [tripId, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTripData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTripData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // API integration point: Update trip
      // Example:
      // const response = await fetch(`/api/trips/${tripId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(tripData),
      // });
      // if (!response.ok) throw new Error('Failed to update trip');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Trip Updated",
        description: "The trip has been updated successfully.",
      })

      router.push(`/admin/trips/${tripId}`)
    } catch (error) {
      console.error("Error updating trip:", error)
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
            <TabsTrigger value="notes">Notes & Details</TabsTrigger>
          </TabsList>

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
                      name="route"
                      value={tripData.route}
                      onChange={handleInputChange}
                      placeholder="Enter route name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={tripData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={tripData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={tripData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={tripData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Trip Assignments</CardTitle>
                <CardDescription>Assign bus, driver, and supervisor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="busNumber">Bus</Label>
                  <Select value={tripData.busNumber} onValueChange={(value) => handleSelectChange("busNumber", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bus" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBuses.map((bus) => (
                        <SelectItem key={bus.id} value={bus.busNumber}>
                          {bus.busNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Select value={tripData.driver} onValueChange={(value) => handleSelectChange("driver", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDrivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.name}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Select
                    value={tripData.supervisor}
                    onValueChange={(value) => handleSelectChange("supervisor", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSupervisors.map((supervisor) => (
                        <SelectItem key={supervisor.id} value={supervisor.name}>
                          {supervisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Additional Details</CardTitle>
                <CardDescription>Add any additional information about the trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={tripData.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes about this trip"
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/admin/trips/${tripId}`}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
