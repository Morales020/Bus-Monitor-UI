"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Pencil } from "lucide-react"

export default function StudentsPage() {
    const { toast } = useToast()
    const [studentsData, setStudentsData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [busFilter, setBusFilter] = useState<string | null>(null)

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
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
                return <Badge className="bg-blue-500">AtSchool</Badge>
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

    const handleDeleteStudent = (studentId: number) => {
        setStudentsData((prev) => prev.filter((student) => student.id !== studentId))
        toast({
            title: "Student Deleted",
            description: "The student has been deleted successfully.",
        })
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
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Students Management</h1>
                <Link href="/admin/students/new">
                    <Button>
                        <span className="mr-2">New Student</span>
                    </Button>
                </Link>
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
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Bus</TableHead>
                                <TableHead>Stop</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell>{student.busNumber}</TableCell>
                                    <TableCell>{student.stop}</TableCell>
                                    <TableCell>{student.parent}</TableCell>
                                    <TableCell>{getStudentStatusBadge(student.status)}</TableCell>
                                    <TableCell>{student.address}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <div className="flex space-x-2">
                                                <Link href={`/admin/students/${student.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/students/${student.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteStudent(student.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 