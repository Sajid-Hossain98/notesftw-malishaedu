import { SearchBar } from "@/components/search";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <SearchBar />
      <Link href="/add-note" className="flex items-center">
        <Plus className="w-5 h-5" />
        Add notes
      </Link>
    </main>
  );
}
