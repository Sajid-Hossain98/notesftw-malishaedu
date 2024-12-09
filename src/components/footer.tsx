import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { SignedIn, UserButton } from "@clerk/nextjs";
const lightAvenir = localFont({
  src: "../app/fonts/Avenir-LT-W01-65-Medium-Book.woff",
});

export const Footer = () => {
  return (
    <div
      className={cn(
        "fixed left-0 bottom-0 font-semibold w-full h-10 bg-[#185339]",
        lightAvenir.className
      )}
    >
      <div className="w-full h-full flex justify-center items-center gap-3">
        <div>DON&apos;T FORGET LAAAH!</div>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
