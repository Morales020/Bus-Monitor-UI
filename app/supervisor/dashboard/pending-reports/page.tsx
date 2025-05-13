"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface PendingReport {
    id: string;
    driverName: string;
    date: string;
    description: string;
    type: "incident" | "maintenance" | "other";
}

export default function PendingReportsPage() {
    const [reports, setReports] = useState<PendingReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchReports = async () => {
            try {
                // Simulated data - replace with actual API call
                const mockData: PendingReport[] = [
                    {
                        id: "1",
                        driverName: "Jane Smith",
                        date: "2024-03-20",
                        description: "Bus engine maintenance required",
                        type: "maintenance",
                    },
                    {
                        id: "2",
                        driverName: "John Doe",
                        date: "2024-03-19",
                        description: "Minor accident with no injuries",
                        type: "incident",
                    },
                    {
                        id: "3",
                        driverName: "Mike Johnson",
                        date: "2024-03-18",
                        description: "Route change request",
                        type: "other",
                    },
                ];
                setReports(mockData);
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleApprove = async (reportId: string) => {
        // TODO: Implement approve functionality
        console.log("Approving report:", reportId);
    };

    const handleReject = async (reportId: string) => {
        // TODO: Implement reject functionality
        console.log("Rejecting report:", reportId);
    };

    const getTypeBadge = (type: string) => {
        const typeStyles = {
            incident: "bg-red-100 text-red-800",
            maintenance: "bg-blue-100 text-blue-800",
            other: "bg-gray-100 text-gray-800",
        };

        return (
            <Badge className={typeStyles[type as keyof typeof typeStyles]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/supervisor/dashboard">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Pending Reports</h1>
            </div>
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Driver Name</TableHead>
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Type</TableHead>
                                    <TableHead className="font-semibold">Description</TableHead>
                                    <TableHead className="font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                            <span className="text-sm text-muted-foreground">Loading reports...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : reports.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No pending reports found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    reports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell className="font-medium">{report.driverName}</TableCell>
                                            <TableCell>{report.date}</TableCell>
                                            <TableCell>{getTypeBadge(report.type)}</TableCell>
                                            <TableCell className="max-w-md truncate">{report.description}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleApprove(report.id)}
                                                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleReject(report.id)}
                                                        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 