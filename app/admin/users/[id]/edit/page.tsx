"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { adminApi } from "@/lib/api-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EditUserPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<any>({
        name: "",
        email: "",
        username: "",
        password: "",
        phoneNumber: "",
        role: "parent",
        status: "true"
    })

    const userId = Number(params.id)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true)
                const user = await adminApi.getUserById(userId)
                if (user.role && user.role.toLowerCase() === "admin") {
                    router.replace(`/admin/users/${userId}`)
                    return
                }
                setUserData({
                    name: user.name || "",
                    email: user.email || "",
                    username: user.username || "",
                    password: user.password || "",
                    phoneNumber: user.phoneNumber || "",
                    role: user.role || "",
                    status: user.isactive || "false"
                })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load user data. Please try again.",
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserData()
    }, [userId, toast, router])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setUserData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const payload = {
                id: userId,
                name: userData.name,
                username: userData.username,
                password: userData.password,
                phoneNumber: userData.phoneNumber,
                role: userData.role,
                email: userData.email,
                isactive: userData.status
            }
            await adminApi.updateUser(userId, payload)
            toast({
                title: "User Updated",
                description: "The user has been updated successfully.",
            })
            router.push(`/admin/users`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update user. Please try again.",
            })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg">Loading user data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Link href={`/admin/users`}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Edit User</h1>
                </div>
                <Button type="submit" form="edit-user-form" disabled={isSaving}>
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
            <form id="edit-user-form" onSubmit={handleSubmit}>
                <Tabs defaultValue="basic">
                    <TabsList className="mb-4">
                        <TabsTrigger value="basic">Basic Information</TabsTrigger>
                        <TabsTrigger value="role">Role & Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Details</CardTitle>
                                <CardDescription>Update the user's basic information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={userData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" name="username" value={userData.username} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" value={userData.password} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={userData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                        <SelectTrigger id="status">
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
                                <CardDescription>Update the user's role</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder={userData.role || "Select role"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="supervisor">Supervisor</SelectItem>
                                            <SelectItem value="driver">Driver</SelectItem>
                                            <SelectItem value="parent">Parent</SelectItem>
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