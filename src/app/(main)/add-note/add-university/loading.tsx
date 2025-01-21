import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10">
      {/* University Short Name Skeleton */}
      <div>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-12 md:h-14 rounded-xl w-full bg-zinc-400" />
      </div>

      {/* University Full Name Skeleton */}
      <div>
        <Skeleton className="h-6 w-52 mb-2" />
        <Skeleton className="h-12 md:h-14 rounded-xl w-full bg-zinc-400" />
      </div>

      {/* University Logo Upload Skeleton */}
      <div>
        <Skeleton className="h-6 w-44 mb-2" />
        <Skeleton className="h-12 md:h-14 rounded-xl w-full bg-zinc-400" />
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-12 md:h-14 w-full mt-8 rounded-xl bg-zinc-400" />
    </div>
  );
}
