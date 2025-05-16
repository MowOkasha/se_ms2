"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export interface StudentEvaluationFormProps {
  isCompany?: boolean
  onClose?: () => void
}

export function StudentEvaluationForm({
  isCompany = false,
  onClose,
}: StudentEvaluationFormProps) {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    toast({
      title: "Evaluation Submitted",
      description: "Your feedback has been recorded.",
    })
    onClose?.()
  }

  return (
    <div className="space-y-4 p-4 bg-background rounded-lg shadow">
      <Label>Internship Evaluation</Label>
      <Textarea
        placeholder="Write your evaluation here…"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={5}
      />
      <Button onClick={handleSubmit}>Submit Evaluation</Button>
    </div>
  )
}