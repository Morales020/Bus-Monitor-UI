"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function NewStudentPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setStudentData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            // TODO: Implement adminApi.createStudent
            // await adminApi.createStudent(studentData)
            toast({
                title: "Student Created",
                description: "The new student has been created successfully.",
            })
            router.push(`/admin/students`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create student. Please try again.",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Link href="/admin/students">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Student</h1>
                </div>
                <Button type="submit" form="new-student-form" disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Create Student
                        </>
                    )}
                </Button>
            </div>
            <form id="new-student-form" onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Student Details</CardTitle>
                        <CardDescription>Enter the new student's information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={studentData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade</Label>
                            <Input id="grade" name="grade" value={studentData.grade} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="busNumber">Bus Number</Label>
                            <Input id="busNumber" name="busNumber" value={studentData.busNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stop">Stop</Label>
                            <Input id="stop" name="stop" value={studentData.stop} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parent">Parent</Label>
                            <Input id="parent" name="parent" value={studentData.parent} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parentContact">Parent Contact</Label>
                            <Input id="parentContact" name="parentContact" value={studentData.parentContact} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" name="status" value={studentData.status} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" value={studentData.address} onChange={handleInputChange} required />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
} 