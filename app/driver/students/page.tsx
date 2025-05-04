"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function StudentsPage() {
  const { toast } = useToast()
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [busFilter, setBusFilter] = useState<string | null>(null)

  useEffect(() => {
    // API INTEGRATION POINT: Fetch students
    // Example:
    // const fetchStudents = async () => {
    //   try {
    //     const response = await fetch('/api/driver/students');
    //     const data = await response.json();
    //     setStudentsData(data);
    //   } catch (error) {
    //     console.error('Error fetching students:', error);
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load students data. Please try again.",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchStudents();

    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setStudentsData([
        {
          id: 1,
          name: "Emma Johnson",
          grade: "5th Grade",
          busNumber: "Bus 42",
          stop: "Main St & 5th Ave",
          parent: "John Johnson",
          parentContact: "555-123-4567",
          status: "on-bus",
          address: "123 Main St, Anytown, USA",
        },
        {
          id: 2,
          name: "Liam Smith",
          grade: "4th Grade",
          busNumber: "Bus 37",
          stop: "Oak Park",
          parent: "Sarah Smith",
          parentContact: "555-234-5678",
          status: "at-school",
          address: "456 Oak Ave, Anytown, USA",
        },
        {
          id: 3,
          name: "Olivia Davis",
          grade: "5th Grade",
          busNumber: "Bus 37",
          stop: "Westside Community Center",
          parent: "Michael Davis",
          parentContact: "555-345-6789",
          status: "at-school",
          address: "789 Pine St, Anytown, USA",
        },
        {
          id: 4,
          name: "Noah Wilson",
          grade: "3rd Grade",
          busNumber: "Bus 23",
          stop: "Hillcrest Apartments",
          parent: "Jennifer Wilson",
          parentContact: "555-456-7890",
          status: "absent",
          address: "101 Maple Dr, Anytown, USA",
        },
        {
          id: 5,
          name: "Ava Brown",
          grade: "4th Grade",
          busNumber: "Bus 23",
          stop: "Maple Drive & Cedar Lane",
          parent: "David Brown",
          parentContact: "555-567-8901",
          status: "on-bus",
          address: "202 Cedar Ln, Anytown, USA",
        },
        {
          id: 6,
          name: "Sophia Miller",
          grade: "5th Grade",
          busNumber: "Bus 42",
          stop: "Riverside Estates",
          parent: "Robert Miller",
          parentContact: "555-678-9012",
          status: "at-school",
          address: "303 Birch Rd, Anytown, USA",
        },
      ])

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBus = busFilter ? student.busNumber === busFilter : true

    return matchesSearch && matchesBus
  })

  const getStudentStatusBadge = (status: string) => {
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

  const getUniqueBuses = () => {
    const buses = studentsData.map((student) => student.busNumber)
    return [...new Set(buses)]
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
        <h1 className="text-3xl font-bold">Students</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>View all students assigned to your buses</CardDescription>
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
                  {busFilter ? `Bus: ${busFilter}` : "Filter by Bus"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setBusFilter(null)}>All Buses</DropdownMenuItem>
                {getUniqueBuses().map((bus) => (
                  <DropdownMenuItem key={bus} onClick={() => setBusFilter(bus)}>
                    {bus}
                  </DropdownMenuItem>
                ))}
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
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Stop</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.busNumber}</TableCell>
                      <TableCell>{student.stop}</TableCell>
                      <TableCell>{student.parent}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{getStudentStatusBadge(student.status)}</TableCell>
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
    </div>
  )
}
