import { Skeleton } from "@/components/ui/skeleton";

export default function EmailCheckRankLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* 2. Top Three Ranked Skeletons (Only the main container shape) */}
      <div className="md:absolute md:left-0 md:w-[48%] space-y-2 animate-pulse">
        {/* Rank 2 Skeleton (Silver: 90% Width, Medium Height) */}
        <div className="bg-zinc-400 dark:bg-zinc-600 w-[90%] rounded-tr-full rounded-br-full relative py-3 md:py-6 h-20 md:h-28" />

        {/* Rank 1 Skeleton (Gold: Full Width, Tallest) */}
        <div className="bg-zinc-400 dark:bg-zinc-600 w-full rounded-tr-full rounded-br-full relative md:py-8 py-5 h-24 md:h-32" />

        {/* Rank 3 Skeleton (Bronze: 80% Width, Medium Height) */}
        <div className="bg-zinc-400 dark:bg-zinc-600 w-[80%] rounded-tr-full rounded-br-full relative py-3 md:py-6 h-20 md:h-28" />
      </div>

      {/* 3. Rest of the Ranked List Skeletons (Unchanged, as they were already simplified) */}
      <div className="md:absolute md:left-1/2 md:w-1/2 md:max-h-[70vh] max-h-[45vh] overflow-hidden space-y-2 animate-pulse pt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-start gap-1.5 md:gap-2 my-1 md:my-2"
          >
            {/* Rank Number Skeleton */}
            <Skeleton className="w-12 h-12 rounded-tl-full rounded-bl-full rounded-br-full md:w-16 md:h-14 dark:bg-zinc-600 bg-zinc-400" />

            {/* User Info Container Skeleton */}
            <div className="bg-zinc-400 dark:bg-zinc-600 rounded-[10px] w-full flex items-center gap-2 h-12 md:h-14">
              {/* User Image inside container */}
              <Skeleton className="object-cover h-full w-12 rounded-l-[10px] dark:bg-zinc-500 bg-zinc-300" />
              <div className="flex items-center justify-between w-full pl-1 pr-3 md:pr-6">
                {/* User Name Skeleton */}
                <Skeleton className="w-24 h-4 rounded-md dark:bg-zinc-500 bg-zinc-300" />
                {/* Count Skeleton */}
                <Skeleton className="w-6 h-6 rounded-full dark:bg-zinc-500 bg-zinc-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
