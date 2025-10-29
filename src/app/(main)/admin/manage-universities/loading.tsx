import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full mx-auto mt-6 space-y-2">
      {/* Search Input Skeleton */}
      <div className="relative w-full">
        <Skeleton className="w-full h-10 rounded-full md:h-12 dark:bg-zinc-600 bg-zinc-300" />

        {/* X icon skeleton */}
        <Skeleton className="absolute w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 dark:bg-zinc-600 bg-zinc-300" />
      </div>

      {/* Info text and tooltip skeleton */}
      <div className="items-center justify-center hidden gap-2 mt-1 md:flex">
        <Skeleton className="h-4 w-20 dark:bg-zinc-600 bg-zinc-300 rounded-[4px]" />
        <Skeleton className="w-4 h-4 rounded-full dark:bg-zinc-600 bg-zinc-300" />
      </div>
    </div>
  );
}
