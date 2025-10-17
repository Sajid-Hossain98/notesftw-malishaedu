import { Skeleton } from "@/components/ui/skeleton";

export default function UsersListLoading() {
  return (
    <div className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 rounded-tl-[8px] rounded-bl-[8px]">
      <div className="divide-y divide-[#3a3a3a]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-[#303030] px-3 py-3"
          >
            {/* Left section: Avatar + name + email */}
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full bg-zinc-600" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32 bg-zinc-600" />
                <Skeleton className="h-3 w-44 bg-zinc-600" />
              </div>
            </div>

            {/* Right section: dropdown role placeholder */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 rounded-[4px] bg-zinc-600" />
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
