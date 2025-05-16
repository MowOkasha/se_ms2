"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"

interface InternshipApplicationFormProps {
  onCancel: () => void
}

export function InternshipApplicationForm({ onCancel }: InternshipApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      onCancel()
    }, 1500)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Internship Application</CardTitle>
        <CardDescription>Submit your application for a new internship position</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select required>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech-innovations">Tech Innovations Inc.</SelectItem>
                  <SelectItem value="global-solutions">Global Solutions</SelectItem>
                  <SelectItem value="future-systems">Future Systems</SelectItem>
                  <SelectItem value="digital-experts">Digital Experts</SelectItem>
                  <SelectItem value="smart-technologies">Smart Technologies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select required>
                <SelectTrigger id="position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-dev">Frontend Developer</SelectItem>
                  <SelectItem value="backend-dev">Backend Developer</SelectItem>
                  <SelectItem value="mobile-dev">Mobile App Developer</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                  <SelectItem value="data-analyst">Data Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supervisor">Company Supervisor</Label>
            <Input id="supervisor" placeholder="Enter supervisor name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Internship Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the internship position and your responsibilities"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Motivation Letter</Label>
            <Textarea
              id="motivation"
              placeholder="Why are you interested in this position? What skills and experiences make you a good fit?"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume/CV</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
            <p className="text-xs text-muted-foreground">Upload your resume in PDF, DOC, or DOCX format (max 5MB)</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
