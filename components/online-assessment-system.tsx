"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function OnlineAssessmentSystem() {
  const { toast } = useToast()
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [assessmentInProgress, setAssessmentInProgress] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [shareScore, setShareScore] = useState<boolean>(false)

  // Dummy data
  const availableAssessments = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics, functions, and ES6 features.",
      duration: 45, // minutes
      questions: 25,
      difficulty: "Intermediate",
      skills: ["JavaScript", "ES6", "Functions", "Arrays", "Objects"],
      category: "Web Development",
    },
    {
      id: "2",
      title: "React Development",
      description: "Assessment covering React components, hooks, state management, and best practices.",
      duration: 60,
      questions: 30,
      difficulty: "Advanced",
      skills: ["React", "Hooks", "Components", "State Management", "Context API"],
      category: "Web Development",
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      description: "Test your understanding of user interface design, usability, and user experience concepts.",
      duration: 40,
      questions: 20,
      difficulty: "Intermediate",
      skills: ["UI Design", "UX Design", "Usability", "Accessibility", "Design Thinking"],
      category: "Design",
    },
    {
      id: "4",
      title: "Python Programming",
      description: "Assessment on Python syntax, data structures, functions, and object-oriented programming.",
      duration: 50,
      questions: 30,
      difficulty: "Beginner",
      skills: ["Python", "Data Structures", "Functions", "OOP", "Error Handling"],
      category: "Programming",
    },
  ]

  const completedAssessments = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      completedDate: "March 15, 2025",
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      badge: "Advanced",
      shared: true,
    },
    {
      id: "2",
      title: "React Development",
      completedDate: "March 20, 2025",
      score: 85,
      totalQuestions: 30,
      correctAnswers: 25,
      badge: "Intermediate",
      shared: true,
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      completedDate: "March 25, 2025",
      score: 78,
      totalQuestions: 20,
      correctAnswers: 15,
      badge: "Intermediate",
      shared: false,
    },
  ]

  // Dummy assessment questions
  const assessmentQuestions = [
    {
      id: "q1",
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: "a", text: "String" },
        { id: "b", text: "Boolean" },
        { id: "c", text: "Float" },
        { id: "d", text: "Symbol" },
      ],
      correctAnswer: "c",
    },
    {
      id: "q2",
      question: "What is the output of: console.log(typeof [])?",
      options: [
        { id: "a", text: "array" },
        { id: "b", text: "object" },
        { id: "c", text: "Array" },
        { id: "d", text: "undefined" },
      ],
      correctAnswer: "b",
    },
    {
      id: "q3",
      question: "Which method is used to add an element to the end of an array?",
      options: [
        { id: "a", text: "push()" },
        { id: "b", text: "append()" },
        { id: "c", text: "add()" },
        { id: "d", text: "insert()" },
      ],
      correctAnswer: "a",
    },
    {
      id: "q4",
      question: "What does the 'use strict' directive do in JavaScript?",
      options: [
        { id: "a", text: "Enforces stricter parsing and error handling" },
        { id: "b", text: "Makes the code run faster" },
        { id: "c", text: "Allows the use of deprecated features" },
        { id: "d", text: "Prevents the use of modern JavaScript features" },
      ],
      correctAnswer: "a",
    },
    {
      id: "q5",
      question: "Which of the following is a correct way to create a function in JavaScript?",
      options: [
        { id: "a", text: "function = myFunction() {}" },
        { id: "b", text: "function myFunction() {}" },
        { id: "c", text: "function:myFunction() {}" },
        { id: "d", text: "new Function = myFunction() {}" },
      ],
      correctAnswer: "b",
    },
  ]

  const selectedAssessmentData = availableAssessments.find((assessment) => assessment.id === selectedAssessment)

  const handleStartAssessment = () => {
    if (!selectedAssessmentData) return

    setAssessmentInProgress(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResults(false)
    setTimeRemaining(selectedAssessmentData.duration * 60) // Convert minutes to seconds

    // In a real application, you would start a timer here
    toast({
      title: "Assessment Started",
      description: `You have ${selectedAssessmentData.duration} minutes to complete this assessment.`,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // End of assessment
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitAssessment = () => {
    setAssessmentInProgress(false)
    setShowResults(true)

    toast({
      title: "Assessment Completed",
      description: "Your assessment has been submitted successfully.",
    })

    // In a real application, you would calculate the score and save the results
  }

  const handleShareScore = () => {
    setShareScore(!shareScore)

    toast({
      title: shareScore ? "Score Hidden" : "Score Shared",
      description: shareScore
        ? "Your assessment score has been hidden from your profile."
        : "Your assessment score has been added to your profile.",
    })

    // In a real application, you would update the user's profile
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const renderAssessmentContent = () => {
    if (!selectedAssessmentData) return null

    if (assessmentInProgress) {
      const currentQuestionData = assessmentQuestions[currentQuestion]

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </p>
              <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} className="h-2 mt-2 w-32" />
            </div>
            <div className="text-sm font-medium">Time Remaining: {formatTime(timeRemaining)}</div>
          </div>

          <div className="p-4 border rounded-md">
            <p className="font-medium mb-4">{currentQuestionData.question}</p>

            <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {currentQuestionData.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>

            {currentQuestion < assessmentQuestions.length - 1 ? (
              <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmitAssessment}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      )
    }

    if (showResults) {
      // Dummy results - in a real application, this would be calculated
      const score = 85
      const correctAnswers = 21
      const totalQuestions = 25

      return (
        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-md border border-green-200 dark:border-green-900 text-center">
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Assessment Completed!</h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              You scored {score}% ({correctAnswers}/{totalQuestions} correct)
            </p>

            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-700 dark:text-green-300">{score}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="share-score" checked={shareScore} onCheckedChange={(checked) => setShareScore(!!checked)} />
              <label htmlFor="share-score" className="text-sm font-medium">
                Add this score to my profile
              </label>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false)
                  setSelectedAssessment(null)
                }}
              >
                Back to Assessments
              </Button>

              <Button onClick={handleShareScore}>
                {shareScore ? "Hide Score from Profile" : "Add Score to Profile"}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg">{selectedAssessmentData.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{selectedAssessmentData.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-sm">{selectedAssessmentData.duration} minutes</p>
          </div>

          <div>
            <p className="text-sm font-medium">Questions</p>
            <p className="text-sm">{selectedAssessmentData.questions} questions</p>
          </div>

          <div>
            <p className="text-sm font-medium">Difficulty</p>
            <p className="text-sm">{selectedAssessmentData.difficulty}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Category</p>
            <p className="text-sm">{selectedAssessmentData.category}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Skills Tested</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAssessmentData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm font-medium mb-2">Assessment Rules</p>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>You have {selectedAssessmentData.duration} minutes to complete the assessment.</li>
            <li>You can navigate between questions using the Next and Previous buttons.</li>
            <li>You can review your answers before submitting.</li>
            <li>Once submitted, you cannot retake the assessment.</li>
            <li>Your score will be displayed immediately after submission.</li>
          </ul>
        </div>

        <Button
          onClick={handleStartAssessment}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Start Assessment
        </Button>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Online Assessments</CardTitle>
        <CardDescription>Take assessments to verify your skills and showcase them on your profile</CardDescription>
      </CardHeader>
      <CardContent>
        {assessmentInProgress || showResults ? (
          <div>{renderAssessmentContent()}</div>
        ) : (
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Available Assessments</TabsTrigger>
              <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4 pt-4">
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Card className="border shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Assessment Library</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {availableAssessments.map((assessment) => (
                        <div
                          key={assessment.id}
                          className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                            selectedAssessment === assessment.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedAssessment(assessment.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{assessment.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{assessment.category}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs mr-2">
                                {assessment.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{assessment.duration} min</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow">
                  {selectedAssessment ? (
                    <>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedAssessmentData?.title}</CardTitle>
                            <CardDescription>{selectedAssessmentData?.category}</CardDescription>
                          </div>
                          <Badge variant="outline">{selectedAssessmentData?.difficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">{renderAssessmentContent()}</CardContent>
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
                      <p className="text-muted-foreground">Select an assessment to view details</p>
                    </CardContent>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedAssessments.map((assessment) => (
                  <Card key={assessment.id} className="border shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
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
                        <div className="text-muted-foreground">
                          {assessment.shared ? "Added to Profile" : "Not on Profile"}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline">{assessment.shared ? "Hide from Profile" : "Add to Profile"}</Button>
                    </CardFooter>
                  </Card>
                ))}

                {completedAssessments.length === 0 && (
                  <div className="col-span-full p-6 text-center">
                    <p className="text-muted-foreground">You haven't completed any assessments yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
