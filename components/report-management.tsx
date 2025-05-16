"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AdvancedSearchFilter } from "@/components/advanced-search-filter"
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

interface ReportManagementProps {
  userType: "student" | "faculty" | "scad"
}

export function ReportManagement({ userType }: ReportManagementProps) {
  const { toast } = useToast()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [reportStatus, setReportStatus] = useState<string>("pending")
  const [feedbackText, setFeedbackText] = useState<string>("")
  const [appealText, setAppealText] = useState<string>("")
  const [showAppealDialog, setShowAppealDialog] = useState<boolean>(false)

  // Dummy data
  const reports = [
    {
      id: "1",
      title: "Frontend Development Internship at Tech Innovations",
      student: "Ahmed Mohamed",
      company: "Tech Innovations Inc.",
      submissionDate: "April 10, 2025",
      status: "pending",
      major: "Media Engineering and Technology",
      content: {
        introduction:
          "This report outlines my experience as a Frontend Developer Intern at Tech Innovations Inc. from February to May 2025. During this internship, I worked on developing user interfaces for web applications using React and Next.js.",
        body: "Throughout my internship, I was involved in several projects including the redesign of the company's customer portal and the development of a new dashboard for internal use. I applied knowledge from my Web Development and UI/UX Design courses to create responsive and user-friendly interfaces.\n\nI worked closely with senior developers who provided guidance and feedback on my work. The team used an Agile development methodology with two-week sprints, which helped me understand the software development lifecycle in a professional setting.\n\nOne of the key challenges I faced was optimizing the performance of complex data visualizations in the dashboard. I researched and implemented various techniques to improve rendering speed and reduce memory usage.",
        conclusion:
          "This internship provided valuable hands-on experience in frontend development and helped me bridge the gap between academic knowledge and industry practices. I developed technical skills in React, Next.js, and TypeScript, as well as soft skills in communication and teamwork. I would recommend Tech Innovations to other students looking for internships in web development.",
      },
      courses: ["Web Development", "UI/UX Design", "Data Structures"],
      feedback: "",
      appeal: "",
    },
    {
      id: "2",
      title: "Mobile App Development Internship at Global Solutions",
      student: "Sara Ahmed",
      company: "Global Solutions",
      submissionDate: "March 28, 2025",
      status: "flagged",
      major: "Computer Science",
      content: {
        introduction:
          "This report details my experience as a Mobile App Developer Intern at Global Solutions from June to August 2024. I worked on developing mobile applications for both iOS and Android platforms using React Native.",
        body: "During my internship, I was assigned to the mobile app team working on the company's flagship product, a financial management application. My responsibilities included implementing new features, fixing bugs, and optimizing the app's performance.\n\nI applied concepts from my Mobile Application Development and Software Engineering courses to write clean, maintainable code. The team used Git for version control and followed a code review process that helped me improve my coding practices.\n\nA significant achievement during my internship was implementing a new feature that allowed users to categorize and visualize their expenses. This feature was well-received by users and contributed to a 15% increase in daily active users.",
        conclusion:
          "This internship was a valuable learning experience that enhanced my technical skills in mobile app development and gave me insight into the software development industry. I gained practical experience with React Native, TypeScript, and state management libraries like Redux. The mentorship I received from senior developers was invaluable for my professional growth.",
      },
      courses: ["Mobile Application Development", "Software Engineering", "Database Systems"],
      feedback:
        "The report lacks specific technical details about the implementation of the features mentioned. Please revise to include more information about the technologies and methodologies used.",
      appeal: "",
    },
    {
      id: "3",
      title: "Data Analysis Internship at Future Systems",
      student: "Omar Khaled",
      company: "Future Systems",
      submissionDate: "April 5, 2025",
      status: "accepted",
      major: "Computer Science",
      content: {
        introduction:
          "This report summarizes my experience as a Data Analysis Intern at Future Systems from January to March 2025. I worked with the data science team to analyze customer data and develop insights for business decision-making.",
        body: "My primary responsibility during the internship was to analyze customer usage patterns and identify trends that could inform product development. I used Python with libraries such as Pandas, NumPy, and Matplotlib to clean, analyze, and visualize data.\n\nI applied knowledge from my Data Analysis and Machine Learning courses to develop predictive models for customer churn. These models achieved an accuracy of 85% and were implemented in the company's customer retention strategy.\n\nI also collaborated with the marketing team to create data-driven reports that helped optimize advertising campaigns. This cross-functional experience enhanced my understanding of how data analysis supports various business functions.",
        conclusion:
          "This internship provided me with practical experience in applying data analysis techniques to real-world business problems. I developed technical skills in Python, SQL, and data visualization tools, as well as a deeper understanding of how data-driven insights can impact business decisions. The mentorship and guidance I received from the data science team were instrumental in my professional development.",
      },
      courses: ["Data Analysis", "Machine Learning", "Database Systems"],
      feedback:
        "Excellent report with clear description of the technical work performed and the business impact. The connection between academic coursework and practical application is well articulated.",
      appeal: "",
    },
    {
      id: "4",
      title: "UI/UX Design Internship at Digital Experts",
      student: "Nour Ibrahim",
      company: "Digital Experts",
      submissionDate: "March 20, 2025",
      status: "rejected",
      major: "Media Engineering and Technology",
      content: {
        introduction:
          "This report covers my experience as a UI/UX Design Intern at Digital Experts from December 2024 to February 2025. I worked with the design team to create user interfaces and improve user experiences for web and mobile applications.",
        body: "During my internship, I was involved in the redesign of the company's e-commerce platform. I conducted user research, created wireframes and prototypes, and collaborated with developers to implement the designs.\n\nI applied principles from my UI/UX Design and Human-Computer Interaction courses to create intuitive and accessible interfaces. I used tools such as Figma for design and prototyping, and conducted usability testing to validate design decisions.\n\nA key challenge I faced was designing for multiple platforms (web, iOS, and Android) while maintaining a consistent user experience. I developed a design system that ensured consistency across platforms while respecting platform-specific guidelines.",
        conclusion:
          "This internship enhanced my skills in UI/UX design and gave me valuable experience working in a professional design team. I learned how to balance user needs with business requirements and technical constraints. The feedback from users and stakeholders helped me grow as a designer and understand the importance of iterative design processes.",
      },
      courses: ["UI/UX Design", "Human-Computer Interaction", "Web Development"],
      feedback:
        "The report does not meet the minimum length requirement and lacks sufficient detail about the technical aspects of the design work. Additionally, there is no evidence of reflection on how the academic coursework was applied in practice.",
      appeal:
        "I would like to appeal this rejection as I believe my report meets the requirements. I have included detailed descriptions of the design process, tools used, and challenges faced. I have also explicitly mentioned how I applied concepts from my coursework to the internship projects. I would be happy to provide additional information if needed.",
    },
  ]

  const filteredReports = reports.filter((report) => {
    if (userType === "student") {
      // Students see all their reports
      return true
    } else {
      // Faculty and SCAD see reports based on status
      return report.status === reportStatus
    }
  })

  const selectedReportData = reports.find((report) => report.id === selectedReport)

  const handleStatusChange = (status: string) => {
    if (!selectedReportData) return

    toast({
      title: `Report ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: `The report has been marked as ${status}.`,
    })

    // In a real application, you would make an API call here
    setReportStatus(status)
  }

  const handleSubmitFeedback = () => {
    if (!selectedReportData || !feedbackText) return

    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been submitted successfully.",
    })

    // In a real application, you would make an API call here
  }

  const handleSubmitAppeal = () => {
    if (!selectedReportData || !appealText) return

    toast({
      title: "Appeal Submitted",
      description: "Your appeal has been submitted successfully.",
    })

    setShowAppealDialog(false)

    // In a real application, you would make an API call here
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The report has been downloaded as a PDF.",
    })

    // In a real application, you would generate and download a PDF here
  }

  const renderReportContent = () => {
    if (!selectedReportData) return null

    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg">Introduction</h3>
          <p className="text-sm text-muted-foreground mt-2">{selectedReportData.content.introduction}</p>
        </div>

        <div>
          <h3 className="font-medium text-lg">Body</h3>
          <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
            {selectedReportData.content.body}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg">Conclusion</h3>
          <p className="text-sm text-muted-foreground mt-2">{selectedReportData.content.conclusion}</p>
        </div>

        <div>
          <h3 className="font-medium text-lg">Relevant Courses</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedReportData.courses.map((course, index) => (
              <Badge key={index} variant="outline">
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderFeedbackSection = () => {
    if (!selectedReportData) return null

    if (userType === "student") {
      // Student view of feedback
      if (selectedReportData.status === "pending") {
        return (
          <div className="bg-muted p-4 rounded-md text-center">
            <p>Your report is currently under review.</p>
          </div>
        )
      } else if (selectedReportData.status === "flagged" || selectedReportData.status === "rejected") {
        return (
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-md border border-red-200 dark:border-red-900">
              <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">Feedback from Reviewer</h3>
              <p className="text-sm text-red-700 dark:text-red-400">{selectedReportData.feedback}</p>
            </div>

            {selectedReportData.appeal ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md border border-amber-200 dark:border-amber-900">
                <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Your Appeal</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">{selectedReportData.appeal}</p>
              </div>
            ) : (
              <div className="flex justify-end">
                <Dialog open={showAppealDialog} onOpenChange={setShowAppealDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Appeal Decision</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Appeal Report Decision</DialogTitle>
                      <DialogDescription>Explain why you believe this report should be reconsidered.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea
                        placeholder="Provide details to support your appeal..."
                        value={appealText}
                        onChange={(e) => setAppealText(e.target.value)}
                        rows={6}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAppealDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitAppeal}>Submit Appeal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        )
      } else if (selectedReportData.status === "accepted") {
        return (
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-md border border-green-200 dark:border-green-900">
            <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Report Accepted</h3>
            {selectedReportData.feedback && (
              <p className="text-sm text-green-700 dark:text-green-400">{selectedReportData.feedback}</p>
            )}
          </div>
        )
      }
    } else {
      // Faculty or SCAD view for providing feedback
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Report Status</Label>
            <Select value={selectedReportData.status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Provide feedback on this report..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleSubmitFeedback} className="w-full">
            Submit Feedback
          </Button>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {(userType === "faculty" || userType === "scad") && <AdvancedSearchFilter type="reports" />}

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Internship Reports</CardTitle>
          <CardDescription>
            {userType === "student"
              ? "Manage and track your internship reports"
              : "Review and evaluate student internship reports"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(userType === "faculty" || userType === "scad") && (
            <Tabs value={reportStatus} onValueChange={setReportStatus} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <Card className="border shadow">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{userType === "student" ? "Your Reports" : "Student Reports"}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedReport === report.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{report.title}</p>
                        {userType !== "student" && (
                          <p className="text-sm text-muted-foreground truncate">
                            {report.student} • {report.major}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">Submitted: {report.submissionDate}</p>
                      </div>
                      <Badge
                        variant={
                          report.status === "accepted"
                            ? "success"
                            : report.status === "flagged"
                              ? "warning"
                              : report.status === "rejected"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                  {filteredReports.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No reports found</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {selectedReportData ? (
                <>
                  <Card className="border shadow">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedReportData.title}</CardTitle>
                          <CardDescription>
                            {userType !== "student" && `${selectedReportData.student} • `}
                            {selectedReportData.company} • {selectedReportData.submissionDate}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            selectedReportData.status === "accepted"
                              ? "success"
                              : selectedReportData.status === "flagged"
                                ? "warning"
                                : selectedReportData.status === "rejected"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {selectedReportData.status.charAt(0).toUpperCase() + selectedReportData.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">{renderReportContent()}</CardContent>
                    <CardFooter className="p-4 flex justify-between">
                      <Button variant="outline" onClick={handleDownloadReport}>
                        Download as PDF
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Feedback & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">{renderFeedbackSection()}</CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border shadow">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <svg
                      className="h-12 w-12 text-muted-foreground mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <p className="text-muted-foreground">Select a report to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
