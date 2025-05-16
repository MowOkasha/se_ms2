"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CompanyApprovalsList() {
  const { toast } = useToast()
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [filterIndustry, setFilterIndustry] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("pending")
  const [rejectionReason, setRejectionReason] = useState<string>("")

  // Dummy data for company applications
  const companies = [
    {
      id: "1",
      name: "Future Systems",
      industry: "Information Technology",
      size: "51-200 employees",
      applicationDate: "April 10, 2025",
      status: "pending",
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
      status: "pending",
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
      status: "approved",
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
      approvalDate: "April 12, 2025",
      approvedBy: "Dr. Mervat Abuelkheir",
    },
    {
      id: "4",
      name: "Global Finance Group",
      industry: "Finance",
      size: "501+ employees",
      applicationDate: "April 3, 2025",
      status: "rejected",
      documents: [
        { name: "Business Registration.pdf", type: "registration", status: "Uploaded" },
        { name: "Tax Documents.pdf", type: "tax", status: "Uploaded" },
        { name: "Company Profile.pdf", type: "profile", status: "Uploaded" },
      ],
      contactPerson: "Laila Ibrahim",
      contactEmail: "laila.ibrahim@globalfinance.com",
      contactPhone: "+20 123 456 7893",
      description:
        "Global Finance Group offers financial services and investment solutions to individuals and businesses.",
      rejectionDate: "April 10, 2025",
      rejectionReason: "Insufficient documentation provided. The tax documents submitted are outdated.",
      rejectedBy: "Dr. Mervat Abuelkheir",
    },
  ]

  // Filter companies based on search query, industry filter, and status
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = filterIndustry === "all" || company.industry === filterIndustry
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    return matchesSearch && matchesIndustry && matchesStatus
  })

  // Get the selected company details
  const companyDetails = companies.find((company) => company.id === selectedCompany)

  const handleApprove = () => {
    if (!companyDetails) return

    toast({
      title: "Company Approved",
      description: `${companyDetails.name} has been approved and notified.`,
    })

    // In a real application, you would make an API call here
  }

  const handleReject = () => {
    if (!companyDetails || !rejectionReason) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this application.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Company Rejected",
      description: `${companyDetails.name} has been rejected and notified.`,
    })

    setRejectionReason("")
    // In a real application, you would make an API call here
  }

  const handleViewDocument = (documentName: string) => {
    toast({
      title: "Opening Document",
      description: `Opening ${documentName}...`,
    })
    // In a real application, this would open the document
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

          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <Card className="border shadow">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Company Applications</CardTitle>
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
                      <Badge
                        variant={
                          company.status === "approved"
                            ? "success"
                            : company.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </Badge>
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
                    <Badge
                      variant={
                        companyDetails.status === "approved"
                          ? "success"
                          : companyDetails.status === "rejected"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {companyDetails.status.charAt(0).toUpperCase() + companyDetails.status.slice(1)}
                    </Badge>
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
                          <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc.name)}>
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {companyDetails.status === "approved" && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-md border border-green-200 dark:border-green-900">
                      <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Approval Information</h3>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Approved on {companyDetails.approvalDate} by {companyDetails.approvedBy}
                      </p>
                    </div>
                  )}

                  {companyDetails.status === "rejected" && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-md border border-red-200 dark:border-red-900">
                      <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">Rejection Information</h3>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Rejected on {companyDetails.rejectionDate} by {companyDetails.rejectedBy}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-2">
                        Reason: {companyDetails.rejectionReason}
                      </p>
                    </div>
                  )}

                  {companyDetails.status === "pending" && (
                    <div className="space-y-2">
                      <Label htmlFor="notes">Rejection Reason (if applicable)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Provide a reason if you are rejecting this application..."
                        rows={3}
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
                {companyDetails.status === "pending" && (
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
                )}
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
    </div>
  )
}
