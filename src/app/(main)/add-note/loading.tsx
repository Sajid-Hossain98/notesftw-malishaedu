import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10">
      {/* Title Skeleton */}
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-12 md:h-14 rounded-xl w-full bg-zinc-400" />
      </div>

      {/* University and Note Type Skeleton */}
      <div className="flex flex-col justify-between w-full space-y-6 sm:flex-row sm:space-y-0 gap-3">
        <div className="sm:w-[50%]">
          <Skeleton className="h-6 w-52 mb-2" />
          <Skeleton className="h-12 rounded-xl w-full bg-zinc-400" />
        </div>
        <div className="sm:w-[50%]">
          <Skeleton className="h-6 w-52 mb-2" />
          <Skeleton className="h-12 rounded-xl w-full bg-zinc-400" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="md:max-h-80">
        <Skeleton className="h-6 w-60 mb-2" />
        <Skeleton className="h-40 rounded-xl w-full bg-zinc-400" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-12 md:h-14 w-full mt-8 rounded-lg" />
    </div>
  );
}
