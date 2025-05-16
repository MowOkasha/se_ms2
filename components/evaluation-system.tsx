"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { StarIcon } from "lucide-react"

interface EvaluationSystemProps {
  type: "company" | "student"
}

export function EvaluationSystem({ type }: EvaluationSystemProps) {
  const { toast } = useToast()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [rating, setRating] = useState<number>(0)
  const [recommend, setRecommend] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>("")

  // Dummy data
  const companyEvaluations = [
    {
      id: "1",
      name: "Tech Innovations Inc.",
      position: "Frontend Developer Intern",
      period: "Feb 15, 2025 - May 15, 2025",
      status: "Completed",
      evaluated: false,
    },
    {
      id: "2",
      name: "Global Solutions",
      position: "Mobile App Developer Intern",
      period: "Jun 1, 2024 - Aug 30, 2024",
      status: "Completed",
      evaluated: true,
      rating: 4,
      recommend: true,
      feedback:
        "Great learning experience with supportive mentors. The company has a positive work culture and provides valuable feedback. Would recommend to other students interested in mobile development.",
    },
  ]

  const studentEvaluations = [
    {
      id: "1",
      name: "Ahmed Mohamed",
      position: "Frontend Developer Intern",
      period: "Feb 15, 2025 - May 15, 2025",
      status: "Current Intern",
      evaluated: false,
    },
    {
      id: "2",
      name: "Sara Ahmed",
      position: "Mobile App Developer Intern",
      period: "Jun 1, 2024 - Aug 30, 2024",
      status: "Completed",
      evaluated: true,
      rating: 5,
      feedback:
        "Sara demonstrated exceptional skills in mobile app development. She quickly adapted to our tech stack and contributed valuable features to our project. Her communication skills and problem-solving abilities were outstanding.",
    },
  ]

  const evaluationItems = type === "company" ? companyEvaluations : studentEvaluations
  const selectedEvaluation = evaluationItems.find((item) => item.id === selectedItem)

  const handleSubmitEvaluation = () => {
    toast({
      title: "Evaluation Submitted",
      description: `Your evaluation for ${selectedEvaluation?.name} has been submitted successfully.`,
    })
    // In a real application, you would make an API call here
  }

  const renderEvaluationForm = () => {
    if (!selectedEvaluation) return null

    if (selectedEvaluation.evaluated) {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-1">
            <p className="font-medium">Your Rating:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= (selectedEvaluation.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {type === "company" && selectedEvaluation.recommend !== undefined && (
            <div>
              <p className="font-medium">Recommended:</p>
              <p>{selectedEvaluation.recommend ? "Yes" : "No"}</p>
            </div>
          )}

          <div>
            <p className="font-medium">Feedback:</p>
            <p className="text-muted-foreground">{selectedEvaluation.feedback}</p>
          </div>

          <Button variant="outline">Edit Evaluation</Button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                <StarIcon
                  className={`h-6 w-6 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>

        {type === "company" && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="recommend" checked={recommend} onCheckedChange={(checked) => setRecommend(!!checked)} />
              <label
                htmlFor="recommend"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I recommend this company to other students
              </label>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            placeholder={`Share your experience ${type === "company" ? "with this company" : "with this student"}`}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
          />
        </div>

        {type === "company" && (
          <div className="space-y-2">
            <Label>Which courses helped you during this internship?</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Web Development",
                "Data Structures",
                "Algorithms",
                "UI/UX Design",
                "Database Systems",
                "Software Engineering",
              ].map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox id={`course-${course}`} />
                  <label htmlFor={`course-${course}`} className="text-sm">
                    {course}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === "student" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Technical Skills</Label>
              <RadioGroup defaultValue="average">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="technical-poor" />
                  <Label htmlFor="technical-poor">Poor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="technical-average" />
                  <Label htmlFor="technical-average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="technical-good" />
                  <Label htmlFor="technical-good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="technical-excellent" />
                  <Label htmlFor="technical-excellent">Excellent</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Communication Skills</Label>
              <RadioGroup defaultValue="good">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="communication-poor" />
                  <Label htmlFor="communication-poor">Poor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="communication-average" />
                  <Label htmlFor="communication-average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="communication-good" />
                  <Label htmlFor="communication-good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="communication-excellent" />
                  <Label htmlFor="communication-excellent">Excellent</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmitEvaluation}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Submit Evaluation
        </Button>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>{type === "company" ? "Company Evaluations" : "Student Evaluations"}</CardTitle>
        <CardDescription>
          {type === "company"
            ? "Evaluate your internship experience with companies"
            : "Evaluate students who completed internships at your company"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending Evaluations</TabsTrigger>
            <TabsTrigger value="completed">Completed Evaluations</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 pt-4">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              <Card className="border shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">
                    {type === "company" ? "Internships to Evaluate" : "Students to Evaluate"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {evaluationItems
                      .filter((item) => !item.evaluated)
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                            selectedItem === item.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback>
                              {item.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{item.position}</p>
                            <p className="text-xs text-muted-foreground">{item.period}</p>
                          </div>
                          <Badge variant={item.status === "Completed" ? "outline" : "secondary"}>{item.status}</Badge>
                        </div>
                      ))}
                    {evaluationItems.filter((item) => !item.evaluated).length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No pending evaluations</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow">
                {selectedItem && !selectedEvaluation?.evaluated ? (
                  <>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedEvaluation?.name}</CardTitle>
                          <CardDescription>
                            {selectedEvaluation?.position} • {selectedEvaluation?.period}
                          </CardDescription>
                        </div>
                        <Badge variant={selectedEvaluation?.status === "Completed" ? "outline" : "secondary"}>
                          {selectedEvaluation?.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">{renderEvaluationForm()}</CardContent>
                  </>
                ) : selectedItem && selectedEvaluation?.evaluated ? (
                  <>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedEvaluation?.name}</CardTitle>
                          <CardDescription>
                            {selectedEvaluation?.position} • {selectedEvaluation?.period}
                          </CardDescription>
                        </div>
                        <Badge variant="success">Evaluated</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">{renderEvaluationForm()}</CardContent>
                  </>
                ) : (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="text-muted-foreground">
                      {type === "company"
                        ? "Select an internship to evaluate your experience"
                        : "Select a student to evaluate their performance"}
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 pt-4">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              <Card className="border shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Completed Evaluations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {evaluationItems
                      .filter((item) => item.evaluated)
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                            selectedItem === item.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback>
                              {item.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{item.position}</p>
                            <p className="text-xs text-muted-foreground">{item.period}</p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= (item.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    {evaluationItems.filter((item) => item.evaluated).length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No completed evaluations</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow">
                {selectedItem && selectedEvaluation?.evaluated ? (
                  <>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedEvaluation?.name}</CardTitle>
                          <CardDescription>
                            {selectedEvaluation?.position} • {selectedEvaluation?.period}
                          </CardDescription>
                        </div>
                        <Badge variant="success">Evaluated</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">{renderEvaluationForm()}</CardContent>
                  </>
                ) : (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="text-muted-foreground">Select an evaluation to view details</p>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
