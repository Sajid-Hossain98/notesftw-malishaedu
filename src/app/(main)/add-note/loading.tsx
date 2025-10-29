import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10">
      {/* Title Skeleton */}
      <div>
        <Skeleton className="w-40 h-6 mb-2" />
        <Skeleton className="w-full h-12 md:h-14 rounded-[5px] dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* University and Note Type Skeleton */}
      <div className="flex flex-col justify-between w-full gap-3 space-y-6 sm:flex-row sm:space-y-0">
        <div className="sm:w-[50%]">
          <Skeleton className="h-6 mb-2 w-52" />
          <Skeleton className="w-full h-12 rounded-[5px] dark:bg-zinc-600 bg-zinc-400" />
        </div>
        <div className="sm:w-[50%]">
          <Skeleton className="h-6 mb-2 w-52" />
          <Skeleton className="w-full h-12 rounded-[5px] dark:bg-zinc-600 bg-zinc-400" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="md:max-h-80">
        <Skeleton className="h-6 mb-2 w-60" />
        <Skeleton className="w-full h-40 rounded-[5px] dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="w-full h-6 mt-8 md:h-10 rounded-xl dark:bg-zinc-600 bg-zinc-400" />
    </div>
  );
}
