"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CompanyApprovalsList } from "@/components/company-approvals-list"
import { FacultyStudentsList, Student } from "@/components/faculty-students-list"
import { InternshipReportsList } from "@/components/internship-reports-list"
import { WorkshopManagement } from "@/components/workshop-management"
import { VideoCallAppointments } from "@/components/video-call-appointments"
import { SystemStatistics } from "@/components/system-statistics"

export default function ScadDashboardClient() {
  const [activeTab, setActiveTab] = useState<"companies" | "students" | "reports" | "statistics" | "workshops" | "appointments">("companies")

  // dummy students for SCAD view
  const scadStudents: Student[] = [
    { id: 1, name: "Ahmed Mohamed", studentId: "43-12345", company: "Tech Innovations Inc.", progress: 65, status: "In Progress" },
    { id: 2, name: "Sara Ahmed",   studentId: "43-12346", company: "Global Solutions",    progress: 90, status: "In Progress" },
    { id: 3, name: "Omar Khaled",  studentId: "43-12347", company: "Future Systems",     progress: 30, status: "In Progress" },
    { id: 4, name: "Nour Ibrahim", studentId: "43-12348", company: "Digital Experts",    progress:100, status: "Completed" },
    { id: 5, name: "Youssef Ali",  studentId: "43-12349", company: "Smart Technologies", progress:  0, status: "Not Started" },
  ]

  return (
    <>
      <DashboardHeader
        heading="SCAD Office Dashboard"
        text="Review applications, manage students & reports, run workshops and video‐calls."
      >
        <Button variant="outline" onClick={() => setActiveTab("statistics")}>
          View Statistics
        </Button>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="companies">Company Apps</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="appointments">Video Calls</TabsTrigger>
        </TabsList>

        <TabsContent value="companies">
          {/* View/search/filter all company registration apps + accept/reject */}
          <CompanyApprovalsList />
        </TabsContent>

        <TabsContent value="students">
          {/* View & filter students by internship status */}
          <FacultyStudentsList students={scadStudents} />
        </TabsContent>

        <TabsContent value="reports">
          {/* View/filter all submitted internship reports + review/clarify */}
          <InternshipReportsList />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          {/* SCAD Office / Faculty: real‐time stats */}
          <SystemStatistics />
        </TabsContent>

        <TabsContent value="workshops">
          {/* Manage online workshops (CRUD) */}
          <WorkshopManagement userType="scad" />
        </TabsContent>

        <TabsContent value="appointments">
          {/* Book/join video calls with PRO students, manage requests */}
          <VideoCallAppointments isFaculty={false} />
        </TabsContent>
      </Tabs>
    </>
  )
}