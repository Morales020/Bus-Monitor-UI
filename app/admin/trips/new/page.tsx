"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function NewTripPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [tripData, setTripData] = useState({
    status: "planned",
    busId: 0,
    busNumber: "",
    routeId: 0,
    routeName: "",
    driverId: 0,
    driverName: "",
    supervisorId: 0,
    supervisorName: "",
    adminId: 0,
    adminName: "",
    students: [],
    arrivalTime: "",
    departureTime: ""
  })
  const [availableBuses, setAvailableBuses] = useState<any[]>([])
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([])
  const [availableSupervisors, setAvailableSupervisors] = useState<any[]>([])
  const [availableStudents, setAvailableStudents] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setAvailableBuses([{ id: 1, busNumber: "Bus 1 " }, { id: 2, busNumber: "Bus 2" }])
        const users = await adminApi.getUsers()
        setAvailableDrivers(users.filter((u: any) => u.role === "Driver"))
        setAvailableSupervisors(users.filter((u: any) => u.role === "Supervisor"))
        // Set default date to tomorrow
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const formattedDate = tomorrow.toISOString().split("T")[0]

        setTripData((prev: any) => ({
          ...prev,
          date: formattedDate,
        }))
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load users data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [toast])

  useEffect(() => {
    // TODO: Replace with your real API call when available
    // Example: const students = await adminApi.getStudents()
    // setAvailableStudents(students)
    setAvailableStudents([]) // Placeholder
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTripData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTripData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleStudentSelect = (studentId: number) => {
    const student = availableStudents.find(s => s.id === studentId)
    if (student && !tripData.students.some((s: any) => s.id === studentId)) {
      setTripData(prev => ({ ...prev, students: [...prev.students, student] as any }))
    }
  }

  const handleStudentRemove = (studentId: number) => {
    setTripData(prev => ({ ...prev, students: prev.students.filter((s: any) => s.id !== studentId) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const payload = {
        status: tripData.status,
        busId: tripData.busId,
        busNumber: tripData.busNumber,
        routeId: tripData.routeId,
        routeName: tripData.routeName,
        driverId: tripData.driverId,
        driverName: tripData.driverName,
        supervisorId: tripData.supervisorId,
        supervisorName: tripData.supervisorName,
        adminId: tripData.adminId,
        adminName: tripData.adminName,
        students: tripData.students,
        arrivalTime: tripData.arrivalTime,
        departureTime: tripData.departureTime
      }
      await adminApi.createTrip(payload)
      toast({
        title: "Trip Created",
        description: "The new trip has been created successfully.",
      })
      router.push(`/admin/trips`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create trip. Please try again.",
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
          <p className="mt-4 text-lg">Loading...</p>
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
          <h1 className="text-3xl font-bold">Create New Trip</h1>
        </div>
        <Button type="submit" form="new-trip-form" disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Create Trip
            </>
          )}
        </Button>
      </div>

      <form id="new-trip-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
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
                      name="routeName"
                      value={tripData.routeName}
                      onChange={handleInputChange}
                      placeholder="Enter route name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="arrivalTime"
                      type="datetime-local"
                      value={tripData.arrivalTime.slice(0, 16)}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      name="departureTime"
                      type="datetime-local"
                      value={tripData.departureTime.slice(0, 16)}
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
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                  <Select value={tripData.driverName} onValueChange={(value) => handleSelectChange("driverName", value)}>
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
                    value={tripData.supervisorName}
                    onValueChange={(value) => handleSelectChange("supervisorName", value)}
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
                <div className="space-y-2">
                  <Label>Students</Label>
                  <Select onValueChange={id => handleStudentSelect(Number(id))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStudents.map(student => (
                        <SelectItem key={student.id} value={String(student.id)}>
                          {student.name} (Parent: {student.parentName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2">
                    {tripData.students.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {tripData.students.map((student: any) => (
                          <li key={student.id} className="flex items-center justify-between">
                            <span>{student.name} (Parent: {student.parentName}, Address: {student.Address}, Phone: {student.ParentPhoneNumber})</span>
                            <Button variant="destructive" size="sm" onClick={() => handleStudentRemove(student.id)}>Remove</Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">No students added yet.</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
