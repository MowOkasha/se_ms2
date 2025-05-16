"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function ProStudentFeatures() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("profile-views")

  // Dummy data
  const profileViews = [
    {
      id: "1",
      company: "Tech Innovations Inc.",
      viewDate: "May 10, 2025",
      viewTime: "2:45 PM",
      industry: "Information Technology",
      logo: "TI",
    },
    {
      id: "2",
      company: "Global Solutions",
      viewDate: "May 8, 2025",
      viewTime: "11:20 AM",
      industry: "Engineering",
      logo: "GS",
    },
    {
      id: "3",
      company: "Future Systems",
      viewDate: "May 5, 2025",
      viewTime: "4:15 PM",
      industry: "Information Technology",
      logo: "FS",
    },
  ]

  const careerProgress = {
    internshipsCompleted: 2,
    totalRequired: 3,
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 75 },
      { name: "UI/UX Design", level: 90 },
      { name: "Python", level: 60 },
      { name: "Problem Solving", level: 80 },
    ],
    assessments: [
      { name: "JavaScript Fundamentals", score: 92 },
      { name: "React Development", score: 85 },
      { name: "UI/UX Design Principles", score: 78 },
    ],
  }

  const careerInsights = [
    {
      id: "1",
      title: "Top Skills in Demand",
      description: "Based on your profile and internship history, these skills are most in demand in your field:",
      items: ["React", "Node.js", "UI/UX Design", "Data Analysis", "Cloud Services"],
    },
    {
      id: "2",
      title: "Recommended Career Paths",
      description: "Based on your skills and interests, these career paths might be a good fit:",
      items: ["Frontend Developer", "UX/UI Designer", "Full Stack Developer", "Product Manager", "Web Developer"],
    },
    {
      id: "3",
      title: "Industry Trends",
      description: "Current trends in your field of interest:",
      items: [
        "Remote work opportunities increasing",
        "Growing demand for React developers",
        "Emphasis on UI/UX skills",
        "Increasing adoption of cloud technologies",
        "Rise of AI-powered development tools",
      ],
    },
  ]

  const handleContactCompany = (companyId: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the company.",
    })
  }

  const handleDownloadInsights = () => {
    toast({
      title: "Insights Downloaded",
      description: "Career insights report has been downloaded as a PDF.",
    })
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>PRO Student Features</CardTitle>
            <CardDescription>Exclusive features for PRO students who have completed internships</CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">PRO</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile-views" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile-views" onClick={() => setSelectedTab("profile-views")}>
              Profile Views
            </TabsTrigger>
            <TabsTrigger value="career-progress" onClick={() => setSelectedTab("career-progress")}>
              Career Progress
            </TabsTrigger>
            <TabsTrigger value="career-insights" onClick={() => setSelectedTab("career-insights")}>
              Career Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile-views" className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Companies That Viewed Your Profile</h3>
              <Badge variant="outline">{profileViews.length} views this month</Badge>
            </div>

            <div className="space-y-4">
              {profileViews.map((view) => (
                <Card key={view.id} className="border shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{view.logo}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{view.company}</p>
                          <p className="text-sm text-muted-foreground">{view.industry}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-muted-foreground">
                              Viewed on {view.viewDate} at {view.viewTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleContactCompany(view.id)}>
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">PRO Tip</h4>
              <p className="text-sm text-muted-foreground">
                Companies that view your profile are often interested in your skills and experience. Consider reaching
                out to them proactively to express your interest in potential opportunities.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="career-progress" className="space-y-6 pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Internship Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {careerProgress.internshipsCompleted} of {careerProgress.totalRequired} internships completed
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round((careerProgress.internshipsCompleted / careerProgress.totalRequired) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(careerProgress.internshipsCompleted / careerProgress.totalRequired) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Skills Progress</h3>
                <div className="space-y-4">
                  {careerProgress.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Assessment Scores</h3>
                <div className="space-y-4">
                  {careerProgress.assessments.map((assessment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{assessment.name}</span>
                        <span className="text-sm">{assessment.score}%</span>
                      </div>
                      <Progress value={assessment.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">PRO Tip</h4>
              <p className="text-sm text-muted-foreground">
                Focus on improving your skills in areas where you score lower. Consider taking additional online courses
                or workshops to strengthen these areas and make your profile more attractive to potential employers.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="career-insights" className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Personalized Career Insights</h3>
              <Button variant="outline" size="sm" onClick={handleDownloadInsights}>
                Download Report
              </Button>
            </div>

            <div className="space-y-4">
              {careerInsights.map((insight) => (
                <Card key={insight.id} className="border shadow">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {insight.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">PRO Tip</h4>
              <p className="text-sm text-muted-foreground">
                These insights are generated based on your profile, skills, and internship history. Keep your profile
                updated and complete more assessments to receive more accurate and personalized career recommendations.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          PRO features are available to students who have completed at least 2 internships through the GUC Internship
          System.
        </p>
      </CardFooter>
    </Card>
  )
}
