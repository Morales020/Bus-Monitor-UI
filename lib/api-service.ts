// API service for interacting with .NET backend

// Base URL for API
const API_BASE_URL ="https://api.busmonitoring.com"

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred while fetching data")
  }
  return response.json()
}

// Authentication API endpoints
export const authApi = {
  login: async (credentials: { username: string; password: string; role: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    return handleResponse(response)
  },
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    return handleResponse(response)
  },
  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/user/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },
  getUserProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`)
    return handleResponse(response)
  },
  updateUserProfile: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },
}

// Admin API endpoints
export const adminApi = {
  // User management
  getUsers: async (query = "") => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users${query ? `?${query}` : ""}`)
    return handleResponse(response)
  },
  getUserById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`)
    return handleResponse(response)
  },
  createUser: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    return handleResponse(response)
  },
  updateUser: async (id: number, userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    return handleResponse(response)
  },
  deleteUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },

  // Bus management
  getBuses: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/buses`)
    return handleResponse(response)
  },
  getBusById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/buses/${id}`)
    return handleResponse(response)
  },
  createBus: async (busData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/buses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(busData),
    })
    return handleResponse(response)
  },
  updateBus: async (id: number, busData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/buses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(busData),
    })
    return handleResponse(response)
  },
  deleteBus: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/buses/${id}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },

  // Trip management
  getTrips: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips`)
    return handleResponse(response)
  },
  getTripById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${id}`)
    return handleResponse(response)
  },
  createTrip: async (tripData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    })
    return handleResponse(response)
  },
  updateTrip: async (id: number, tripData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    })
    return handleResponse(response)
  },
  deleteTrip: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${id}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },
  assignStudentToTrip: async (tripId: number, studentId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${tripId}/students/${studentId}`, {
      method: "POST",
    })
    return handleResponse(response)
  },
  removeStudentFromTrip: async (tripId: number, studentId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${tripId}/students/${studentId}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },
  assignSupervisorToTrip: async (tripId: number, supervisorId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${tripId}/supervisor/${supervisorId}`, {
      method: "POST",
    })
    return handleResponse(response)
  },
  assignDriverToTrip: async (tripId: number, driverId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${tripId}/driver/${driverId}`, {
      method: "POST",
    })
    return handleResponse(response)
  },
  assignBusToTrip: async (tripId: number, busId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/trips/${tripId}/bus/${busId}`, {
      method: "POST",
    })
    return handleResponse(response)
  },
}

// Supervisor API endpoints
export const supervisorApi = {
  // Student management
  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/students`)
    return handleResponse(response)
  },
  rateStudent: async (studentId: number, rating: string, notes: string) => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/rate-student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, rating, notes }),
    })
    return handleResponse(response)
  },
  recordAbsence: async (studentId: number, reason: string, date: string) => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/record-absence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, reason, date }),
    })
    return handleResponse(response)
  },
  contactParent: async (parentId: number, message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/contact-parent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentId, message }),
    })
    return handleResponse(response)
  },

  // Trip management
  getAssignedTrips: async () => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/trips`)
    return handleResponse(response)
  },
  getTripHistory: async (tripId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/trips/${tripId}/history`)
    return handleResponse(response)
  },
  contactDriver: async (driverId: number, message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/supervisor/contact-driver`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverId, message }),
    })
    return handleResponse(response)
  },
}

// Parent API endpoints
export const parentApi = {
  getChildren: async () => {
    const response = await fetch(`${API_BASE_URL}/api/parent/children`)
    return handleResponse(response)
  },
  reportAbsence: async (childId: number, reason: string, date: string) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/report-absence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId, reason, date }),
    })
    return handleResponse(response)
  },
  contactSupervisor: async (supervisorId: number, message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/contact-supervisor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supervisorId, message }),
    })
    return handleResponse(response)
  },
  getBusLocation: async (busId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/bus/${busId}/location`)
    return handleResponse(response)
  },
  getTripHistory: async (childId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/children/${childId}/trip-history`)
    return handleResponse(response)
  },
}

// Driver API endpoints
export const driverApi = {
  getCurrentTrip: async () => {
    const response = await fetch(`${API_BASE_URL}/api/driver/current-trip`)
    return handleResponse(response)
  },
  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/api/driver/students`)
    return handleResponse(response)
  },
  startTrip: async (tripId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/driver/start-trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId }),
    })
    return handleResponse(response)
  },
  endTrip: async (tripId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/driver/end-trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId }),
    })
    return handleResponse(response)
  },
  reportDelay: async (tripId: number, reason: string, estimatedDelay: string) => {
    const response = await fetch(`${API_BASE_URL}/api/driver/report-delay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId, reason, estimatedDelay }),
    })
    return handleResponse(response)
  },
  notifySupervisor: async (tripId: number, message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/driver/notify-supervisor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId, message }),
    })
    return handleResponse(response)
  },
}

// Notifications API endpoints
export const notificationsApi = {
  getNotifications: async () => {
    const response = await fetch(`${API_BASE_URL}/api/notifications`)
    return handleResponse(response)
  },
  markAsRead: async (notificationId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
      method: "POST",
    })
    return handleResponse(response)
  },
  markAllAsRead: async () => {
    const response = await fetch(`${API_BASE_URL}/api/notifications/read-all`, {
      method: "POST",
    })
    return handleResponse(response)
  },
}
