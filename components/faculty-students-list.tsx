"use client"

import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export interface Student {
  id: number
  name: string
  studentId: string
  company: string
  progress: number
  status: "Not Started" | "In Progress" | "Completed"
}

export interface FacultyStudentsListProps {
  students?: Student[]
}

export function FacultyStudentsList({
  students = [],
}: FacultyStudentsListProps) {
  if (students.length === 0) {
    return <p className="text-center text-sm text-muted-foreground">No students.</p>
  }

  return (
    <div className="space-y-4">
      {students.map((s) => (
        <div key={s.id} className="flex items-center justify-between border-b py-2">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {s.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">
                {s.studentId} • {s.company}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{s.progress}%</span>
              </div>
              <Progress value={s.progress} className="h-1.5" />
            </div>
            <Badge
              variant={
                s.status === "Completed"
                  ? "outline"
                  : s.status === "In Progress"
                  ? "secondary"
                  : "destructive"
              }
            >
              {s.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}