import { Skeleton } from "@/components/ui/skeleton";

export default function NoticesPageLoading() {
  return (
    <div className="flex flex-col h-full gap-3 pt-2">
      {/* Header Skeleton */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Icon */}
        <Skeleton className="w-5 h-5 rounded-full md:w-10 md:h-10 dark:bg-zinc-600 bg-zinc-300" />
        {/* Title */}
        <Skeleton className="w-40 h-8 rounded-lg md:h-12 md:w-72 dark:bg-zinc-600 bg-zinc-300" />
      </div>

      {/* Notices List Skeleton */}
      <div className="overflow-y-auto max-h-[65%] space-y-3 md:space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 pt-2 w-full px-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="h-10 md:pl-6 pl-2 p-2 rounded-[5px] dark:bg-zinc-600 bg-zinc-300 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
