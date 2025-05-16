import type React from "react"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
            <span className="font-bold">GUC Internship System</span>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationsDropdown />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1">
        {children}
      </div>
    </div>
  )
}
