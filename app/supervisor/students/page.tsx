"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StudentsPage() {
  const { toast } = useToast()
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true)

        // API integration point: Fetch students data
        // Example:
        // const response = await fetch('/api/supervisor/students');
        // const data = await response.json();
        // setStudentsData(data);

        // Simulate API call with mock data
        setTimeout(() => {
          const mockStudents = [
            {
              id: 1,
              name: "Emma Johnson",
              grade: "Grade 5",
              busNumber: "Bus 42",
              status: "present",
              parent: "Michael Johnson",
              parentContact: "555-123-4567",
              address: "123 Oak Street",
              absenceReported: false,
              absenceVerified: false,
            },
            {
              id: 2,
              name: "Noah Williams",
              grade: "Grade 3",
              busNumber: "Bus 37",
              status: "absent",
              parent: "Sarah Williams",
              parentContact: "555-234-5678",
              address: "456 Pine Avenue",
              absenceReported: true,
              absenceVerified: false,
            },
            {
              id: 3,
              name: "Olivia Brown",
              grade: "Grade 4",
              busNumber: "Bus 42",
              status: "present",
              parent: "David Brown",
              parentContact: "555-345-6789",
              address: "789 Maple Drive",
              absenceReported: false,
              absenceVerified: false,
            },
            {
              id: 4,
              name: "Liam Davis",
              grade: "Grade 2",
              busNumber: "Bus 15",
              status: "absent",
              parent: "Jennifer Davis",
              parentContact: "555-456-7890",
              address: "101 Cedar Lane",
              absenceReported: true,
              absenceVerified: true,
            },
            {
              id: 5,
              name: "Ava Miller",
              grade: "Grade 6",
              busNumber: "Bus 37",
              status: "present",
              parent: "Robert Miller",
              parentContact: "555-567-8901",
              address: "202 Birch Street",
              absenceReported: false,
              absenceVerified: false,
            },
          ]

          setStudentsData(mockStudents)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching students:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load students data. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [toast])

  const handleVerifyAbsence = async (studentId: number, verified: boolean) => {
    try {
      // API integration point: Verify student absence
      // Example:
      // await fetch(`/api/supervisor/students/${studentId}/verify-absence`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ verified }),
      // });

      // Update local state
      setStudentsData((prev) =>
        prev.map((student) => (student.id === studentId ? { ...student, absenceVerified: verified } : student)),
      )

      setIsVerifyDialogOpen(false)
      setSelectedStudent(null)

      toast({
        title: verified ? "Absence Verified" : "Absence Rejected",
        description: verified ? "The student absence has been verified." : "The student absence has been rejected.",
      })
    } catch (error) {
      console.error("Error verifying absence:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update absence verification. Please try again.",
      })
    }
  }

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.busNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? student.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-500">Late</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const openVerifyDialog = (student: any) => {
    setSelectedStudent(student)
    setIsVerifyDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students Management</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>Manage all students in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("present")}>Present</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("absent")}>Absent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("late")}>Late</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Absence</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.busNumber}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <div>
                          <p>{student.parent}</p>
                          <p className="text-xs text-muted-foreground">{student.parentContact}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.status === "absent" && (
                          <div className="flex items-center gap-2">
                            {student.absenceReported ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              >
                                Reported
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                Not Reported
                              </Badge>
                            )}
                            {student.absenceVerified && (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/supervisor/students/${student.id}`}>View</Link>
                          </Button>
                          {student.status === "absent" && student.absenceReported && !student.absenceVerified && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => openVerifyDialog(student)}
                            >
                              Verify Absence
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No students found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Student Absence</DialogTitle>
            <DialogDescription>
              {selectedStudent && (
                <>
                  Verify that {selectedStudent.name} is absent today. This absence was reported by{" "}
                  {selectedStudent.parent}.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please confirm if this absence is valid and should be recorded in the system.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleVerifyAbsence(selectedStudent?.id, false)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-200 hover:bg-green-50 hover:text-green-600"
                onClick={() => handleVerifyAbsence(selectedStudent?.id, true)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsVerifyDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
