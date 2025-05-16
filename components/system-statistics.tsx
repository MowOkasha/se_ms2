"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export function SystemStatistics() {
  const { toast } = useToast()
  const [cycle, setCycle] = useState<string>("current")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  })

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "The statistics report has been generated and downloaded.",
    })
    // In a real application, you would generate and download a report here
  }

  // Dummy data for charts
  const reportStatusData = [
    { name: "Accepted", value: 65 },
    { name: "Rejected", value: 15 },
    { name: "Flagged", value: 10 },
    { name: "Pending", value: 10 },
  ]

  const topCompaniesData = [
    { name: "Tech Innovations", value: 24 },
    { name: "Global Solutions", value: 18 },
    { name: "Future Systems", value: 16 },
    { name: "Digital Experts", value: 12 },
    { name: "Smart Technologies", value: 10 },
  ]

  const reviewTimeData = [
    { name: "Jan", value: 4.2 },
    { name: "Feb", value: 3.8 },
    { name: "Mar", value: 5.1 },
    { name: "Apr", value: 3.5 },
    { name: "May", value: 2.9 },
    { name: "Jun", value: 3.2 },
  ]

  const courseUsageData = [
    { name: "Web Development", value: 42 },
    { name: "Data Structures", value: 38 },
    { name: "UI/UX Design", value: 34 },
    { name: "Database Systems", value: 28 },
    { name: "Software Engineering", value: 26 },
    { name: "Mobile Development", value: 22 },
    { name: "Machine Learning", value: 18 },
  ]

  const monthlyApplicationsData = [
    { name: "Jan", applications: 45, placements: 32 },
    { name: "Feb", applications: 52, placements: 38 },
    { name: "Mar", applications: 68, placements: 45 },
    { name: "Apr", applications: 72, placements: 50 },
    { name: "May", applications: 58, placements: 42 },
    { name: "Jun", applications: 48, placements: 36 },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>System Statistics</CardTitle>
              <CardDescription>
                View real-time statistics and generate reports for the GUC Internship System
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={cycle} onValueChange={setCycle}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Cycle (Spring 2025)</SelectItem>
                  <SelectItem value="previous">Previous Cycle (Fall 2024)</SelectItem>
                  <SelectItem value="all">All Cycles</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleGenerateReport}>Generate Report</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-xs text-muted-foreground">+12% from last cycle</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">487</div>
                    <p className="text-xs text-muted-foreground">+8% from last cycle</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Partner Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68</div>
                    <p className="text-xs text-muted-foreground">+5 new this cycle</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">PRO Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">352</div>
                    <p className="text-xs text-muted-foreground">+15% from last cycle</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Applications & Placements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={monthlyApplicationsData}
                      categories={["applications", "placements"]}
                      index="name"
                      colors={["blue", "green"]}
                      valueFormatter={(value) => `${value} students`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Companies by Internship Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={topCompaniesData}
                      categories={["value"]}
                      index="name"
                      colors={["purple"]}
                      valueFormatter={(value) => `${value} interns`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={reportStatusData}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Review Time (Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={reviewTimeData}
                      categories={["value"]}
                      index="name"
                      colors={["cyan"]}
                      valueFormatter={(value) => `${value} days`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Reports</p>
                      <p className="text-2xl font-bold">432</p>
                      <p className="text-xs text-muted-foreground">+18% from last cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Average Length</p>
                      <p className="text-2xl font-bold">1,850 words</p>
                      <p className="text-xs text-muted-foreground">+5% from last cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Average Review Time</p>
                      <p className="text-2xl font-bold">3.8 days</p>
                      <p className="text-xs text-muted-foreground">-12% from last cycle</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="companies" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Rated Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { name: "Tech Innovations", value: 4.8 },
                        { name: "Future Systems", value: 4.7 },
                        { name: "Digital Experts", value: 4.5 },
                        { name: "Global Solutions", value: 4.3 },
                        { name: "Smart Technologies", value: 4.2 },
                      ]}
                      categories={["value"]}
                      index="name"
                      colors={["amber"]}
                      valueFormatter={(value) => `${value}/5`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Companies by Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { name: "Information Technology", value: 42 },
                        { name: "Engineering", value: 28 },
                        { name: "Healthcare", value: 15 },
                        { name: "Finance", value: 10 },
                        { name: "Education", value: 5 },
                      ]}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Companies</p>
                      <p className="text-2xl font-bold">68</p>
                      <p className="text-xs text-muted-foreground">+8% from last cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">New Companies</p>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground">This cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Average Rating</p>
                      <p className="text-2xl font-bold">4.3/5</p>
                      <p className="text-xs text-muted-foreground">+0.2 from last cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Internship Positions</p>
                      <p className="text-2xl font-bold">215</p>
                      <p className="text-xs text-muted-foreground">Currently active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Students by Major</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { name: "Computer Science", value: 35 },
                        { name: "Media Engineering", value: 25 },
                        { name: "Business Informatics", value: 20 },
                        { name: "DMET", value: 15 },
                        { name: "Other", value: 5 },
                      ]}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Internship Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={[
                        { name: "Not Started", value: 45 },
                        { name: "In Progress", value: 30 },
                        { name: "Completed", value: 25 },
                      ]}
                      category="value"
                      index="name"
                      valueFormatter={(value) => `${value}%`}
                      className="h-[300px]"
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Students</p>
                      <p className="text-2xl font-bold">1,245</p>
                      <p className="text-xs text-muted-foreground">+12% from last cycle</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">PRO Students</p>
                      <p className="text-2xl font-bold">352</p>
                      <p className="text-xs text-muted-foreground">28% of total</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Average GPA</p>
                      <p className="text-2xl font-bold">3.4</p>
                      <p className="text-xs text-muted-foreground">Of students with internships</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Application Success Rate</p>
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-xs text-muted-foreground">+5% from last cycle</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Most Frequently Used Courses in Internships</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={courseUsageData}
                    categories={["value"]}
                    index="name"
                    colors={["indigo"]}
                    valueFormatter={(value) => `${value} mentions`}
                    className="h-[400px]"
                  />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Courses by Major</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">Computer Science</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Data Structures</span>
                            <span className="text-sm">42 mentions</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Algorithms</span>
                            <span className="text-sm">38 mentions</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Database Systems</span>
                            <span className="text-sm">35 mentions</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">Media Engineering</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Web Development</span>
                            <span className="text-sm">40 mentions</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">UI/UX Design</span>
                            <span className="text-sm">36 mentions</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Mobile Development</span>
                            <span className="text-sm">28 mentions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Course Relevance by Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">Information Technology</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Web Development</span>
                            <span className="text-sm">High relevance</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Software Engineering</span>
                            <span className="text-sm">High relevance</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">Finance</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Data Analysis</span>
                            <span className="text-sm">High relevance</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Machine Learning</span>
                            <span className="text-sm">Medium relevance</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">Healthcare</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Database Systems</span>
                            <span className="text-sm">High relevance</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">UI/UX Design</span>
                            <span className="text-sm">Medium relevance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
