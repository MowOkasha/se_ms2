import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
            <span className="font-semibold">GUC Internship System</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} German University in Cairo. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Documentation
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Help Center
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Cookie Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Contact</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Email
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Phone
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Address
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
