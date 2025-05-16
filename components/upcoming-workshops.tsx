import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function UpcomingWorkshops() {
  const workshops = [
    {
      id: 1,
      title: "Resume Building for Tech Internships",
      date: "May 20, 2025",
      time: "2:00 PM - 4:00 PM",
      speaker: "Dr. Mervat Abuelkheir",
      type: "Live",
      registrations: 45,
    },
    {
      id: 2,
      title: "Mastering Technical Interviews",
      date: "May 25, 2025",
      time: "3:00 PM - 5:00 PM",
      speaker: "Eng. Yasmine Elbehairy",
      type: "Live",
      registrations: 62,
    },
    {
      id: 3,
      title: "Effective Communication in the Workplace",
      date: "June 2, 2025",
      time: "1:00 PM - 3:00 PM",
      speaker: "Dr. Aya Mohamed",
      type: "Live",
      registrations: 38,
    },
    {
      id: 4,
      title: "Introduction to Project Management",
      date: "Available Now",
      time: "Self-paced",
      speaker: "Eng. Nada Ibrahim",
      type: "Recorded",
      registrations: 124,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Workshops</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Career Workshops</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enhance your skills and career prospects with our specialized workshops.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {workshops.map((workshop) => (
            <Card key={workshop.id} className="border-0 shadow-lg dark:shadow-gray-800/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{workshop.title}</CardTitle>
                  <Badge variant={workshop.type === "Live" ? "default" : "secondary"}>{workshop.type}</Badge>
                </div>
                <CardDescription>
                  {workshop.date} • {workshop.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Speaker: {workshop.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {workshop.registrations} registered
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  size="sm"
                >
                  {workshop.type === "Live" ? "Register Now" : "Watch Recording"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            View All Workshops
          </Button>
        </div>
      </div>
    </section>
  )
}
