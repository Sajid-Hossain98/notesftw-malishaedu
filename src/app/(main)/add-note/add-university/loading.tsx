import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10">
      {/* University Short Name Skeleton */}
      <div>
        <Skeleton className="w-48 h-6 mb-2" />
        <Skeleton className="h-12 md:h-14 rounded-[5px] w-full dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* University Full Name Skeleton */}
      <div>
        <Skeleton className="h-6 mb-2 w-52" />
        <Skeleton className="h-12 md:h-14 rounded-[5px] w-full dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* University Logo Upload Skeleton */}
      <div>
        <Skeleton className="h-6 mb-2 w-44" />
        <Skeleton className="h-12 md:h-14 rounded-[5px] w-full dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="w-full h-6 mt-8 md:h-10 rounded-xl dark:bg-zinc-600 bg-zinc-400" />
    </div>
  );
}
