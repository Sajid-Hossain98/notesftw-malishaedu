import { SearchBar } from "@/components/search";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const lightAvenir = localFont({
  src: "./fonts/Avenir-LT-W01-65-Medium-Book.woff",
});

export default function Home() {
  return (
    <main className={cn(lightAvenir.className)}>
      <SearchBar />
    </main>
  );
}
