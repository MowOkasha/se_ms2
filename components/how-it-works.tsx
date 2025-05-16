import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Process, Powerful Results</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes internship management straightforward for all stakeholders.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <Card className="relative border-0 shadow-lg dark:shadow-gray-800/10">
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-xl font-bold text-white">
              1
            </div>
            <CardHeader className="pt-8">
              <CardTitle>Register & Apply</CardTitle>
              <CardDescription>Students create profiles and apply for internships</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Students register on the platform, create detailed profiles showcasing their skills and interests, and
                apply for internships that match their career goals.
              </p>
            </CardContent>
          </Card>
          <Card className="relative border-0 shadow-lg dark:shadow-gray-800/10">
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-xl font-bold text-white">
              2
            </div>
            <CardHeader className="pt-8">
              <CardTitle>Complete Internship</CardTitle>
              <CardDescription>Gain valuable experience and submit reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                During the internship, students gain practical experience, submit regular progress reports, and receive
                feedback from both company supervisors and academic advisors.
              </p>
            </CardContent>
          </Card>
          <Card className="relative border-0 shadow-lg dark:shadow-gray-800/10">
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-xl font-bold text-white">
              3
            </div>
            <CardHeader className="pt-8">
              <CardTitle>Earn PRO Status</CardTitle>
              <CardDescription>Complete requirements and showcase achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                After completing the required internship period, students earn PRO status, which highlights their
                practical experience and makes them more attractive to future employers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
