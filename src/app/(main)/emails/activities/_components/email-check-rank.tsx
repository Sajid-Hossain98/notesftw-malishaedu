"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEmailCheckingRank } from "@/hooks/use-email-checking-rank";
import { cn } from "@/lib/utils";
import { UserData } from "@/types";
import { User } from "lucide-react";
import Image from "next/image";

interface EmailCheckRankProps {
  userData: UserData | null;
}

export const EmailCheckRank = ({ userData }: EmailCheckRankProps) => {
  const { data, isLoading, isError } = useEmailCheckingRank();

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {/* 2. Top Three Ranked Skeletons (Only the main container shape) */}
        <div className="md:absolute md:left-0 md:w-[48%] space-y-2 animate-pulse">
          <Skeleton className="w-64 h-6 rounded-xl md:w-80 dark:bg-zinc-600 bg-zinc-400 animate-pulse px-1 py-1 md:px-2 md:py-2" />

          {/* Rank 2 Skeleton (Silver: 90% Width, Medium Height) */}
          <div className="bg-zinc-400 dark:bg-zinc-600 w-[90%] rounded-tr-full rounded-br-full relative py-3 md:py-6 h-20 md:h-28" />

          {/* Rank 1 Skeleton (Gold: Full Width, Tallest) */}
          <div className="bg-zinc-400 dark:bg-zinc-600 w-full rounded-tr-full rounded-br-full relative md:py-8 py-5 h-24 md:h-32" />

          {/* Rank 3 Skeleton (Bronze: 80% Width, Medium Height) */}
          <div className="bg-zinc-400 dark:bg-zinc-600 w-[80%] rounded-tr-full rounded-br-full relative py-3 md:py-6 h-20 md:h-28" />
        </div>

        {/* 3. Rest of the Ranked List Skeletons (Unchanged, as they were already simplified) */}
        <div className="md:absolute md:left-1/2 md:w-1/2 md:max-h-[70vh] max-h-[45vh] overflow-hidden space-y-2 animate-pulse pt-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-start gap-1.5 md:gap-2 my-1 md:my-2 w-full md:w-[92%]"
            >
              {/* Rank Number Skeleton */}
              <Skeleton className="w-12 h-12 rounded-tl-full rounded-bl-full rounded-br-full md:w-16 md:h-14 dark:bg-zinc-600 bg-zinc-400" />

              {/* User Info Container Skeleton */}
              <div className="bg-zinc-400 dark:bg-zinc-600 rounded-[10px] w-full flex items-center gap-2 h-12 md:h-14">
                {/* User Image inside container */}
                <Skeleton className="object-cover h-full w-12 rounded-l-[10px] dark:bg-zinc-500 bg-zinc-300" />
                <div className="flex items-center justify-between w-full pl-1 pr-3 md:pr-6">
                  {/* User Name Skeleton */}
                  <Skeleton className="w-36 h-4 dark:bg-zinc-500 bg-zinc-300" />
                  {/* Count Skeleton */}
                  <Skeleton className="w-6 h-6 rounded-full dark:bg-zinc-500 bg-zinc-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (isError) return <p>Error loading ranking</p>;

  const topThreeRanked = data?.slice(0, 3);
  const restOfTheRanked = data?.slice(3);

  const displayOrder = [
    topThreeRanked?.[1],
    topThreeRanked?.[0],
    topThreeRanked?.[2],
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className="md:absolute md:left-0 md:w-[48%]">
        <h2 className="px-1 py-1 font-mono text-base font-semibold md:px-2 md:py-2 md:text-xl">
          ⦿ Monthly Email Check Leaderboard
        </h2>
        {displayOrder?.map((user) => {
          const currentUsersRankItem = userData?.id === user?.id;

          return (
            <div
              key={user?.id}
              className={cn(
                `flex items-center gap-2 pl-3 md:pl-5 md:pr-6 pr-3 rounded-tr-full rounded-br-full text-[#1A1A1A] relative`,
                user?.id === displayOrder[1]?.id &&
                  "bg-[#D4AF37] w-full shadow-[6px_-4px_8px_rgba(0,0,0,0.15),_6px_4px_8px_rgba(0,0,0,0.15),_6px_0px_8px_rgba(0,0,0,0.15)] z-10 md:py-8 py-5",
                user?.id === displayOrder[0]?.id &&
                  "bg-[#BDBCC4] w-[90%] shadow-[4px_-3px_6px_rgba(0,0,0,0.15),_4px_3px_6px_rgba(0,0,0,0.2),_4px_0px_6px_rgba(0,0,0,0.15)] py-3 md:py-6",
                user?.id === displayOrder[2]?.id &&
                  "bg-[#B5975C] w-[80%] shadow-[4px_-3px_6px_rgba(0,0,0,0.15),_4px_3px_6px_rgba(0,0,0,0.2),_4px_0px_6px_rgba(0,0,0,0.15)] py-3 md:py-6"
              )}
            >
              <div className="relative">
                <Image
                  src={`${
                    user?.id === displayOrder[1]?.id
                      ? "/static/crown-rank-one-gold.png"
                      : user?.id === displayOrder[0]?.id
                      ? "/static/crown-rank-two-silver.png"
                      : user?.id === displayOrder[2]?.id
                      ? "/static/crown-rank-three-bronze.png"
                      : ""
                  }`}
                  alt="crown"
                  height={100}
                  width={100}
                  quality={100}
                  className={cn(
                    `object-cover w-4 h-4 rounded-full select-none md:h-8 md:w-8 -rotate-[42deg] absolute`,
                    user?.id === displayOrder[1]?.id &&
                      "md:-left-3 -left-2 -top-1.5 md:-top-3 -rotate-[43deg]",
                    user?.id === displayOrder[0]?.id && "md:-left-3 md:-top-4",
                    user?.id === displayOrder[2]?.id && "md:-left-3 md:-top-4"
                  )}
                />
                <Image
                  src={user?.imageUrl ?? "/malishaedu-logo.png"}
                  alt="user"
                  height={100}
                  width={100}
                  quality={100}
                  className={cn(
                    `object-cover w-12 h-12 rounded-full select-none md:h-20 md:w-20`,
                    user?.id === displayOrder[1]?.id &&
                      "w-14 h-14 md:h-24 md:w-24"
                  )}
                />
              </div>

              <div
                className={cn(
                  `flex items-center gap-1`,
                  user?.id === displayOrder[1]?.id && "pl-2"
                )}
              >
                <h2 className="text-4xl font-semibold md:text-7xl">
                  {user?.count}
                </h2>
                <span className="flex flex-col items-start text-wrap">
                  <p className="text-xs font-semibold text-slate-700">
                    {user?.count && user?.count > 1
                      ? "mails have been "
                      : "mail has been "}
                    checked by
                  </p>
                  <span className="flex items-center gap-1 text-xs font-semibold md:text-sm">
                    <User className="w-3 h-3" />
                    {user?.name} {currentUsersRankItem && "⦅You⦆"}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:absolute md:left-1/2 md:w-1/2 md:max-h-[70vh] max-h-[45vh] overflow-y-auto md:[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:w-0.5 dark:[&::-webkit-scrollbar-track]:bg-[#303030] [&::-webkit-scrollbar-track]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:bg-stone-500">
        {restOfTheRanked?.map((user, index) => {
          const currentRank = index + 4;
          const currentUsersRankItem = userData?.id === user?.id;

          const formattedRank = String(currentRank).padStart(2, "0");

          return (
            <div
              key={user.id}
              className="flex items-center justify-start gap-1.5 md:gap-2 my-1 md:my-2"
            >
              <span className="bg-[#BDBCC4] px-1 md:px-2 py-3 rounded-tl-full rounded-bl-full rounded-br-full text-[#1A1A1A] font-semibold text-sm md:text-2xl md:h-14 h-12 flex items-center">
                {formattedRank}
              </span>

              <div className="bg-[#BDBCC4] rounded-[10px] text-[#1A1A1A] font-semibold md:w-[87%] w-full flex items-center gap-2 overflow-hidden h-12 md:h-14">
                <Image
                  src={user?.imageUrl ?? "/malishaedu-logo.png"}
                  alt="user"
                  height={50}
                  width={50}
                  quality={100}
                  className={cn(`object-cover h-full`)}
                />
                <div className="flex items-center justify-between w-full pl-1 pr-3 md:pr-6">
                  <h4>
                    {user.name}
                    {currentUsersRankItem && "⦅You⦆"}
                  </h4>
                  <p className="text-base font-semibold md:text-2xl">
                    {user.count}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
