"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface WorkshopManagementProps {
  userType?: "student" | "faculty" | "scad" | "company" | "pro"
}

export function WorkshopManagement({ userType = "student" }: WorkshopManagementProps) {
  const { toast } = useToast()
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [workshopTitle, setWorkshopTitle] = useState("")
  const [workshopDescription, setWorkshopDescription] = useState("")
  const [speakerName, setSpeakerName] = useState("")
  const [speakerBio, setSpeakerBio] = useState("")
  const [workshopDate, setWorkshopDate] = useState<Date | undefined>(new Date())
  const [workshopStartTime, setWorkshopStartTime] = useState("")
  const [workshopEndTime, setWorkshopEndTime] = useState("")
  const [workshopType, setWorkshopType] = useState("live")
  const [workshopAgenda, setWorkshopAgenda] = useState("")
  const [workshopCapacity, setWorkshopCapacity] = useState("50")
  const [workshopRating, setWorkshopRating] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [noteText, setNoteText] = useState("")

  // Dummy data
  const upcomingWorkshops = [
    {
      id: "1",
      title: "Resume Building for Tech Internships",
      date: "May 20, 2025",
      time: "2:00 PM - 4:00 PM",
      speaker: "Dr. Mervat Abuelkheir",
      speakerRole: "Career Development Advisor",
      speakerInitials: "MA",
      location: "Online (Zoom)",
      type: "Live",
      registrations: 45,
      description:
        "Learn how to create a standout resume that highlights your technical skills and academic achievements. This workshop will cover formatting, content, and tailoring your resume for tech companies.",
      agenda: [
        "Introduction to tech resumes",
        "Key sections and formatting",
        "Highlighting technical skills",
        "Tailoring for specific companies",
        "Common mistakes to avoid",
        "Q&A session",
      ],
      isRegistered: true,
    },
    {
      id: "2",
      title: "Mastering Technical Interviews",
      date: "May 25, 2025",
      time: "3:00 PM - 5:00 PM",
      speaker: "Eng. Yasmine Elbehairy",
      speakerRole: "Senior Software Engineer at Google",
      speakerInitials: "YE",
      location: "Online (Zoom)",
      type: "Live",
      registrations: 62,
      description:
        "Prepare for technical interviews with this comprehensive workshop. Topics include common algorithms, data structures, problem-solving strategies, and behavioral interview questions.",
      agenda: [
        "Technical interview formats",
        "Algorithm fundamentals",
        "Data structure review",
        "Problem-solving approaches",
        "Behavioral questions",
        "Mock interview practice",
      ],
      isRegistered: false,
    },
  ]

  const pastWorkshops = [
    {
      id: "3",
      title: "Introduction to Project Management",
      date: "April 10, 2025",
      speaker: "Eng. Nada Ibrahim",
      speakerRole: "Project Manager at Microsoft",
      speakerInitials: "NI",
      type: "Recorded",
      attended: true,
      certificate: true,
      rating: 4,
      feedback: "Very informative workshop with practical examples.",
    },
    {
      id: "4",
      title: "Networking for Career Success",
      date: "April 5, 2025",
      speaker: "Dr. Ahmed Badawy",
      speakerRole: "Career Counselor",
      speakerInitials: "AB",
      type: "Recorded",
      attended: true,
      certificate: true,
      rating: 5,
      feedback: "Excellent workshop! Learned many valuable networking strategies.",
    },
  ]

  const chatMessages = [
    { id: "1", user: "Ahmed Mohamed", message: "Is there a recommended format for tech resumes?", time: "2:15 PM" },
    {
      id: "2",
      user: "Dr. Mervat Abuelkheir",
      message:
        "Great question! For tech resumes, I recommend a clean, single-page format that highlights your technical skills and projects first.",
      time: "2:17 PM",
    },
    {
      id: "3",
      user: "Sara Ahmed",
      message: "Should we include all our projects or just the most relevant ones?",
      time: "2:20 PM",
    },
  ]

  const handleCreateWorkshop = () => {
    if (
      !workshopTitle ||
      !workshopDescription ||
      !speakerName ||
      !workshopDate ||
      !workshopStartTime ||
      !workshopEndTime
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Workshop Created",
      description: "The workshop has been created successfully.",
    })

    setShowCreateForm(false)
    // Reset form
    setWorkshopTitle("")
    setWorkshopDescription("")
    setSpeakerName("")
    setSpeakerBio("")
    setWorkshopDate(new Date())
    setWorkshopStartTime("")
    setWorkshopEndTime("")
    setWorkshopType("live")
    setWorkshopAgenda("")
    setWorkshopCapacity("50")
  }

  const handleRegisterWorkshop = (workshopId: string) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for the workshop.",
    })
  }

  const handleJoinLiveWorkshop = (workshopId: string) => {
    toast({
      title: "Joining Workshop",
      description: "Connecting to the live workshop...",
    })
  }

  const handlePlayRecording = () => {
    setIsPlaying(!isPlaying)
    toast({
      title: isPlaying ? "Video Paused" : "Video Playing",
      description: isPlaying ? "The workshop recording has been paused." : "The workshop recording is now playing.",
    })
  }

  const handleSaveNote = () => {
    if (!noteText) return

    toast({
      title: "Note Saved",
      description: "Your note has been saved successfully.",
    })

    setNoteText("")
  }

  const handleSubmitFeedback = () => {
    if (!workshopRating) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating for the workshop.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })

    setShowFeedbackForm(false)
    setWorkshopRating(null)
    setFeedbackText("")
  }

  const handleSendChatMessage = () => {
    if (!chatMessage) return

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the workshop chat.",
    })

    setChatMessage("")
  }

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    })
  }

  const renderWorkshopContent = () => {
    const workshop = [...upcomingWorkshops, ...pastWorkshops].find((w) => w.id === selectedWorkshop)

    if (!workshop) return null

    const isPast = pastWorkshops.some((w) => w.id === selectedWorkshop)
    const isRegistered = "isRegistered" in workshop ? workshop.isRegistered : false
    const hasAttended = "attended" in workshop ? workshop.attended : false
    const hasCertificate = "certificate" in workshop ? workshop.certificate : false

    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg">{workshop.title}</h3>
          <div className="flex items-center mt-1">
            <p className="text-sm text-muted-foreground">
              {workshop.date} {workshop.time ? `• ${workshop.time}` : ""}
            </p>
            <Badge variant={workshop.type === "Live" ? "default" : "secondary"} className="ml-2">
              {workshop.type}
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>{workshop.speakerInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{workshop.speaker}</p>
            <p className="text-sm text-muted-foreground">{workshop.speakerRole}</p>
          </div>
        </div>

        {"description" in workshop && (
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{workshop.description}</p>
          </div>
        )}

        {"agenda" in workshop && (
          <div>
            <h4 className="font-medium mb-2">Agenda</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {workshop.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {"location" in workshop && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">{workshop.location}</p>
            </div>
            <div>
              <p className="font-medium">Registrations</p>
              <p className="text-muted-foreground">{workshop.registrations} students</p>
            </div>
          </div>
        )}

        {isPast && (
          <div className="space-y-4">
            {hasAttended && (
              <div className="flex items-center space-x-2">
                <Badge variant="success">Attended</Badge>
                {hasCertificate && (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Certificate Earned
                  </Badge>
                )}
              </div>
            )}

            {"rating" in workshop && workshop.rating && (
              <div>
                <h4 className="font-medium mb-2">Your Rating</h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        star <= workshop.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">({workshop.rating}/5)</span>
                </div>
              </div>
            )}

            {"feedback" in workshop && workshop.feedback && (
              <div>
                <h4 className="font-medium mb-2">Your Feedback</h4>
                <p className="text-sm text-muted-foreground">{workshop.feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderWorkshopActions = () => {
    const workshop = [...upcomingWorkshops, ...pastWorkshops].find((w) => w.id === selectedWorkshop)

    if (!workshop) return null

    const isPast = pastWorkshops.some((w) => w.id === selectedWorkshop)
    const isRegistered = "isRegistered" in workshop ? workshop.isRegistered : false
    const hasAttended = "attended" in workshop ? workshop.attended : false
    const hasCertificate = "certificate" in workshop ? workshop.certificate : false

    if (isPast) {
      return (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "Pause Recording" : "Play Recording"}
          </Button>

          {hasCertificate && (
            <Button variant="outline" onClick={handleDownloadCertificate}>
              Download Certificate
            </Button>
          )}

          {!("feedback" in workshop && workshop.feedback) && (
            <Button onClick={() => setShowFeedbackForm(true)}>Provide Feedback</Button>
          )}
        </div>
      )
    } else {
      return (
        <div className="flex flex-wrap gap-2">
          {isRegistered ? (
            <>
              <Button variant="outline" onClick={() => handleJoinLiveWorkshop(workshop.id)}>
                Join Workshop
              </Button>
              <Button variant="outline" onClick={() => setShowChatDialog(true)}>
                Open Chat
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleRegisterWorkshop(workshop.id)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              Register Now
            </Button>
          )}
        </div>
      )
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Workshops</CardTitle>
            <CardDescription>
              {userType === "scad"
                ? "Manage and create career development workshops"
                : "Enhance your skills with career development workshops"}
            </CardDescription>
          </div>
          {userType === "scad" && <Button onClick={() => setShowCreateForm(true)}>Create Workshop</Button>}
        </div>
      </CardHeader>
      <CardContent>
        {showCreateForm ? (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Create New Workshop</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="workshop-title">Workshop Title</Label>
                <Input
                  id="workshop-title"
                  value={workshopTitle}
                  onChange={(e) => setWorkshopTitle(e.target.value)}
                  placeholder="Enter workshop title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-type">Workshop Type</Label>
                <Select value={workshopType} onValueChange={setWorkshopType}>
                  <SelectTrigger id="workshop-type">
                    <SelectValue placeholder="Select workshop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="recorded">Pre-recorded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-date">Date</Label>
                <DatePicker date={workshopDate} setDate={setWorkshopDate} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-capacity">Capacity</Label>
                <Input
                  id="workshop-capacity"
                  value={workshopCapacity}
                  onChange={(e) => setWorkshopCapacity(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-start-time">Start Time</Label>
                <Select value={workshopStartTime} onValueChange={setWorkshopStartTime}>
                  <SelectTrigger id="workshop-start-time">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map(
                      (time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop-end-time">End Time</Label>
                <Select value={workshopEndTime} onValueChange={setWorkshopEndTime}>
                  <SelectTrigger id="workshop-end-time">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map(
                      (time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop-description">Description</Label>
              <Textarea
                id="workshop-description"
                value={workshopDescription}
                onChange={(e) => setWorkshopDescription(e.target.value)}
                placeholder="Enter workshop description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="speaker-name">Speaker Name</Label>
                <Input
                  id="speaker-name"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  placeholder="Enter speaker name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speaker-role">Speaker Role</Label>
                <Input
                  id="speaker-role"
                  value={speakerBio}
                  onChange={(e) => setSpeakerBio(e.target.value)}
                  placeholder="Enter speaker role/title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop-agenda">Workshop Agenda</Label>
              <Textarea
                id="workshop-agenda"
                value={workshopAgenda}
                onChange={(e) => setWorkshopAgenda(e.target.value)}
                placeholder="Enter workshop agenda (one item per line)"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Enter each agenda item on a new line</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWorkshop}>Create Workshop</Button>
            </div>
          </div>
        ) : isPlaying ? (
          <div className="space-y-6">
            <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="mt-4">Workshop Recording Playing</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsPlaying(false)}>
                Back to Workshop
              </Button>
              <Button variant="outline" onClick={handlePlayRecording}>
                Pause
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Take Notes</Label>
              <Textarea
                id="note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Take notes while watching the workshop..."
                rows={4}
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveNote}>Save Note</Button>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Workshops</TabsTrigger>
              <TabsTrigger value="past">Past Workshops</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 pt-4">
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Card className="border shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Upcoming Workshops</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {upcomingWorkshops.map((workshop) => (
                        <div
                          key={workshop.id}
                          className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                            selectedWorkshop === workshop.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedWorkshop(workshop.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{workshop.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{workshop.date}</p>
                          </div>
                          <Badge variant={workshop.type === "Live" ? "default" : "secondary"} className="ml-2">
                            {workshop.type}
                          </Badge>
                        </div>
                      ))}
                      {upcomingWorkshops.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No upcoming workshops</div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow">
                  {selectedWorkshop ? (
                    <>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Workshop Details</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">{renderWorkshopContent()}</CardContent>
                      <CardFooter className="p-4">{renderWorkshopActions()}</CardFooter>
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-muted-foreground">Select a workshop to view details</p>
                    </CardContent>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastWorkshops.map((workshop) => (
                  <Card key={workshop.id} className="border shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                        <Badge variant="outline">{workshop.type}</Badge>
                      </div>
                      <CardDescription>{workshop.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarFallback>{workshop.speakerInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{workshop.speaker}</p>
                          <p className="text-xs text-muted-foreground">{workshop.speakerRole}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={workshop.attended ? "success" : "secondary"}>
                          {workshop.attended ? "Attended" : "Missed"}
                        </Badge>
                        {workshop.certificate && (
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Certificate Earned
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="w-full" onClick={() => setSelectedWorkshop(workshop.id)}>
                        View Details
                      </Button>
                      {workshop.certificate && (
                        <Button variant="outline" className="w-full ml-2" onClick={handleDownloadCertificate}>
                          View Certificate
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                {pastWorkshops.length === 0 && (
                  <div className="col-span-full p-6 text-center">
                    <p className="text-muted-foreground">No past workshops</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackForm} onOpenChange={setShowFeedbackForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workshop Feedback</DialogTitle>
            <DialogDescription>Please rate the workshop and provide your feedback.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= (workshopRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setWorkshopRating(star)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts about the workshop..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Certificate of Completion</DialogTitle>
          </DialogHeader>
          <div className="p-6 border rounded-md text-center space-y-6">
            <div className="text-2xl font-bold">Certificate of Completion</div>
            <div className="text-lg">This is to certify that</div>
            <div className="text-xl font-semibold">Ahmed Mohamed</div>
            <div className="text-lg">has successfully completed the workshop</div>
            <div className="text-xl font-semibold">Introduction to Project Management</div>
            <div className="text-lg">on April 10, 2025</div>
            <div className="flex justify-center mt-8">
              <div className="border-b border-black w-48 text-center">
                <p className="mt-2 text-sm">Dr. Mervat Abuelkheir</p>
                <p className="text-xs">SCAD Officer</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleDownloadCertificate}>Download Certificate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Workshop Chat</DialogTitle>
            <DialogDescription>Chat with the speaker and other attendees</DialogDescription>
          </DialogHeader>
          <div className="h-[300px] overflow-y-auto border rounded-md p-4 space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{message.user}</p>
                    <p className="text-xs text-muted-foreground ml-2">{message.time}</p>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendChatMessage}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
