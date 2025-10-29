import { Skeleton } from "@/components/ui/skeleton";

export default function CodeOfConductPageLoading() {
  return (
    <div className="flex flex-col items-center h-full gap-3 pt-2">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center gap-2 text-center">
        {/* Title */}
        <Skeleton className="w-64 h-8 rounded-lg md:h-12 md:w-96 dark:bg-zinc-600 bg-zinc-400" />

        {/* Subtitle */}
        <Skeleton className="w-48 h-4 rounded-md md:w-72 dark:bg-zinc-600 bg-zinc-400" />

        {/* Icon */}
        <Skeleton className="w-5 h-5 rounded-full md:w-14 md:h-14 dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* Code of Conduct List Skeleton */}
      <div className="overflow-y-auto max-h-[65%] space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 pt-2 w-full px-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 p-2 dark:bg-zinc-600 bg-zinc-400 rounded-xl animate-pulse"
          >
            <div className="flex items-start h-10 gap-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
