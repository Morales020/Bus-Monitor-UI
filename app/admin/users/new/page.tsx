"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { adminApi } from "@/lib/api-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewUserPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [userData, setUserData] = useState({
        Name: "",
        Username: "",
        Password: "",
        phoneNumber: "",
        Role: "Parent",
        Email: "",
        IsActive: "true"
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const payload = {
                Name: userData.Name,
                Username: userData.Username,
                Password: userData.Password,
                phoneNumber: userData.phoneNumber,
                Role: userData.Role,
                Email: userData.Email,
                IsActive: userData.IsActive
            }
            await adminApi.createUser(payload)
            toast({
                title: "User Created",
                description: "The new user has been created successfully.",
            })
            router.push(`/admin/users`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create user. Please try again.",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Link href="/admin/users">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Create New User</h1>
                </div>
                <Button type="submit" form="new-user-form" disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Create User
                        </>
                    )}
                </Button>
            </div>
            <form id="new-user-form" onSubmit={handleSubmit}>
                <Tabs defaultValue="basic">
                    <TabsList className="mb-4">
                        <TabsTrigger value="basic">Basic Information</TabsTrigger>
                        <TabsTrigger value="role">Role & Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Details</CardTitle>
                                <CardDescription>Enter the new user's information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="Name">Name</Label>
                                    <Input id="Name" name="Name" value={userData.Name} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="Email">Email</Label>
                                    <Input id="Email" name="Email" type="email" value={userData.Email} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="Username">Username</Label>
                                    <Input id="Username" name="Username" value={userData.Username} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="Password">Password</Label>
                                    <Input id="Password" name="Password" type="password" value={userData.Password} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="IsActive">Status</Label>
                                    <Select value={userData.IsActive} onValueChange={(value) => handleSelectChange("IsActive", value)}>
                                        <SelectTrigger id="IsActive">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Active</SelectItem>
                                            <SelectItem value="false">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="role">
                        <Card>
                            <CardHeader>
                                <CardTitle>Role & Permissions</CardTitle>
                                <CardDescription>Set the user's role</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="Role">Role</Label>
                                    <Select value={userData.Role} onValueChange={(value) => handleSelectChange("Role", value)}>
                                        <SelectTrigger id="Role">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                                            <SelectItem value="Driver">Driver</SelectItem>
                                            <SelectItem value="Parent">Parent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    )
} 