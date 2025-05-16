import type { Metadata } from "next"
import SearchInternshipsClientPage from "./SearchInternshipsClientPage"

export const metadata: Metadata = {
  title: "Search Internships | GUC Internship System",
  description: "Find and filter internship opportunities",
}

export default function SearchInternshipsPage() {
  return <SearchInternshipsClientPage />
}
