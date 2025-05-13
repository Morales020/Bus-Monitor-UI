"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BusDetailsPage() {
    const params = useParams()
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

    return (
        <div className="container py-6">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/admin/buses">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Bus Details</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{busData.busNumber}</CardTitle>
                    <CardDescription>View all information about this bus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div><strong>License Plate:</strong> {busData.licensePlate}</div>
                    <div><strong>Capacity:</strong> {busData.capacity}</div>
                    <div><strong>Driver:</strong> {busData.driver}</div>
                    <div><strong>Status:</strong> {busData.status}</div>
                    <div><strong>Last Maintenance:</strong> {busData.lastMaintenance}</div>
                </CardContent>
            </Card>
        </div>
    )
} 