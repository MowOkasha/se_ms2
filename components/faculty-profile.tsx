"use client"

import React from "react"

export interface FacultyProfileProps {
  name?: string
  department?: string
  studentsCount?: number
  pendingReviews?: number
}

export function FacultyProfile({
  name = "Dr. Jane Doe",
  department = "Department Name",
  studentsCount = 0,
  pendingReviews = 0,
}: FacultyProfileProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground">{department}</p>
      <div className="flex space-x-8">
        <div>
          <p className="text-lg font-medium">{studentsCount}</p>
          <p className="text-xs text-muted-foreground">Assigned Students</p>
        </div>
        <div>
          <p className="text-lg font-medium">{pendingReviews}</p>
          <p className="text-xs text-muted-foreground">Pending Reviews</p>
        </div>
      </div>
    </div>
  )
}