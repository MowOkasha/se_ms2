"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface StudentProfileProps {
  isPro?: boolean
}

export function StudentProfile({ isPro = false }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Dummy data
  const studentInfo = {
    name: isPro ? "Sara Ahmed" : "Ahmed Mohamed",
    id: isPro ? "43-12346" : "43-12345",
    email: isPro ? "sara.ahmed@student.guc.edu.eg" : "ahmed.mohamed@student.guc.edu.eg",
    phone: "+20 123 456 7890",
    program: isPro ? "Computer Science" : "Media Engineering and Technology",
    semester: "Spring 2025",
    advisor: isPro ? "Dr. Mervat Abuelkheir" : "Dr. Aya Mohamed",
    completedHours: isPro ? 135 : 120,
    gpa: isPro ? 3.9 : 3.7,
    bio: "Passionate student interested in software development and UI/UX design. Looking for opportunities to apply classroom knowledge in real-world settings.",
    skills: ["JavaScript", "React", "UI/UX Design", "Python", "Problem Solving"],
    languages: ["Arabic (Native)", "English (Fluent)", "French (Basic)"],
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {studentInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {studentInfo.name}
                {isPro && <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500">PRO</Badge>}
              </CardTitle>
              <CardDescription>
                {studentInfo.id} • {studentInfo.program}
              </CardDescription>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Information</TabsTrigger>
            <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={studentInfo.name}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={studentInfo.email}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  defaultValue={studentInfo.phone}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Student ID</Label>
                <Input id="id" defaultValue={studentInfo.id} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue={studentInfo.bio}
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
                rows={4}
              />
            </div>
          </TabsContent>
          <TabsContent value="academic" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input id="program" defaultValue={studentInfo.program} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Current Semester</Label>
                <Input
                  id="semester"
                  defaultValue={studentInfo.semester}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advisor">Academic Advisor</Label>
                <Input id="advisor" defaultValue={studentInfo.advisor} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Completed Credit Hours</Label>
                <Input id="hours" defaultValue={studentInfo.completedHours.toString()} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input id="gpa" defaultValue={studentInfo.gpa.toString()} readOnly className="bg-muted" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex flex-wrap gap-2 py-2">
                {studentInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm" className="h-6">
                    + Add Skill
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <div className="flex flex-wrap gap-2 py-2">
                {studentInfo.languages.map((language, index) => (
                  <Badge key={index} variant="outline">
                    {language}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm" className="h-6">
                    + Add Language
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Download CV</Button>
        <Button variant="outline">Download Transcript</Button>
      </CardFooter>
    </Card>
  )
}
