import { ActionTooltip } from "@/components/action-tooltip";
import { SearchBar } from "@/components/search";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <SearchBar />
      <ActionTooltip
        label="This is what i have added just to navigate to add-note page when in mobile screen"
        align="start"
      >
        <Link href="/add-note" className="flex items-center">
          <Plus className="w-5 h-5" />
          Add notes
        </Link>
      </ActionTooltip>
    </main>
  );
}
