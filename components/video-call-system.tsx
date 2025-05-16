"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  Camera,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  CalendarPlus2Icon as CalendarIcon2,
  Clock,
  Users,
  Plus,
} from "lucide-react"

// Mock data for demonstration
const mockAppointments = [
  {
    id: 1,
    title: "Interview with TechCorp",
    date: "2023-05-20",
    time: "10:00 AM",
    duration: 30,
    status: "scheduled",
    participant: {
      name: "John Smith",
      role: "HR Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "Follow-up with Global Innovations",
    date: "2023-05-22",
    time: "2:30 PM",
    duration: 45,
    status: "scheduled",
    participant: {
      name: "Sarah Johnson",
      role: "Technical Lead",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "Project Discussion with Digital Dynamics",
    date: "2023-05-18",
    time: "11:00 AM",
    duration: 60,
    status: "completed",
    participant: {
      name: "Michael Brown",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
]

export function VideoCallSystem() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [inCall, setInCall] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<any>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsMicOn] = useState(true);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("30");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [participant, setParticipant] = useState("");

  const handleJoinCall = (appointment: any) => {
    setActiveAppointment(appointment);
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    setActiveAppointment(null);
    
    // Update appointment status if it was active
    if (activeAppointment) {
      const updatedAppointments = appointments.map(app => 
        app.id === activeAppointment.id ? { ...app, status: "completed" } : app
      );
      setAppointments(updatedAppointments);
    }
  };

  const handleScheduleAppointment = () => {
    if (!date || !selectedTime || !title || !participant) return;
    
    const newAppointment = {
      id: appointments.length + 1,
      title,
      date: format(date, "yyyy-MM-dd"),
      time: selectedTime,
      duration: Number.parseInt(duration),
      status: "scheduled",
      participant: {
        name: participant,
        role: "Company Representative",
        avatar: "/placeholder.svg?height=40&width=40"
      }
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowScheduleDialog(false);
    setTitle("");
    setDate(new Date());
    setSelectedTime("");
    setDuration("30");
    setNotes("");
    setParticipant("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="text-blue-500 border-blue-500"><Clock className="h-3 w-3 mr-1" /> Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === "upcoming") {
      return appointment.status === "scheduled";
    } else if (activeTab === "completed") {
      return appointment.status === "completed";
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {inCall ? (
        <Card className="border-2 border-primary">
          <CardHeader className="bg-primary/5">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{activeAppointment?.title}</CardTitle>
                <CardDescription>
                  {activeAppointment?.date} at {activeAppointment?.time} ({activeAppointment?.duration} minutes)
                </CardDescription>
              </div>
              <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="opacity-50">Video feed would appear here</p>
                </div>
              </div>
              
              {/* Participant video */}
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-md border-2 border-white shadow-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="h-6 w-6 mx-auto mb-2 opacity-20" />
                  <p className="text-xs opacity-50">Your camera</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={activeAppointment?.participant.avatar || "/placeholder.svg"} alt={activeAppointment?.participant.name} />
                  <AvatarFallback>{activeAppointment?.participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{activeAppointment?.participant.name}</p>
                  <p className="text-sm text-muted-foreground">{activeAppointment?.participant.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground mr-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <span>00:15:32</span>
                </p>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={isVideoOn ? "" : "bg-muted"}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={isAudioOn ? "" : "bg-muted"}
                  onClick={() => setIsMicOn(!isAudioOn)}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Video Call Appointments</CardTitle>
              <CardDescription>
                Schedule and manage your video call appointments
              </CardDescription>
            </div>
            <Button onClick={() => setShowScheduleDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="pt-4">
                <div className="space-y-4">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon2 className="h-3 w-3 mr-1" />
                              <span>
                                {format(new Date(appointment.date), 'MMM dd, yyyy')} • {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => handleJoinCall(appointment)}>
                          Join
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">
                      No appointments found.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
