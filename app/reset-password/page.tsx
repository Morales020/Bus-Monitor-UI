"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/api-service"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
                    <CardDescription>Update your password for security</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const currentPassword = formData.get('currentPassword');
                        const newPassword = formData.get('newPassword');
                        if (!currentPassword || !newPassword) {
                            toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Please fill in all password fields.",
                            });
                            return;
                        }
                        setIsLoading(true);
                        try {
                            const userStr = localStorage.getItem('user');
                            if (!userStr) throw new Error('No user data found in localStorage');
                            const userData = JSON.parse(userStr);
                            const payload = {
                                id: userData.id,
                                name: userData.name || '',
                                username: userData.username,
                                password: newPassword.toString(),
                                phoneNumber: userData.phoneNumber || '',
                                role: userData.role,
                                email: userData.email || '',
                                isactive: userData.status !== undefined ? userData.status : true
                            };
                            await adminApi.updateUser(userData.id, payload);
                            toast({
                                title: "Password Changed",
                                description: "Your password has been changed successfully. Please log in with your new password.",
                            });
                            localStorage.removeItem('user');
                            form.reset();
                            setTimeout(() => {
                                router.push('/login');
                            }, 1000);
                        } catch (error) {
                            toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Failed to change password. Please try again.",
                            });
                        } finally {
                            setIsLoading(false);
                        }
                    }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" name="currentPassword" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" name="newPassword" type="password" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 