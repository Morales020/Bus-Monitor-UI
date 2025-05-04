import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Bell, Shield, UserCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Bus Monitoring System</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Track and monitor school buses in real-time. Ensure safety and timely transportation for students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/login">Login to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <Card>
          <CardHeader>
            <UserCircle className="w-10 h-10 text-primary mb-2" />
            <CardTitle>For Parents</CardTitle>
            <CardDescription>Track your child's bus in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Monitor your child's bus location, receive notifications about delays, and communicate with supervisors.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login?role=parent">Parent Login</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Bus className="w-10 h-10 text-primary mb-2" />
            <CardTitle>For Drivers</CardTitle>
            <CardDescription>Manage your bus routes efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View trip details, report delays, and communicate with supervisors for smooth operations.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login?role=driver">Driver Login</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Bell className="w-10 h-10 text-primary mb-2" />
            <CardTitle>For Supervisors</CardTitle>
            <CardDescription>Oversee bus operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor drivers, communicate with parents, and ensure safe and efficient transportation.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login?role=supervisor">Supervisor Login</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="w-10 h-10 text-primary mb-2" />
            <CardTitle>For Administrators</CardTitle>
            <CardDescription>Manage the entire system</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add/modify users, assign roles, and maintain the system for optimal performance.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login?role=admin">Admin Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
