"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, AlertTriangle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Determine user role based on URL path
  const getUserRole = () => {
    if (pathname.includes("/admin")) return "admin"
    if (pathname.includes("/supervisor")) return "supervisor"
    if (pathname.includes("/driver")) return "driver"
    if (pathname.includes("/parent")) return "parent"
    return "admin" // Default to admin if can't determine
  }

  const userRole = getUserRole()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)

        // API integration point: Fetch notifications
        // Example:
        // const response = await fetch(`/api/${userRole}/notifications`);
        // const data = await response.json();
        // setNotifications(data);

        // Simulate API call with mock data
        setTimeout(() => {
          // Generate role-specific notifications
          let mockNotifications = []

          switch (userRole) {
            case "admin":
              mockNotifications = [
                {
                  id: 1,
                  type: "alert",
                  title: "Bus 37 Breakdown",
                  message: "Bus 37 reported a mechanical issue and needs immediate attention",
                  time: "10 minutes ago",
                  read: false,
                },
                {
                  id: 2,
                  type: "info",
                  title: "New User Registration",
                  message: "A new parent account has been created and needs approval",
                  time: "1 hour ago",
                  read: false,
                },
                {
                  id: 3,
                  type: "success",
                  title: "System Update Complete",
                  message: "The system has been successfully updated to version 2.3.0",
                  time: "3 hours ago",
                  read: true,
                },
              ]
              break

            case "supervisor":
              mockNotifications = [
                {
                  id: 1,
                  type: "info",
                  title: "Absence Report",
                  message: "Noah Williams has been reported absent by parent",
                  time: "30 minutes ago",
                  read: false,
                },
                {
                  id: 2,
                  type: "warning",
                  title: "Trip Delay",
                  message: "Bus 42 is running 15 minutes behind schedule",
                  time: "45 minutes ago",
                  read: false,
                },
                {
                  id: 3,
                  type: "success",
                  title: "Trip Completed",
                  message: "Morning route for Bus 15 has been completed successfully",
                  time: "2 hours ago",
                  read: true,
                },
              ]
              break

            case "driver":
              mockNotifications = [
                {
                  id: 1,
                  type: "info",
                  title: "New Trip Assignment",
                  message: "You have been assigned to Bus 42 for tomorrow's morning route",
                  time: "1 hour ago",
                  read: false,
                },
                {
                  id: 2,
                  type: "warning",
                  title: "Route Change",
                  message: "Your afternoon route has been modified due to road construction",
                  time: "3 hours ago",
                  read: false,
                },
                {
                  id: 3,
                  type: "info",
                  title: "Student Absence",
                  message: "Emma Johnson will be absent today",
                  time: "5 hours ago",
                  read: true,
                },
              ]
              break

            case "parent":
              mockNotifications = [
                {
                  id: 1,
                  type: "info",
                  title: "Bus Approaching",
                  message: "Bus 42 is 5 minutes away from your stop",
                  time: "Just now",
                  read: false,
                },
                {
                  id: 2,
                  type: "success",
                  title: "Child Boarded",
                  message: "Emma Johnson has boarded Bus 42",
                  time: "8:05 AM",
                  read: false,
                },
                {
                  id: 3,
                  type: "success",
                  title: "Child Arrived",
                  message: "Emma Johnson has arrived at school",
                  time: "8:30 AM",
                  read: true,
                },
              ]
              break
          }

          setNotifications(mockNotifications)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load notifications. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [userRole, toast])

  const markAsRead = async (notificationId: number) => {
    try {
      // API integration point: Mark notification as read
      // Example:
      // await fetch(`/api/${userRole}/notifications/${notificationId}/read`, {
      //   method: 'POST',
      // });

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )

      toast({
        title: "Notification marked as read",
        description: "The notification has been marked as read.",
      })
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification. Please try again.",
      })
    }
  }

  const markAllAsRead = async () => {
    try {
      // API integration point: Mark all notifications as read
      // Example:
      // await fetch(`/api/${userRole}/notifications/read-all`, {
      //   method: 'POST',
      // });

      // Update local state
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

      toast({
        title: "All notifications marked as read",
        description: "All notifications have been marked as read.",
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notifications. Please try again.",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading notifications...</p>
        </div>
      </div>
    )
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount} new</Badge>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Stay updated with the latest alerts and information</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    notification.read ? "bg-background" : "bg-muted/30"
                  }`}
                >
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
