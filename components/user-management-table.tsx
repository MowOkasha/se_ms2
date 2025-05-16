"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

export function UserManagementTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)

  // Dummy data
  const users = [
    {
      id: "1",
      name: "Ahmed Mohamed",
      email: "ahmed.mohamed@student.guc.edu.eg",
      studentId: "43-12345",
      program: "Media Engineering and Technology",
      internshipStatus: "in-progress",
      gpa: 3.7,
      completedHours: 120,
      advisor: "Dr. Aya Mohamed",
      isPro: false,
    },
    {
      id: "2",
      name: "Sara Ahmed",
      email: "sara.ahmed@student.guc.edu.eg",
      studentId: "43-12346",
      program: "Computer Science",
      internshipStatus: "completed",
      gpa: 3.9,
      completedHours: 135,
      advisor: "Dr. Mervat Abuelkheir",
      isPro: true,
    },
    {
      id: "3",
      name: "Omar Khaled",
      email: "omar.khaled@student.guc.edu.eg",
      studentId: "43-12347",
      program: "Computer Science",
      internshipStatus: "not-started",
      gpa: 3.5,
      completedHours: 90,
      advisor: "Dr. Ahmed Badawy",
      isPro: false,
    },
    {
      id: "4",
      name: "Nour Ibrahim",
      email: "nour.ibrahim@student.guc.edu.eg",
      studentId: "43-12348",
      program: "Media Engineering and Technology",
      internshipStatus: "completed",
      gpa: 3.8,
      completedHours: 140,
      advisor: "Dr. Aya Mohamed",
      isPro: true,
    },
    {
      id: "5",
      name: "Youssef Ali",
      email: "youssef.ali@student.guc.edu.eg",
      studentId: "43-12349",
      program: "Business Informatics",
      internshipStatus: "in-progress",
      gpa: 3.6,
      completedHours: 110,
      advisor: "Dr. Mohamed Hassan",
      isPro: false,
    },
  ]

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.internshipStatus === statusFilter
    const matchesProgram = programFilter === "all" || user.program === programFilter

    return matchesSearch && matchesStatus && matchesProgram
  })

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "User data has been exported to CSV.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return <Badge variant="success">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <AdvancedSearchFilter type="students" />

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage all students in the GUC Internship System</CardDescription>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Media Engineering and Technology">Media Engineering and Technology</SelectItem>
                  <SelectItem value="Business Informatics">Business Informatics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {user.name}
                        {user.isPro && (
                          <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500">PRO</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.studentId}</TableCell>
                    <TableCell>{user.program}</TableCell>
                    <TableCell>{getStatusBadge(user.internshipStatus)}</TableCell>
                    <TableCell>{user.gpa}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Detailed information about the student</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedUser.internshipStatus)}
                  {selectedUser.isPro && <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">PRO</Badge>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Student ID</p>
                  <p className="text-sm">{selectedUser.studentId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Program</p>
                  <p className="text-sm">{selectedUser.program}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">GPA</p>
                  <p className="text-sm">{selectedUser.gpa}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Completed Hours</p>
                  <p className="text-sm">{selectedUser.completedHours}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Academic Advisor</p>
                  <p className="text-sm">{selectedUser.advisor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Internship Status</p>
                  <p className="text-sm">{selectedUser.internshipStatus.replace("-", " ")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Actions</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Reports
                  </Button>
                  <Button variant="outline" size="sm">
                    View Applications
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Transcript
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
