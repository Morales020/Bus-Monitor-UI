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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface AbsenceRecord {
    id: string;
    studentName: string;
    date: string;
    reason: string;
    status: "pending" | "approved" | "rejected";
}

export default function AbsencesPage() {
    const [absences, setAbsences] = useState<AbsenceRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchAbsences = async () => {
            try {
                // Simulated data - replace with actual API call
                const mockData: AbsenceRecord[] = [
                    {
                        id: "1",
                        studentName: "John Doe",
                        date: "2024-03-20",
                        reason: "Medical appointment",
                        status: "pending",
                    },
                    {
                        id: "2",
                        studentName: "Jane Smith",
                        date: "2024-03-19",
                        reason: "Family emergency",
                        status: "approved",
                    },
                    {
                        id: "3",
                        studentName: "Mike Johnson",
                        date: "2024-03-18",
                        reason: "School event",
                        status: "rejected",
                    },
                ];
                setAbsences(mockData);
            } catch (error) {
                console.error("Error fetching absences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbsences();
    }, []);

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            approved: "bg-green-100 text-green-800 hover:bg-green-200",
            rejected: "bg-red-100 text-red-800 hover:bg-red-200",
        };

        return (
            <Badge className={`${statusStyles[status as keyof typeof statusStyles]} transition-colors`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
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
                <h1 className="text-2xl font-bold">Absence Records</h1>
            </div>
            <Card>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Student Name</TableHead>
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Reason</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                            <span className="text-sm text-muted-foreground">Loading absence records...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : absences.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                            No absence records found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    absences.map((absence) => (
                                        <TableRow key={absence.id}>
                                            <TableCell className="font-medium">{absence.studentName}</TableCell>
                                            <TableCell>{absence.date}</TableCell>
                                            <TableCell>{absence.reason}</TableCell>
                                            <TableCell>{getStatusBadge(absence.status)}</TableCell>
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