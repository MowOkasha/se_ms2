"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Search, Filter, MapPin, Briefcase, Clock, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for demonstration
const locations = ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Hurghada", "Luxor", "Aswan", "Port Said"]
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Consulting",
]
const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
]

export function AdvancedSearchFilter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string>("Any location")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Any industry")
  const [selectedDuration, setSelectedDuration] = useState<string>("Any duration")
  const [salaryRange, setSalaryRange] = useState([0, 20000])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isRemote, setIsRemote] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [isFullTime, setIsFullTime] = useState(false)
  const [isPartTime, setIsPartTime] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleFilterChange = (filter: string, value: any) => {
    // Update the active filters list
    if (value && !activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    } else if (!value && activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    }
  }

  const clearAllFilters = () => {
    setSelectedLocation("Any location")
    setSelectedIndustry("Any industry")
    setSelectedDuration("Any duration")
    setSalaryRange([0, 20000])
    setSelectedSkills([])
    setIsRemote(false)
    setIsPaid(false)
    setIsFullTime(false)
    setIsPartTime(false)
    setActiveFilters([])
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    switch (filter) {
      case "Location":
        setSelectedLocation("Any location")
        break
      case "Industry":
        setSelectedIndustry("Any industry")
        break
      case "Duration":
        setSelectedDuration("Any duration")
        break
      case "Salary":
        setSalaryRange([0, 20000])
        break
      case "Remote":
        setIsRemote(false)
        break
      case "Paid":
        setIsPaid(false)
        break
      case "Full-time":
        setIsFullTime(false)
        break
      case "Part-time":
        setIsPartTime(false)
        break
      default:
        if (filter.startsWith("Skill:")) {
          const skill = filter.replace("Skill: ", "")
          setSelectedSkills(selectedSkills.filter((s) => s !== skill))
        }
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search internships, companies, or keywords..."
          className="pl-10 pr-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 md:hidden"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-xs ml-auto" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Mobile filters */}
        <Collapsible open={showMobileFilters} onOpenChange={setShowMobileFilters} className="md:hidden col-span-1">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>Filters</span>
              {showMobileFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-6">
                {/* Location filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Select
                    value={selectedLocation}
                    onValueChange={(value) => {
                      setSelectedLocation(value)
                      handleFilterChange("Location", value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any location">Any location</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Industry
                  </Label>
                  <Select
                    value={selectedIndustry}
                    onValueChange={(value) => {
                      setSelectedIndustry(value)
                      handleFilterChange("Industry", value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any industry">Any industry</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Duration
                  </Label>
                  <Select
                    value={selectedDuration}
                    onValueChange={(value) => {
                      setSelectedDuration(value)
                      handleFilterChange("Duration", value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any duration">Any duration</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6+ months">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary range filter */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Salary Range (EGP/month)
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {salaryRange[0]} - {salaryRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={salaryRange}
                    max={20000}
                    step={1000}
                    onValueChange={(value) => {
                      setSalaryRange(value as [number, number])
                      handleFilterChange("Salary", value[0] !== 0 || value[1] !== 20000)
                    }}
                  />
                </div>

                {/* Type filters */}
                <div className="space-y-3">
                  <Label>Type</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={isRemote}
                        onCheckedChange={(checked) => {
                          setIsRemote(!!checked)
                          handleFilterChange("Remote", checked)
                        }}
                      />
                      <label
                        htmlFor="remote"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remote
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paid"
                        checked={isPaid}
                        onCheckedChange={(checked) => {
                          setIsPaid(!!checked)
                          handleFilterChange("Paid", checked)
                        }}
                      />
                      <label
                        htmlFor="paid"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Paid
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fullTime"
                        checked={isFullTime}
                        onCheckedChange={(checked) => {
                          setIsFullTime(!!checked)
                          handleFilterChange("Full-time", checked)
                        }}
                      />
                      <label
                        htmlFor="fullTime"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Full-time
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="partTime"
                        checked={isPartTime}
                        onCheckedChange={(checked) => {
                          setIsPartTime(!!checked)
                          handleFilterChange("Part-time", checked)
                        }}
                      />
                      <label
                        htmlFor="partTime"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Part-time
                      </label>
                    </div>
                  </div>
                </div>

                {/* Skills filter */}
                <div className="space-y-3">
                  <Label>Skills</Label>
                  <ScrollArea className="h-40 rounded-md border p-2">
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => {
                              handleSkillToggle(skill)
                              handleFilterChange(`Skill: ${skill}`, !selectedSkills.includes(skill))
                            }}
                          />
                          <label
                            htmlFor={`skill-${skill}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setShowMobileFilters(false)}>Apply Filters</Button>
              </CardFooter>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Desktop filters */}
        <div className="hidden md:block md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </Label>
                <Select
                  value={selectedLocation}
                  onValueChange={(value) => {
                    setSelectedLocation(value)
                    handleFilterChange("Location", value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any location">Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Industry filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Industry
                </Label>
                <Select
                  value={selectedIndustry}
                  onValueChange={(value) => {
                    setSelectedIndustry(value)
                    handleFilterChange("Industry", value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any industry">Any industry</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Duration
                </Label>
                <Select
                  value={selectedDuration}
                  onValueChange={(value) => {
                    setSelectedDuration(value)
                    handleFilterChange("Duration", value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any duration">Any duration</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salary range filter */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Salary Range (EGP/month)
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {salaryRange[0]} - {salaryRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={salaryRange}
                  max={20000}
                  step={1000}
                  onValueChange={(value) => {
                    setSalaryRange(value as [number, number])
                    handleFilterChange("Salary", value[0] !== 0 || value[1] !== 20000)
                  }}
                />
              </div>

              <Separator />

              {/* Type filters */}
              <div className="space-y-3">
                <Label>Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote-desktop"
                      checked={isRemote}
                      onCheckedChange={(checked) => {
                        setIsRemote(!!checked)
                        handleFilterChange("Remote", checked)
                      }}
                    />
                    <label
                      htmlFor="remote-desktop"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remote
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paid-desktop"
                      checked={isPaid}
                      onCheckedChange={(checked) => {
                        setIsPaid(!!checked)
                        handleFilterChange("Paid", checked)
                      }}
                    />
                    <label
                      htmlFor="paid-desktop"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Paid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fullTime-desktop"
                      checked={isFullTime}
                      onCheckedChange={(checked) => {
                        setIsFullTime(!!checked)
                        handleFilterChange("Full-time", checked)
                      }}
                    />
                    <label
                      htmlFor="fullTime-desktop"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Full-time
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partTime-desktop"
                      checked={isPartTime}
                      onCheckedChange={(checked) => {
                        setIsPartTime(!!checked)
                        handleFilterChange("Part-time", checked)
                      }}
                    />
                    <label
                      htmlFor="partTime-desktop"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Part-time
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Skills filter */}
              <div className="space-y-3">
                <Label>Skills</Label>
                <ScrollArea className="h-40 rounded-md border p-2">
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-desktop-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => {
                            handleSkillToggle(skill)
                            handleFilterChange(`Skill: ${skill}`, !selectedSkills.includes(skill))
                          }}
                        />
                        <label
                          htmlFor={`skill-desktop-${skill}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All
              </Button>
              <Button>Apply Filters</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Search results would go here */}
        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {activeFilters.length > 0
                  ? `Showing filtered results (${activeFilters.length} filters applied)`
                  : "Showing all internship opportunities"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Search results would appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
