import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Mohamed",
      role: "Computer Science Student",
      avatar: "AM",
      content:
        "The GUC Internship System made it incredibly easy to find and apply for internships. I secured a position at a top tech company and gained valuable experience that helped me land my dream job after graduation.",
    },
    {
      name: "Dr. Aya Mohamed",
      role: "Faculty Advisor",
      avatar: "AM",
      content:
        "As an academic advisor, this platform has streamlined the process of monitoring my students' internship progress. The reporting features and evaluation tools are excellent for providing timely feedback.",
    },
    {
      name: "Sara Ahmed",
      role: "PRO Student",
      avatar: "SA",
      content:
        "Earning my PRO status after completing my internships has opened many doors. Companies can see my verified experience, and I've received multiple job offers even before graduation.",
    },
    {
      name: "Tech Innovations Inc.",
      role: "Partner Company",
      avatar: "TI",
      content:
        "We've found exceptional talent through the GUC Internship System. The platform makes it easy to post positions, review applications, and evaluate interns. It's become our primary source for recruiting fresh talent.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from students, faculty, and companies who have experienced the benefits of our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg dark:shadow-gray-800/10">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.content}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
