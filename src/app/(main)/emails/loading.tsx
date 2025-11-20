import { Skeleton } from "@/components/ui/skeleton";

// Assuming you have access to the same Skeleton component
// as used in CodeOfConductPageLoading

export default function EmailListItemsLoading() {
  return (
    // The main container height should match the list height (h-[60vh] !mt-2 md:!mt-4)
    <div className="h-[60vh] !mt-2 md:!mt-4">
      {/* 1. Filter/Activity Link Header Skeleton */}
      <div className="flex items-center justify-between">
        {/* Filtered by: Label & University Filter */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* "Filtered by:" Label */}
          <Skeleton className="w-24 h-5 rounded-md dark:bg-zinc-600 bg-zinc-400" />

          {/* Simulated University Filter Button (if one is selected initially) */}
          <Skeleton className="w-16 h-4 rounded-[2px] dark:bg-zinc-600 bg-zinc-400" />
        </div>

        {/* Activities Link Skeleton */}
        <Skeleton className="w-20 h-7 rounded-[3px] dark:bg-zinc-600 bg-zinc-400" />
      </div>

      {/* Separator Line Skeleton */}
      <Skeleton className="h-[1px] w-full bg-zinc-400 mt-1 mb-2" />

      {/* 2. Email List Items Skeleton (Simulating the virtualized list) */}
      <div className="space-y-2 pt-1 animate-pulse">
        {/* Create 8 list item skeletons to fill the visible area */}
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-1 border-b md:py-1 border-b-zinc-400/80 dark:border-b-zinc-700 h-[75px]" // h-[75px] matches rowHeight
          >
            <div className="flex items-start gap-2 md:gap-3">
              {/* Check/Copy Buttons (Small Circles) */}
              <Skeleton className="w-8 h-8 rounded-full md:w-10 md:h-10 dark:bg-zinc-600 bg-zinc-400" />
              <Skeleton className="w-8 h-8 rounded-full md:w-10 md:h-10 dark:bg-zinc-600 bg-zinc-400" />

              <div className="space-y-1">
                {/* Email (Large Text) */}
                <Skeleton className="w-64 h-5 rounded-md md:w-96 dark:bg-zinc-600 bg-zinc-400" />
                {/* Last Checked Info (Small Text) */}
                <Skeleton className="w-40 h-3 rounded-md md:w-64 dark:bg-zinc-600 bg-zinc-400" />

                {/* University Tags (Simulated) */}
                <div className="flex gap-2">
                  <Skeleton className="w-12 h-3 rounded-[2px] dark:bg-zinc-600 bg-zinc-400" />
                  <Skeleton className="w-10 h-3 rounded-[2px] dark:bg-zinc-600 bg-zinc-400" />
                </div>
              </div>
            </div>

            {/* History Button (Simulated on the right) */}
            <Skeleton className="w-10 h-10 rounded-full dark:bg-zinc-600 bg-zinc-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
