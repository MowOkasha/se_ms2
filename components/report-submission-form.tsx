"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function ReportSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reportType, setReportType] = useState("")

  // Dummy data
  const submittedReports = [
    {
      id: 1,
      title: "Weekly Progress Report 1",
      type: "Weekly",
      date: "March 10, 2025",
      status: "Approved",
      feedback: "Good work! Keep it up.",
    },
    {
      id: 2,
      title: "Weekly Progress Report 2",
      type: "Weekly",
      date: "March 17, 2025",
      status: "Approved",
      feedback: "Well documented progress.",
    },
    {
      id: 3,
      title: "Initial Plan",
      type: "Plan",
      date: "February 20, 2025",
      status: "Approved",
      feedback: "Clear objectives and timeline.",
    },
    {
      id: 4,
      title: "Weekly Progress Report 3",
      type: "Weekly",
      date: "March 24, 2025",
      status: "Under Review",
      feedback: null,
    },
  ]

  const upcomingReports = [{ id: 1, title: "Mid-term Report", type: "Milestone", deadline: "April 1, 2025" }]

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission logic here
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Submission Form</CardTitle>
        <CardDescription>Submit your internship report here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input id="title" type="text" placeholder="Enter report title" />
            </div>
            <div>
              <Label htmlFor="type">Report Type</Label>
              <Select id="type" value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Milestone">Milestone</SelectItem>
                  <SelectItem value="Plan">Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="report">Report Content</Label>
              <Textarea id="report" placeholder="Enter report content" />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Tabs defaultValue="submitted">
          <TabsList>
            <TabsTrigger value="submitted">Submitted Reports</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="submitted">
            <div className="space-y-4">
              {submittedReports.map((report) => (
                <div key={report.id} className="flex items-center space-x-4">
                  <Badge variant="success">{report.status}</Badge>
                  <div>
                    <p className="font-bold">{report.title}</p>
                    <p>Type: {report.type}</p>
                    <p>Date: {report.date}</p>
                    {report.feedback && <p>Feedback: {report.feedback}</p>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingReports.map((report) => (
                <div key={report.id} className="flex items-center space-x-4">
                  <Badge variant="default">Pending</Badge>
                  <div>
                    <p className="font-bold">{report.title}</p>
                    <p>Type: {report.type}</p>
                    <p>Deadline: {report.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  )
}
