import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-2 md:flex md:justify-between md:gap-3 md:w-full md:h-full">
      {/* Tabs List Skeleton */}
      <div className="md:flex md:flex-col md:items-center md:justify-start md:gap-2 dark:md:bg-[#303030] bg-zinc-300 md:max-h-fit md:rounded-xl md:px-2 md:py-2 grid md:max-w-[15%] w-full grid-cols-2 md:mt-2">
        <div className="flex items-center justify-center gap-2 py-1.5 dark:bg-[#2c2c2c] bg-zinc-300 rounded-[3px]">
          <Skeleton className="w-8 h-4 dark:bg-zinc-600 bg-zinc-300 rounded-[4px]" />
        </div>
        <div className="flex items-center justify-center gap-2 py-1.5 dark:bg-[#2c2c2c] bg-zinc-300 rounded-[3px]">
          <Skeleton className="w-12 h-4 dark:bg-zinc-600 bg-zinc-300 rounded-[4px]" />
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full mt-2 space-y-2 md:mt-0">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="dark:bg-zinc-600 bg-zinc-300 w-full rounded-[3px] !text-xs md:!text-base text-center py-1 md:my-2 min-h-4 md:min-h-10" />

          <Skeleton className="dark:bg-zinc-600 bg-zinc-300 h-6 md:h-10 w-20 md:w-28 rounded-[3px]" />
        </div>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between w-full p-2 dark:bg-[#2a2a2a] bg-zinc-300 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full dark:bg-zinc-600 bg-zinc-300" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-40 h-4 dark:bg-zinc-600 bg-zinc-300 rounded-[4px]" />
                <Skeleton className="w-24 h-3 dark:bg-zinc-600 bg-zinc-300 rounded-[4px]" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="w-6 h-6 rounded-full dark:bg-zinc-600 bg-zinc-300" />
              <Skeleton className="w-6 h-6 rounded-full dark:bg-zinc-600 bg-zinc-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
