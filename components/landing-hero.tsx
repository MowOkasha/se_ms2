import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                GUC Internship System
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Streamline your internship experience with our comprehensive platform for students, advisors, and
                companies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg opacity-20 blur-xl"></div>
              <div className="relative h-full w-full rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-white">Internship Dashboard</h3>
                      <p className="text-sm text-gray-400">Welcome back, Ahmed</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-700">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                      <div className="text-sm font-medium text-gray-400">Current Internship</div>
                      <div className="mt-1 text-xl font-semibold text-white">Tech Innovations</div>
                      <div className="mt-1 text-xs text-gray-400">65% Complete</div>
                    </div>
                    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                      <div className="text-sm font-medium text-gray-400">Next Deadline</div>
                      <div className="mt-1 text-xl font-semibold text-white">April 20</div>
                      <div className="mt-1 text-xs text-gray-400">Mid-term Report</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                    <div className="text-sm font-medium text-gray-400">Recent Activity</div>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center text-xs text-gray-300">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                        Weekly report submitted
                      </li>
                      <li className="flex items-center text-xs text-gray-300">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                        Advisor feedback received
                      </li>
                      <li className="flex items-center text-xs text-gray-300">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                        Meeting scheduled with mentor
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
