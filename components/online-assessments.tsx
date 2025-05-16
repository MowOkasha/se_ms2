"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface OnlineAssessmentsProps {
  isPro?: boolean
}

export function OnlineAssessments({ isPro = false }: OnlineAssessmentsProps) {
  // Dummy data
  const availableAssessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics, functions, and ES6 features.",
      duration: "45 minutes",
      questions: 25,
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "React Development",
      description: "Assessment covering React components, hooks, state management, and best practices.",
      duration: "60 minutes",
      questions: 30,
      difficulty: "Advanced",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Test your understanding of user interface design, usability, and user experience concepts.",
      duration: "40 minutes",
      questions: 20,
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Python Programming",
      description: "Assessment on Python syntax, data structures, functions, and object-oriented programming.",
      duration: "50 minutes",
      questions: 30,
      difficulty: "Beginner",
    },
  ]

  const completedAssessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      completedDate: "March 15, 2025",
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      badge: "Advanced",
    },
    {
      id: 2,
      title: "React Development",
      completedDate: "March 20, 2025",
      score: 85,
      totalQuestions: 30,
      correctAnswers: 25,
      badge: "Intermediate",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      completedDate: "March 25, 2025",
      score: 78,
      totalQuestions: 20,
      correctAnswers: 15,
      badge: "Intermediate",
    },
  ]

  return (
    <Tabs defaultValue={isPro ? "completed" : "available"} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="available">Available Assessments</TabsTrigger>
        <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
      </TabsList>
      <TabsContent value="available" className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {availableAssessments.map((assessment) => (
            <Card key={assessment.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{assessment.title}</CardTitle>
                  <Badge>{assessment.difficulty}</Badge>
                </div>
                <CardDescription>{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration:</p>
                    <p>{assessment.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Questions:</p>
                    <p>{assessment.questions}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Start Assessment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="completed" className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {completedAssessments.map((assessment) => (
            <Card key={assessment.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{assessment.title}</CardTitle>
                  <Badge variant="outline">{assessment.badge}</Badge>
                </div>
                <CardDescription>Completed on {assessment.completedDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Score: {assessment.score}%</span>
                    <span className="text-sm text-muted-foreground">
                      {assessment.correctAnswers}/{assessment.totalQuestions} correct
                    </span>
                  </div>
                  <Progress value={assessment.score} className="h-2" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    {assessment.score >= 90 ? (
                      <Badge className="bg-green-500">Excellent</Badge>
                    ) : assessment.score >= 75 ? (
                      <Badge className="bg-blue-500">Good</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Satisfactory</Badge>
                    )}
                  </div>
                  <div className="text-muted-foreground">{isPro ? "Verified Skill" : "Add to Profile"}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button variant="outline">Download Certificate</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
