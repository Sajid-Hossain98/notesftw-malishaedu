import { Skeleton } from "@/components/ui/skeleton";
import { List, LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="md:flex md:justify-between md:gap-3 md:w-full md:h-full mt-2">
      {/* Tabs List Skeleton */}
      <div className="md:flex md:flex-col md:items-center md:justify-start md:gap-2 md:bg-[#242424] md:max-h-fit md:rounded-xl md:px-2 md:py-2 grid md:max-w-[15%] w-full grid-cols-2 md:mt-2">
        <div className="flex items-center justify-center gap-2 py-1.5 bg-[#2c2c2c] rounded-md">
          <List className="w-4 h-4 text-zinc-500" />
          <Skeleton className="w-8 h-4 bg-zinc-500" />
        </div>
        <div className="flex items-center justify-center gap-2 py-1.5 bg-[#2c2c2c] rounded-md">
          <LoaderCircle className="w-4 h-4 text-zinc-500" />
          <Skeleton className="w-12 h-4 bg-zinc-500" />
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full md:mt-0 mt-2 space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="bg-zinc-500 w-full rounded-[3px] !text-xs md:!text-base text-center py-1 md:my-2 min-h-4 md:min-h-10" />

          <Skeleton className="bg-zinc-400 h-6 md:h-10 w-20 md:w-28 rounded-[3px]" />
        </div>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between w-full p-2 bg-[#2a2a2a] rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full bg-zinc-500" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-40 h-4 bg-zinc-500" />
                <Skeleton className="w-24 h-3 bg-zinc-600" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="w-6 h-6 rounded-full bg-zinc-500" />
              <Skeleton className="w-6 h-6 rounded-full bg-zinc-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
