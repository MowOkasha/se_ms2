"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Clock, FileText, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDocuments = [
  {
    id: 1,
    name: "Business Registration",
    status: "verified",
    uploadDate: "2023-05-10",
    verifiedDate: "2023-05-15",
    comments: "All documents are in order.",
  },
  {
    id: 2,
    name: "Tax Clearance Certificate",
    status: "pending",
    uploadDate: "2023-05-12",
    verifiedDate: null,
    comments: "",
  },
  {
    id: 3,
    name: "Company Profile",
    status: "rejected",
    uploadDate: "2023-05-08",
    verifiedDate: "2023-05-14",
    comments: "Information is incomplete. Please provide more details about your company structure.",
  },
]

export function CompanyVerificationWorkflow() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState(mockDocuments)
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [filterIndustry, setFilterIndustry] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Dummy data for pending company applications
  const pendingCompanies = [
    {
      id: "1",
      name: "Future Systems",
      industry: "Information Technology",
      size: "51-200 employees",
      applicationDate: "April 10, 2025",
      status: "Pending Review",
      documents: [
        { name: "Business Registration.pdf", type: "registration", status: "Uploaded" },
        { name: "Tax Documents.pdf", type: "tax", status: "Uploaded" },
        { name: "Company Profile.pdf", type: "profile", status: "Uploaded" },
      ],
      contactPerson: "Ahmed Hassan",
      contactEmail: "ahmed.hassan@futuresystems.com",
      contactPhone: "+20 123 456 7890",
      description:
        "Future Systems is a leading software development company specializing in AI and machine learning solutions for businesses across various industries.",
    },
    {
      id: "2",
      name: "Green Energy Solutions",
      industry: "Engineering",
      size: "11-50 employees",
      applicationDate: "April 8, 2025",
      status: "Pending Review",
      documents: [
        { name: "Business Registration.pdf", type: "registration", status: "Uploaded" },
        { name: "Tax Documents.pdf", type: "tax", status: "Uploaded" },
        { name: "Company Profile.pdf", type: "profile", status: "Uploaded" },
      ],
      contactPerson: "Sara Ahmed",
      contactEmail: "sara.ahmed@greenenergy.com",
      contactPhone: "+20 123 456 7891",
      description:
        "Green Energy Solutions provides renewable energy solutions and consulting services to help businesses reduce their carbon footprint and energy costs.",
    },
    {
      id: "3",
      name: "MediTech Innovations",
      industry: "Healthcare",
      size: "201-500 employees",
      applicationDate: "April 5, 2025",
      status: "Pending Review",
      documents: [
        { name: "Business Registration.pdf", type: "registration", status: "Uploaded" },
        { name: "Tax Documents.pdf", type: "tax", status: "Uploaded" },
        { name: "Company Profile.pdf", type: "profile", status: "Uploaded" },
      ],
      contactPerson: "Mohamed Ali",
      contactEmail: "mohamed.ali@meditech.com",
      contactPhone: "+20 123 456 7892",
      description:
        "MediTech Innovations develops cutting-edge medical technology solutions to improve patient care and healthcare delivery systems.",
    },
  ]

  // Filter companies based on search query and industry filter
  const filteredCompanies = pendingCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = filterIndustry === "all" || company.industry === filterIndustry
    return matchesSearch && matchesIndustry
  })

  // Get the selected company details
  const companyDetails = pendingCompanies.find((company) => company.id === selectedCompany)

  const handleApprove = () => {
    toast({
      title: "Company Approved",
      description: `${companyDetails?.name} has been approved and notified.`,
    })
    // In a real application, you would make an API call here
  }

  const handleReject = () => {
    toast({
      title: "Company Rejected",
      description: `${companyDetails?.name} has been rejected and notified.`,
    })
    // In a real application, you would make an API call here
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const simulateUpload = () => {
    if (!selectedFile || !documentType) return

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add new document to the list
          const newDocument = {
            id: documents.length + 1,
            name: documentType,
            status: "pending",
            uploadDate: new Date().toISOString().split("T")[0],
            verifiedDate: null,
            comments: "",
          }

          setDocuments([...documents, newDocument])
          setSelectedFile(null)
          setDocumentType("")
          setActiveTab("status")

          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setOpenDialog(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Company Verification</CardTitle>
          <CardDescription>Review and approve company applications to join the GUC Internship System</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by company name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <Card className="border shadow">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      className={`flex items-center p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedCompany === company.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedCompany(company.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{company.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{company.industry}</p>
                        <p className="text-xs text-muted-foreground">Applied: {company.applicationDate}</p>
                      </div>
                      <Badge variant="outline">{company.status}</Badge>
                    </div>
                  ))}
                  {filteredCompanies.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No companies match your search criteria</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {companyDetails ? (
              <Card className="border shadow">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{companyDetails.name}</CardTitle>
                      <CardDescription>
                        {companyDetails.industry} • {companyDetails.size}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{companyDetails.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Company Description</h3>
                    <p className="text-sm text-muted-foreground">{companyDetails.description}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                      <div>
                        <p className="text-muted-foreground">Contact Person:</p>
                        <p>{companyDetails.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email:</p>
                        <p>{companyDetails.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone:</p>
                        <p>{companyDetails.contactPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Verification Documents</h3>
                    <div className="space-y-2">
                      {companyDetails.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center">
                            <svg
                              className="h-5 w-5 mr-2 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                            <span className="text-sm">{doc.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Verification Notes</Label>
                    <Textarea id="notes" placeholder="Add notes about this company verification" rows={3} />
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="destructive" onClick={handleReject}>
                    Reject Application
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    onClick={handleApprove}
                  >
                    Approve Company
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border shadow">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                  <p className="text-muted-foreground">Select a company to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Verification</CardTitle>
          <CardDescription>
            Upload required documents for company verification. All documents must be verified before you can post
            internship opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Documents</TabsTrigger>
              <TabsTrigger value="status">Verification Status</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4 pt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please ensure all documents are in PDF format and clearly legible. Documents in other formats may
                  delay the verification process.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <select
                    id="documentType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    <option value="">Select document type</option>
                    <option value="Business Registration">Business Registration</option>
                    <option value="Tax Clearance Certificate">Tax Clearance Certificate</option>
                    <option value="Company Profile">Company Profile</option>
                    <option value="Legal Representative ID">Legal Representative ID</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload Document</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here or click to browse
                    </p>
                    <Input
                      id="file"
                      type="file"
                      className="max-w-sm"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {selectedFile && <p className="text-sm mt-2">Selected: {selectedFile.name}</p>}
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="status" className="pt-4">
              <div className="space-y-4">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(doc.status)}
                        <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No documents uploaded</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please upload the required documents for verification.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setActiveTab("upload")}>
                      Upload Documents
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          {activeTab === "upload" && (
            <Button onClick={simulateUpload} disabled={!selectedFile || !documentType || isUploading}>
              Upload Document
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>Document details and verification status</DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Status:</div>
                <div>{getStatusBadge(selectedDocument.status)}</div>

                <div className="font-medium">Upload Date:</div>
                <div>{selectedDocument.uploadDate}</div>

                {selectedDocument.verifiedDate && (
                  <>
                    <div className="font-medium">Verification Date:</div>
                    <div>{selectedDocument.verifiedDate}</div>
                  </>
                )}
              </div>

              {selectedDocument.comments && (
                <div className="space-y-2">
                  <Label>Reviewer Comments:</Label>
                  <div className="p-3 bg-muted rounded-md text-sm">{selectedDocument.comments}</div>
                </div>
              )}

              <div className="border rounded-md p-4 flex items-center justify-center bg-muted h-40">
                <p className="text-muted-foreground">Document preview would appear here</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
