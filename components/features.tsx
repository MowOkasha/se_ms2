import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Internship Management</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform streamlines the entire internship process for students, academic advisors, and companies.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-lg dark:shadow-gray-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">For Students</CardTitle>
              <CardDescription>Simplify your internship journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Browse and apply for internships
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Submit and track reports
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Receive feedback and evaluations
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Monitor deadlines and progress
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:shadow-gray-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">For Academic Advisors</CardTitle>
              <CardDescription>Efficiently manage student internships</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Track student progress
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Review and evaluate reports
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Provide feedback and guidance
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Generate performance reports
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:shadow-gray-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">For Companies</CardTitle>
              <CardDescription>Streamline intern recruitment and management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Post internship opportunities
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Review and select applicants
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Evaluate intern performance
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Provide feedback to university
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
