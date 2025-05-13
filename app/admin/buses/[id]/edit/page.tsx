"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EditBusPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [busData, setBusData] = useState({
        busNumber: "",
        licensePlate: "",
        capacity: "",
        driver: "",
        status: "active",
        lastMaintenance: ""
    })

    useEffect(() => {
        // TODO: Fetch bus by ID (params.id) from API
        setBusData({
            busNumber: "Bus 42",
            licensePlate: "ABC-1234",
            capacity: "40",
            driver: "Michael Brown",
            status: "active",
            lastMaintenance: "2023-04-15"
        })
    }, [params.id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBusData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            // TODO: Implement adminApi.updateBus
            toast({
                title: "Bus Updated",
                description: "The bus has been updated successfully.",
            })
            router.push(`/admin/buses`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update bus. Please try again.",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Link href="/admin/buses">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Edit Bus</h1>
                </div>
                <Button type="submit" form="edit-bus-form" disabled={isSaving}>
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
            <form id="edit-bus-form" onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Bus Details</CardTitle>
                        <CardDescription>Edit the bus information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="busNumber">Bus Number</Label>
                            <Input id="busNumber" name="busNumber" value={busData.busNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="licensePlate">License Plate</Label>
                            <Input id="licensePlate" name="licensePlate" value={busData.licensePlate} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input id="capacity" name="capacity" type="number" value={busData.capacity} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="driver">Driver</Label>
                            <Input id="driver" name="driver" value={busData.driver} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" name="status" value={busData.status} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                            <Input id="lastMaintenance" name="lastMaintenance" type="date" value={busData.lastMaintenance} onChange={handleInputChange} />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
} 