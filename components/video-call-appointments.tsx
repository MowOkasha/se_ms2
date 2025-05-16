"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface VideoCallAppointmentsProps {
  isPro?: boolean
  isFaculty?: boolean
}

export function VideoCallAppointments({ isPro = false, isFaculty = false }: VideoCallAppointmentsProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedPerson, setSelectedPerson] = useState<string>("")
  const [appointmentReason, setAppointmentReason] = useState<string>("")

  // Dummy data
  const upcomingAppointments = [
    {
      id: 1,
      with: isFaculty ? "Ahmed Mohamed (Student)" : "Dr. Aya Mohamed (Advisor)",
      date: "April 15, 2025",
      time: "2:00 PM - 2:30 PM",
      status: "Confirmed",
      topic: "Internship Progress Discussion",
      avatar: isFaculty ? "AM" : "AM",
    },
    {
      id: 2,
      with: isFaculty ? "Sara Ahmed (Student)" : "Career Counselor",
      date: "April 20, 2025",
      time: "3:00 PM - 3:30 PM",
      status: "Pending",
      topic: "Resume Review",
      avatar: isFaculty ? "SA" : "CC",
    },
  ]

  const pastAppointments = [
    {
      id: 1,
      with: isFaculty ? "Omar Khaled (Student)" : "Dr. Mervat Abuelkheir (Faculty)",
      date: "April 5, 2025",
      time: "1:00 PM - 1:30 PM",
      status: "Completed",
      topic: "Internship Plan Review",
      avatar: isFaculty ? "OK" : "MA",
      recording: true,
    },
    {
      id: 2,
      with: isFaculty ? "Nour Ibrahim (Student)" : "Technical Interview Coach",
      date: "March 28, 2025",
      time: "4:00 PM - 4:30 PM",
      status: "Completed",
      topic: "Mock Interview",
      avatar: isFaculty ? "NI" : "TI",
      recording: true,
    },
    {
      id: 3,
      with: isFaculty ? "Youssef Ali (Student)" : "Dr. Ahmed Badawy (Faculty)",
      date: "March 20, 2025",
      time: "11:00 AM - 11:30 AM",
      status: "Missed",
      topic: "Career Guidance",
      avatar: isFaculty ? "YA" : "AB",
      recording: false,
    },
  ]

  const availablePeople = isFaculty
    ? [
        { id: 1, name: "Ahmed Mohamed", role: "Student" },
        { id: 2, name: "Sara Ahmed", role: "Student" },
        { id: 3, name: "Omar Khaled", role: "Student" },
      ]
    : [
        { id: 1, name: "Dr. Aya Mohamed", role: "Academic Advisor" },
        { id: 2, name: "Dr. Mervat Abuelkheir", role: "Faculty" },
        { id: 3, name: "Career Counselor", role: "SCAD Office" },
      ]

  const availableTimes = [
    "9:00 AM - 9:30 AM",
    "9:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "1:00 PM - 1:30 PM",
    "1:30 PM - 2:00 PM",
    "2:00 PM - 2:30 PM",
    "2:30 PM - 3:00 PM",
  ]

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
        <TabsTrigger value="past">Past Appointments</TabsTrigger>
        <TabsTrigger value="schedule">Schedule New</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="space-y-4 pt-4">
        {upcomingAppointments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{appointment.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{appointment.with}</CardTitle>
                        <CardDescription>
                          {appointment.date} • {appointment.time}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "Confirmed"
                          ? "success"
                          : appointment.status === "Pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Topic</p>
                      <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reschedule</Button>
                  {appointment.status === "Confirmed" && (
                    <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                      Join Meeting
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Schedule an Appointment</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                    <DialogDescription>
                      Select a date, time, and person for your video call appointment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="person">Select Person</Label>
                      <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                        <SelectTrigger id="person">
                          <SelectValue placeholder="Select person" />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePeople.map((person) => (
                            <SelectItem key={person.id} value={person.id.toString()}>
                              {person.name} ({person.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Select Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time slot" />
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
                    <div className="grid gap-2">
                      <Label htmlFor="reason">Appointment Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Briefly describe the purpose of this appointment"
                        value={appointmentReason}
                        onChange={(e) => setAppointmentReason(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Schedule Appointment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="past" className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{appointment.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{appointment.with}</CardTitle>
                      <CardDescription>
                        {appointment.date} • {appointment.time}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "Completed"
                        ? "outline"
                        : appointment.status === "Missed"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Topic</p>
                    <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {appointment.recording ? (
                  <Button variant="outline" className="w-full">
                    View Recording
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    No Recording Available
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="schedule" className="space-y-4 pt-4">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
            <CardDescription>Book a video call appointment with faculty or advisors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="person">Select Person</Label>
                <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                  <SelectTrigger id="person">
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePeople.map((person) => (
                      <SelectItem key={person.id} value={person.id.toString()}>
                        {person.name} ({person.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time slot" />
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
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Appointment Reason</Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe the purpose of this appointment"
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
              Schedule Appointment
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
