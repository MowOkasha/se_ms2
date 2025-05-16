"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InternshipsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")

  // Dummy data
  const myApplications = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Frontend Developer Intern",
      date: "April 5, 2025",
      status: "Under Review",
    },
    {
      id: 2,
      company: "Global Solutions",
      position: "Mobile App Developer Intern",
      date: "March 28, 2025",
      status: "Rejected",
    },
    { id: 3, company: "Future Systems", position: "UI/UX Design Intern", date: "March 15, 2025", status: "Accepted" },
  ]

  const availableInternships = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Backend Developer Intern",
      industry: "Information Technology",
      deadline: "April 30, 2025",
      location: "Cairo, Egypt",
    },
    {
      id: 2,
      company: "Global Solutions",
      position: "Data Analyst Intern",
      industry: "Information Technology",
      deadline: "May 15, 2025",
      location: "Alexandria, Egypt",
    },
    {
      id: 3,
      company: "Future Systems",
      position: "Software Engineer Intern",
      industry: "Information Technology",
      deadline: "April 25, 2025",
      location: "Cairo, Egypt",
    },
    {
      id: 4,
      company: "Digital Experts",
      position: "Digital Marketing Intern",
      industry: "Marketing",
      deadline: "May 5, 2025",
      location: "Cairo, Egypt",
    },
    {
      id: 5,
      company: "Smart Technologies",
      position: "IoT Developer Intern",
      industry: "Engineering",
      deadline: "May 10, 2025",
      location: "Giza, Egypt",
    },
    {
      id: 6,
      company: "Creative Solutions",
      position: "Graphic Design Intern",
      industry: "Design",
      deadline: "April 28, 2025",
      location: "Cairo, Egypt",
    },
  ]

  // Filter available internships based on search query and industry filter
  const filteredInternships = availableInternships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesIndustry = industryFilter === "all" || internship.industry === industryFilter

    return matchesSearch && matchesIndustry
  })

  return (
    <Tabs defaultValue="available" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="available">Available Internships</TabsTrigger>
        <TabsTrigger value="applications">My Applications</TabsTrigger>
      </TabsList>

      <TabsContent value="available" className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <Input
              placeholder="Search by company, position, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{internship.position}</CardTitle>
                    <CardDescription>{internship.company}</CardDescription>
                  </div>
                  <Badge>{internship.industry}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span>{internship.deadline}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-medium">No internships found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="applications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track the status of your internship applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{application.position}</p>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                    <p className="text-xs text-muted-foreground">Applied on: {application.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        application.status === "Accepted"
                          ? "outline"
                          : application.status === "Under Review"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {application.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
