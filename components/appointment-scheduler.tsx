"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { DatePicker } from "@/components/ui/date-picker"

interface AppointmentSchedulerProps {
  userType: "student" | "faculty" | "scad" | "company"
}

export function AppointmentScheduler({ userType }: AppointmentSchedulerProps) {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedPerson, setSelectedPerson] = useState<string>("")
  const [appointmentReason, setAppointmentReason] = useState<string>("")
  const [selectedTab, setSelectedTab] = useState<string>("schedule")

  // Dummy data
  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ]

  const availablePeople =
    userType === "student" || userType === "company"
      ? [
          { id: "1", name: "Dr. Aya Mohamed", role: "Faculty Advisor", avatar: "AM" },
          { id: "2", name: "Dr. Mervat Abuelkheir", role: "SCAD Officer", avatar: "MA" },
          { id: "3", name: "Dr. Ahmed Badawy", role: "Career Counselor", avatar: "AB" },
        ]
      : [
          { id: "1", name: "Ahmed Mohamed", role: "Student", avatar: "AM" },
          { id: "2", name: "Sara Ahmed", role: "PRO Student", avatar: "SA" },
          { id: "3", name: "Omar Khaled", role: "Student", avatar: "OK" },
        ]

  const upcomingAppointments = [
    {
      id: "1",
      with: userType === "student" || userType === "company" ? "Dr. Aya Mohamed" : "Ahmed Mohamed",
      role: userType === "student" || userType === "company" ? "Faculty Advisor" : "Student",
      avatar: userType === "student" || userType === "company" ? "AM" : "AM",
      date: "May 18, 2025",
      time: "10:00 AM",
      reason: "Career guidance discussion",
      status: "confirmed",
    },
    {
      id: "2",
      with: userType === "student" || userType === "company" ? "Dr. Mervat Abuelkheir" : "Sara Ahmed",
      role: userType === "student" || userType === "company" ? "SCAD Officer" : "PRO Student",
      avatar: userType === "student" || userType === "company" ? "MA" : "SA",
      date: "May 20, 2025",
      time: "02:00 PM",
      reason: "Report clarification",
      status: "pending",
    },
  ]

  const pastAppointments = [
    {
      id: "1",
      with: userType === "student" || userType === "company" ? "Dr. Ahmed Badawy" : "Omar Khaled",
      role: userType === "student" || userType === "company" ? "Career Counselor" : "Student",
      avatar: userType === "student" || userType === "company" ? "AB" : "OK",
      date: "May 5, 2025",
      time: "11:00 AM",
      reason: "Internship report review",
      status: "completed",
    },
  ]

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedPerson || !appointmentReason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to schedule an appointment.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Appointment Requested",
      description: `Your appointment request has been sent for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    })

    // Reset form
    setSelectedTime("")
    setAppointmentReason("")
  }

  const handleCancelAppointment = (id: string) => {
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled successfully.",
    })
  }

  const handleAcceptAppointment = (id: string) => {
    toast({
      title: "Appointment Confirmed",
      description: "You have accepted the appointment request.",
    })
  }

  const handleRejectAppointment = (id: string) => {
    toast({
      title: "Appointment Rejected",
      description: "You have rejected the appointment request.",
    })
  }

  const handleStartCall = (id: string) => {
    toast({
      title: "Starting Video Call",
      description: "Connecting to video call...",
    })
    // In a real application, this would redirect to the video call page
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Video Call Appointments</CardTitle>
        <CardDescription>
          {userType === "student" || userType === "company"
            ? "Schedule video calls with faculty advisors and SCAD officers"
            : "Manage video call appointments with students and companies"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedTab === "schedule" ? "default" : "outline"}
            onClick={() => setSelectedTab("schedule")}
            className="flex-1"
          >
            {userType === "student" || userType === "company" ? "Schedule Appointment" : "Appointment Requests"}
          </Button>
          <Button
            variant={selectedTab === "upcoming" ? "default" : "outline"}
            onClick={() => setSelectedTab("upcoming")}
            className="flex-1"
          >
            Upcoming Appointments
          </Button>
          <Button
            variant={selectedTab === "past" ? "default" : "outline"}
            onClick={() => setSelectedTab("past")}
            className="flex-1"
          >
            Past Appointments
          </Button>
        </div>

        {selectedTab === "schedule" && (
          <div className="space-y-6">
            {userType === "student" || userType === "company" ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Select Date</h3>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Select Time</h3>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Select Person</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {availablePeople.map((person) => (
                      <div
                        key={person.id}
                        className={`p-4 border rounded-md cursor-pointer ${
                          selectedPerson === person.id ? "border-primary bg-primary/10" : ""
                        }`}
                        onClick={() => setSelectedPerson(person.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{person.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Appointment Reason</h3>
                  <Textarea
                    placeholder="Briefly describe the reason for this appointment..."
                    value={appointmentReason}
                    onChange={(e) => setAppointmentReason(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleScheduleAppointment}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  Request Appointment
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium">Pending Appointment Requests</h3>
                {upcomingAppointments.filter((a) => a.status === "pending").length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments
                      .filter((a) => a.status === "pending")
                      .map((appointment) => (
                        <Card key={appointment.id} className="border shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>{appointment.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{appointment.with}</p>
                                  <p className="text-sm text-muted-foreground">{appointment.role}</p>
                                  <div className="flex items-center mt-1">
                                    <p className="text-xs text-muted-foreground">
                                      {appointment.date} at {appointment.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">Pending</Badge>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm font-medium">Reason:</p>
                              <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectAppointment(appointment.id)}
                              >
                                Reject
                              </Button>
                              <Button size="sm" onClick={() => handleAcceptAppointment(appointment.id)}>
                                Accept
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border rounded-md">
                    <p className="text-muted-foreground">No pending appointment requests</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedTab === "upcoming" && (
          <div className="space-y-4">
            <h3 className="font-medium">Upcoming Appointments</h3>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{appointment.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.with}</p>
                            <p className="text-sm text-muted-foreground">{appointment.role}</p>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-muted-foreground">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                          {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium">Reason:</p>
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => handleCancelAppointment(appointment.id)}>
                          Cancel
                        </Button>
                        {appointment.status === "confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => handleStartCall(appointment.id)}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                          >
                            Start Call
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === "past" && (
          <div className="space-y-4">
            <h3 className="font-medium">Past Appointments</h3>
            {pastAppointments.length > 0 ? (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{appointment.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.with}</p>
                            <p className="text-sm text-muted-foreground">{appointment.role}</p>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-muted-foreground">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium">Reason:</p>
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No past appointments</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
