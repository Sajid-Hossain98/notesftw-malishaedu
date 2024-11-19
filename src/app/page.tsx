import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const lightAvenir = localFont({
  src: "./fonts/Light-Avenir LT Pro 35 Light.woff2",
  weight: "100 900",
});

export default function Home() {
  return (
    <main
      className={cn(
        "w-[92vw] text-[#edf2f4] mx-auto h-screen overflow-hidden",
        lightAvenir.className
      )}
    >
      <Navbar />
    </main>
  );
}
