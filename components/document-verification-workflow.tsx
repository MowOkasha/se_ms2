"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle, Clock, FileText, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    name: "Business Registration",
    status: "verified",
    uploadDate: "2023-05-10",
    verificationDate: "2023-05-15",
    notes: "All documents are in order",
    fileUrl: "/documents/business-registration.pdf",
  },
  {
    id: 2,
    name: "Tax Certificate",
    status: "pending",
    uploadDate: "2023-05-12",
    verificationDate: null,
    notes: "",
    fileUrl: "/documents/tax-certificate.pdf",
  },
  {
    id: 3,
    name: "Company Profile",
    status: "rejected",
    uploadDate: "2023-05-08",
    verificationDate: "2023-05-16",
    notes: "Missing key information about company structure",
    fileUrl: "/documents/company-profile.pdf",
  },
  {
    id: 4,
    name: "Internship Program Details",
    status: "pending",
    uploadDate: "2023-05-14",
    verificationDate: null,
    notes: "",
    fileUrl: "/documents/internship-program.pdf",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" /> Verified
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" /> Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export function DocumentVerificationWorkflow() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [verificationNote, setVerificationNote] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [newDocumentName, setNewDocumentName] = useState("")
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null)

  // Filter documents by status
  const pendingDocuments = documents.filter((doc) => doc.status === "pending")
  const verifiedDocuments = documents.filter((doc) => doc.status === "verified")
  const rejectedDocuments = documents.filter((doc) => doc.status === "rejected")

  // Handle document verification
  const handleVerify = (status: "verified" | "rejected") => {
    if (!selectedDocument) return

    const updatedDocuments = documents.map((doc) =>
      doc.id === selectedDocument.id
        ? {
            ...doc,
            status,
            verificationDate: new Date().toISOString().split("T")[0],
            notes: verificationNote,
          }
        : doc,
    )

    setDocuments(updatedDocuments)
    setVerificationNote("")
    setIsDialogOpen(false)
  }

  // Handle document upload
  const handleUpload = () => {
    if (!newDocumentName || !newDocumentFile) return

    const newDocument = {
      id: documents.length + 1,
      name: newDocumentName,
      status: "pending",
      uploadDate: new Date().toISOString().split("T")[0],
      verificationDate: null,
      notes: "",
      fileUrl: URL.createObjectURL(newDocumentFile),
    }

    setDocuments([...documents, newDocument])
    setNewDocumentName("")
    setNewDocumentFile(null)
    setIsUploadDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Document Verification</h2>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a document for verification by the SCAD team.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="document-name">Document Name</Label>
                <Input
                  id="document-name"
                  value={newDocumentName}
                  onChange={(e) => setNewDocumentName(e.target.value)}
                  placeholder="e.g., Business Registration Certificate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-file">Document File</Label>
                <Input
                  id="document-file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewDocumentFile(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({documents.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingDocuments.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verifiedDocuments.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedDocuments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <DocumentList
            documents={documents}
            onSelect={(doc) => {
              setSelectedDocument(doc)
              setIsDialogOpen(true)
            }}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <DocumentList
            documents={pendingDocuments}
            onSelect={(doc) => {
              setSelectedDocument(doc)
              setIsDialogOpen(true)
            }}
          />
        </TabsContent>

        <TabsContent value="verified" className="mt-4">
          <DocumentList
            documents={verifiedDocuments}
            onSelect={(doc) => {
              setSelectedDocument(doc)
              setIsDialogOpen(true)
            }}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <DocumentList
            documents={rejectedDocuments}
            onSelect={(doc) => {
              setSelectedDocument(doc)
              setIsDialogOpen(true)
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Document Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  {selectedDocument.name}
                  <div className="ml-auto">
                    <StatusBadge status={selectedDocument.status} />
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Uploaded on {selectedDocument.uploadDate}
                  {selectedDocument.verificationDate && ` • Verified on ${selectedDocument.verificationDate}`}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Document Preview</p>
                  <div className="h-64 flex items-center justify-center border mt-2 rounded-md bg-white dark:bg-gray-800">
                    <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  </div>
                </div>

                {selectedDocument.notes && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Verification Notes:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 p-2 border rounded-md">
                      {selectedDocument.notes}
                    </p>
                  </div>
                )}

                {selectedDocument.status === "pending" && (
                  <div className="space-y-2">
                    <Label htmlFor="verification-notes">Verification Notes</Label>
                    <Textarea
                      id="verification-notes"
                      placeholder="Add notes about this document..."
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>

                {selectedDocument.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button variant="destructive" onClick={() => handleVerify("rejected")}>
                      Reject
                    </Button>
                    <Button variant="default" onClick={() => handleVerify("verified")}>
                      Verify
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Document List Component
function DocumentList({ documents, onSelect }: { documents: any[]; onSelect: (doc: any) => void }) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium">No documents found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">There are no documents in this category.</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="grid gap-4 md:grid-cols-2">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            onClick={() => onSelect(doc)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  {doc.name}
                </CardTitle>
                <StatusBadge status={doc.status} />
              </div>
              <CardDescription>Uploaded on {doc.uploadDate}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {doc.notes && <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{doc.notes}</p>}
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(doc)
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
