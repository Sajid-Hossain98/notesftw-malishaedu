import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/search";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const lightAvenir = localFont({
  src: "./fonts/Avenir-LT-W01-65-Medium-Book.woff",
});

export default function Home() {
  return (
    <main
      className={cn(
        "w-[92vw] mx-auto h-screen overflow-hidden",
        lightAvenir.className
      )}
    >
      <Navbar />
      <SearchBar />
    </main>
  );
}
