import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="space-y-3 md:space-y-8">
      <Skeleton className="h-10 w-full md:h-16 bg-zinc-400 rounded-full" />{" "}
      {/* Search Bar Skeleton */}
      <div className="md:max-h-[70dvh] max-h-[65vh] bg-zinc-600 rounded-xl p-3 md:p-5 overflow-y-auto md:!mb-12">
        {/* Notes List Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-zinc-500 rounded-xl">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="p-2 md:p-3 space-y-1 bg-opacity-5 relative overflow-hidden rounded-md animate-pulse"
            >
              <div className="flex items-center gap-2 md:gap-4">
                <Skeleton className="rounded-full h-14 md:h-20 w-14 md:w-20 bg-zinc-400" />{" "}
                {/* University Logo */}
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-5 w-3/4 md:h-6 bg-zinc-400" />{" "}
                  {/* Title */}
                  <Skeleton className="h-4 w-full md:h-5 bg-zinc-400" />{" "}
                  {/* Description */}
                  <Skeleton className="h-4 w-1/2 md:h-5 bg-zinc-400" />{" "}
                  {/* Badge */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
