"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AdvancedSearchFilter } from "@/components/advanced-search-filter"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export function InternshipReportsList() {
  const { toast } = useToast()
  const [majorFilter, setMajorFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [newStatus, setNewStatus] = useState("")

  // Dummy data
  const reports = [
    {
      id: "1",
      title: "Frontend Development Internship at Tech Innovations",
      student: "Ahmed Mohamed",
      studentId: "43-12345",
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
      studentId: "43-12346",
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
      studentId: "43-12347",
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
      studentId: "43-12348",
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

  // Filter reports based on filters
  const filteredReports = reports.filter((report) => {
    const matchesMajor = majorFilter === "all" || report.major === majorFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesMajor && matchesStatus
  })

  const handleViewReport = (report: any) => {
    setSelectedReport(report)
    setNewStatus(report.status)
    setFeedbackText(report.feedback || "")
    setShowReportDialog(true)
  }

  const handleUpdateStatus = () => {
    if (!selectedReport) return

    toast({
      title: "Report Status Updated",
      description: `The report status has been updated to ${newStatus}.`,
    })

    // In a real application, you would make an API call here
    setShowReportDialog(false)
  }

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Report Downloaded",
      description: "The report has been downloaded as a PDF.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "flagged":
        return <Badge variant="warning">Flagged</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "accepted":
        return <Badge variant="success">Accepted</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <AdvancedSearchFilter type="reports" />

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Internship Reports</CardTitle>
              <CardDescription>Review and evaluate student internship reports</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleDownloadReport("all")}>
                Export All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
            <div className="w-full md:w-64">
              <Select value={majorFilter} onValueChange={setMajorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Majors</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Media Engineering and Technology">Media Engineering and Technology</SelectItem>
                  <SelectItem value="Business Informatics">Business Informatics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.student}</TableCell>
                    <TableCell>{report.major}</TableCell>
                    <TableCell>{report.submissionDate}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No reports found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Internship Report</DialogTitle>
            <DialogDescription>Review and evaluate the student's internship report</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{selectedReport.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted by {selectedReport.student} ({selectedReport.studentId}) on{" "}
                    {selectedReport.submissionDate}
                  </p>
                </div>
                {getStatusBadge(selectedReport.status)}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Introduction</h4>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReport.content.introduction}</p>
                </div>
                <div>
                  <h4 className="font-medium">Body</h4>
                  <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                    {selectedReport.content.body}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Conclusion</h4>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReport.content.conclusion}</p>
                </div>
                <div>
                  <h4 className="font-medium">Relevant Courses</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedReport.courses.map((course: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedReport.appeal && (
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md border border-amber-200 dark:border-amber-900">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Student Appeal</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">{selectedReport.appeal}</p>
                </div>
              )}

              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Update Status</h4>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
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
                  <h4 className="font-medium">Feedback</h4>
                  <Textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Provide feedback on this report..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
