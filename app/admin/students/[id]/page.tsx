"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StudentDetailsPage() {
    const params = useParams()
    const [studentData, setStudentData] = useState({
        name: "",
        grade: "",
        busNumber: "",
        stop: "",
        parent: "",
        parentContact: "",
        status: "on-bus",
        address: ""
    })

    useEffect(() => {
        // TODO: Fetch student by ID (params.id) from API
        setStudentData({
            name: "Emma Johnson",
            grade: "5th Grade",
            busNumber: "Bus 42",
            stop: "Main St & 5th Ave",
            parent: "John Johnson",
            parentContact: "555-123-4567",
            status: "on-bus",
            address: "123 Main St, Anytown, USA"
        })
    }, [params.id])

    return (
        <div className="container py-6">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/admin/students">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Student Details</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{studentData.name}</CardTitle>
                    <CardDescription>View all information about this student</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div><strong>Grade:</strong> {studentData.grade}</div>
                    <div><strong>Bus Number:</strong> {studentData.busNumber}</div>
                    <div><strong>Stop:</strong> {studentData.stop}</div>
                    <div><strong>Parent:</strong> {studentData.parent}</div>
                    <div><strong>Parent Contact:</strong> {studentData.parentContact}</div>
                    <div><strong>Status:</strong> {studentData.status}</div>
                    <div><strong>Address:</strong> {studentData.address}</div>
                </CardContent>
            </Card>
        </div>
    )
} 