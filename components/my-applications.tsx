"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function MyApplications() {
  // Dummy data
  const applications = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Frontend Developer Intern",
      date: "April 5, 2025",
      status: "Under Review",
      logo: "TI",
    },
    {
      id: 2,
      company: "Global Solutions",
      position: "Mobile App Developer Intern",
      date: "March 28, 2025",
      status: "Rejected",
      logo: "GS",
      feedback: "We found candidates with more experience in mobile development.",
    },
    {
      id: 3,
      company: "Future Systems",
      position: "UI/UX Design Intern",
      date: "March 15, 2025",
      status: "Accepted",
      logo: "FS",
      startDate: "May 1, 2025",
      endDate: "July 31, 2025",
    },
    {
      id: 4,
      company: "Digital Experts",
      position: "Data Analyst Intern",
      date: "March 10, 2025",
      status: "Interview",
      logo: "DE",
      interviewDate: "April 15, 2025",
      interviewTime: "2:00 PM",
    },
  ]

  const [selectedApplication, setSelectedApplication] = useState(applications[0])

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Track the status of your internship applications</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {applications.map((application) => (
              <div
                key={application.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                  selectedApplication.id === application.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedApplication(application)}
              >
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarFallback>{application.logo}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{application.position}</p>
                  <p className="text-sm text-muted-foreground truncate">{application.company}</p>
                </div>
                <Badge
                  variant={
                    application.status === "Accepted"
                      ? "success"
                      : application.status === "Rejected"
                        ? "destructive"
                        : application.status === "Interview"
                          ? "warning"
                          : "secondary"
                  }
                  className="ml-2"
                >
                  {application.status}
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
              <CardTitle>{selectedApplication.position}</CardTitle>
              <CardDescription>{selectedApplication.company}</CardDescription>
            </div>
            <Badge
              variant={
                selectedApplication.status === "Accepted"
                  ? "success"
                  : selectedApplication.status === "Rejected"
                    ? "destructive"
                    : selectedApplication.status === "Interview"
                      ? "warning"
                      : "secondary"
              }
            >
              {selectedApplication.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-medium">Application Timeline</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Applied</span>
                <span className="text-sm text-muted-foreground">{selectedApplication.date}</span>
              </div>
              <Progress value={100} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Screening</span>
                <span className="text-sm text-muted-foreground">
                  {selectedApplication.status !== "Under Review" ? "Completed" : "In Progress"}
                </span>
              </div>
              <Progress value={selectedApplication.status !== "Under Review" ? 100 : 50} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Interview</span>
                <span className="text-sm text-muted-foreground">
                  {selectedApplication.status === "Interview" || selectedApplication.status === "Accepted"
                    ? selectedApplication.status === "Interview"
                      ? "Scheduled"
                      : "Completed"
                    : "Pending"}
                </span>
              </div>
              <Progress
                value={
                  selectedApplication.status === "Interview" ? 50 : selectedApplication.status === "Accepted" ? 100 : 0
                }
                className="h-1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Decision</span>
                <span className="text-sm text-muted-foreground">
                  {selectedApplication.status === "Accepted" || selectedApplication.status === "Rejected"
                    ? "Completed"
                    : "Pending"}
                </span>
              </div>
              <Progress
                value={selectedApplication.status === "Accepted" || selectedApplication.status === "Rejected" ? 100 : 0}
                className="h-1"
              />
            </div>
          </div>

          {selectedApplication.status === "Interview" && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Interview Details</h4>
              <p className="text-sm">
                Date: {selectedApplication.interviewDate} at {selectedApplication.interviewTime}
              </p>
              <p className="text-sm mt-1">Location: Online (Zoom link will be sent 30 minutes before the interview)</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
                <Button size="sm">Prepare for Interview</Button>
              </div>
            </div>
          )}

          {selectedApplication.status === "Accepted" && (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
              <h4 className="font-medium mb-2 text-green-800 dark:text-green-300">
                Congratulations! Your application has been accepted.
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Internship Period: {selectedApplication.startDate} to {selectedApplication.endDate}
              </p>
              <p className="text-sm mt-1 text-green-700 dark:text-green-400">
                Please complete the onboarding process by April 20, 2025.
              </p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Start Onboarding
                </Button>
              </div>
            </div>
          )}

          {selectedApplication.status === "Rejected" && (
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
              <h4 className="font-medium mb-2 text-red-800 dark:text-red-300">
                We're sorry, your application was not selected.
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400">Feedback: {selectedApplication.feedback}</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline" className="border-red-300 dark:border-red-800">
                  Request More Feedback
                </Button>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-2">Application Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Applied on:</p>
                <p>{selectedApplication.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Position:</p>
                <p>{selectedApplication.position}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Company:</p>
                <p>{selectedApplication.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status:</p>
                <p>{selectedApplication.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Application</Button>
          <Button variant="outline">Contact Recruiter</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
