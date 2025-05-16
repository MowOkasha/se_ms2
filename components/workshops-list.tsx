"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"

interface WorkshopsListProps {
  isPro?: boolean
}

export function WorkshopsList({ isPro = false }: WorkshopsListProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Dummy data
  const upcomingWorkshops = [
    {
      id: 1,
      title: "Resume Building for Tech Internships",
      date: "May 20, 2025",
      time: "2:00 PM - 4:00 PM",
      speaker: "Dr. Mervat Abuelkheir",
      speakerRole: "Career Development Advisor",
      speakerInitials: "MA",
      location: "Online (Zoom)",
      type: "Live",
      registrations: 45,
      description:
        "Learn how to create a standout resume that highlights your technical skills and academic achievements. This workshop will cover formatting, content, and tailoring your resume for tech companies.",
    },
    {
      id: 2,
      title: "Mastering Technical Interviews",
      date: "May 25, 2025",
      time: "3:00 PM - 5:00 PM",
      speaker: "Eng. Yasmine Elbehairy",
      speakerRole: "Senior Software Engineer at Google",
      speakerInitials: "YE",
      location: "Online (Zoom)",
      type: "Live",
      registrations: 62,
      description:
        "Prepare for technical interviews with this comprehensive workshop. Topics include common algorithms, data structures, problem-solving strategies, and behavioral interview questions.",
    },
    {
      id: 3,
      title: "Effective Communication in the Workplace",
      date: "June 2, 2025",
      time: "1:00 PM - 3:00 PM",
      speaker: "Dr. Aya Mohamed",
      speakerRole: "Faculty Advisor",
      speakerInitials: "AM",
      location: "Room C7.303",
      type: "In-Person",
      registrations: 38,
      description:
        "Develop essential communication skills for professional settings. This workshop focuses on email etiquette, presentation skills, and effective team communication.",
    },
  ]

  const pastWorkshops = [
    {
      id: 1,
      title: "Introduction to Project Management",
      date: "April 10, 2025",
      speaker: "Eng. Nada Ibrahim",
      speakerRole: "Project Manager at Microsoft",
      speakerInitials: "NI",
      type: "Recorded",
      attended: true,
      certificate: true,
    },
    {
      id: 2,
      title: "Networking for Career Success",
      date: "April 5, 2025",
      speaker: "Dr. Ahmed Badawy",
      speakerRole: "Career Counselor",
      speakerInitials: "AB",
      type: "Recorded",
      attended: true,
      certificate: true,
    },
    {
      id: 3,
      title: "Introduction to AI and Machine Learning",
      date: "March 25, 2025",
      speaker: "Dr. Mohamed Hassan",
      speakerRole: "AI Researcher",
      speakerInitials: "MH",
      type: "Recorded",
      attended: false,
      certificate: false,
    },
  ]

  const [selectedWorkshop, setSelectedWorkshop] = useState(upcomingWorkshops[0])

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">Upcoming Workshops</TabsTrigger>
        <TabsTrigger value="past">Past Workshops</TabsTrigger>
        <TabsTrigger value="calendar">Calendar View</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="space-y-4 pt-4">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Workshops</CardTitle>
              <CardDescription>Enhance your skills with these workshops</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                      selectedWorkshop.id === workshop.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedWorkshop(workshop)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{workshop.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{workshop.date}</p>
                    </div>
                    <Badge variant={workshop.type === "Live" ? "default" : "secondary"} className="ml-2">
                      {workshop.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedWorkshop.title}</CardTitle>
                  <CardDescription>
                    {selectedWorkshop.date} • {selectedWorkshop.time}
                  </CardDescription>
                </div>
                <Badge variant={selectedWorkshop.type === "Live" ? "default" : "secondary"}>
                  {selectedWorkshop.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{selectedWorkshop.speakerInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedWorkshop.speaker}</p>
                  <p className="text-sm text-muted-foreground">{selectedWorkshop.speakerRole}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedWorkshop.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{selectedWorkshop.location}</p>
                </div>
                <div>
                  <p className="font-medium">Registrations</p>
                  <p className="text-muted-foreground">{selectedWorkshop.registrations} students</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add to Calendar</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                Register Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="past" className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {pastWorkshops.map((workshop) => (
            <Card key={workshop.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  <Badge variant="outline">{workshop.type}</Badge>
                </div>
                <CardDescription>{workshop.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarFallback>{workshop.speakerInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{workshop.speaker}</p>
                    <p className="text-xs text-muted-foreground">{workshop.speakerRole}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={workshop.attended ? "success" : "secondary"}>
                    {workshop.attended ? "Attended" : "Missed"}
                  </Badge>
                  {workshop.certificate && (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Certificate Earned
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full">
                  Watch Recording
                </Button>
                {workshop.certificate && (
                  <Button variant="outline" className="w-full ml-2">
                    View Certificate
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="calendar" className="space-y-4 pt-4">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Workshop Calendar</CardTitle>
            <CardDescription>View and manage your workshop schedule</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="w-full max-w-md space-y-4">
              <h3 className="font-medium">Events for {date?.toLocaleDateString()}</h3>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">No workshops scheduled for this day.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Events
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
