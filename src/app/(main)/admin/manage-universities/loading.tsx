import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full mx-auto mt-6 space-y-2">
      {/* Search Input Skeleton */}
      <div className="relative w-full">
        <Skeleton className="h-10 md:h-12 w-full rounded-full bg-zinc-500/60" />

        {/* X icon skeleton */}
        <Skeleton className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-zinc-500/80" />
      </div>

      {/* Info text and tooltip skeleton */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-1">
        <Skeleton className="h-4 w-20 bg-zinc-500/60" />
        <Skeleton className="h-4 w-4 rounded-full bg-zinc-500/80" />
      </div>
    </div>
  );
}
