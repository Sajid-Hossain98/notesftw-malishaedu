"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import { Edit3, HeartCrack, School, Trash, X } from "lucide-react";
import { Universities } from "@/types";
import axios from "axios";
import useSWR from "swr";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

//fetching search results
const fetchSearchResults = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching searched notes");
  }
};

export const AdminSearchUniversities = () => {
  const [searchWords, setSearchWords] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    error: searchError,
    isLoading,
  } = useSWR<Universities>(
    searchWords.length > 0
      ? `/api/admin/universities?searched_university=${searchWords}`
      : null,
    fetchSearchResults
  );

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { searched_university: searchWords },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [searchWords, router, pathname]);

  const handleClearSearch = () => {
    setSearchWords("");
  };

  //checking if there are any available searched university!
  const hasUniversities = data && data.length > 0;

  return (
    <>
      <div className="relative">
        <Input
          className="bg-[#242424] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 caret-[#edf2f4] placeholder-gray-500"
          type="text"
          placeholder="e.g., NJTech / Nanjing Tech"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          autoFocus
        />

        {searchWords && (
          <X
            className="absolute right-3 h-5 w-5 top-[50%] -translate-y-1/2 text-white m-auto stroke-2 cursor-pointer z-10"
            onClick={handleClearSearch}
          />
        )}
      </div>
      {searchWords && (
        <>
          <motion.div
            className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto bg-stone-700 mt-2 px-2 md:px-4 py-2 rounded-xl md:!mb-12 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300"
            layout
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
          >
            {!isLoading && !hasUniversities && !searchError && (
              <div className="flex items-center justify-center gap-2 min-h-20 md:gap-3">
                <p className="text-xl font-semibold text-center text-gray-400">
                  No results found for{" "}
                  <span className="bg-slate-700 px-1 rounded-[3px] py-0.5 md:px-2">
                    &apos;{searchWords}&apos;
                  </span>
                </p>

                <HeartCrack className="w-5 h-5 text-rose-500" />
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-1 pl-1 transition-colors md:gap-2 rounded-xl w-full"
                  >
                    <div className="flex items-center gap-2 min-w-0 w-full px-1 md:px-2 py-1 md:py-2 hover:rounded-[4px]">
                      {/* Logo skeleton */}
                      <Skeleton className="rounded-full h-10 md:h-14 w-10 md:w-14 bg-zinc-500" />

                      <div className="flex flex-col gap-1">
                        {/* University name skeleton */}
                        <Skeleton className="w-32 sm:w-64 md:w-80 h-5 bg-zinc-500 rounded" />
                        {/* Short name + icon skeleton */}
                        <Skeleton className="w-20 h-4 bg-zinc-500 rounded" />
                      </div>
                    </div>

                    {/* Edit button skeleton */}
                    <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-zinc-500" />
                    {/* Delete button skeleton */}
                    <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-zinc-500" />
                  </div>
                ))}
              </div>
            )}

            {data &&
              data.map((university) => (
                <div
                  key={university.universityShortName}
                  className="flex items-center justify-between gap-1 pl-1 transition-colors md:gap-2 rounded-xl"
                >
                  <div className="flex items-center gap-2 min-w-0 md:hover:bg-[#3a3939] active:bg-[#3a3939] w-full px-1 md:px-2 py-1 md:py-2 hover:rounded-[4px]">
                    <Image
                      src={`${process.env
                        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
                        university?.logoImage
                      }`}
                      className="rounded-full h-10 md:h-14 w-10 md:w-14 object-cover select-none bg-zinc-100 p-[1.5px]"
                      alt="University Logo"
                      height={100}
                      width={100}
                    />
                    <div>
                      <h3 className="text-base font-semibold truncate md:text-lg">
                        {university.universityFullName}
                      </h3>
                      <span className="flex items-baseline gap-1 text-xs">
                        <School className="w-3 h-3 md:h-3 md:w-3" />

                        {university.universityShortName}
                      </span>
                    </div>
                  </div>

                  <button className="px-3 py-3 rounded-full cursor-pointer md:hover:bg-black active:bg-black">
                    <Edit3 className="w-4 h-4 md:h-5 md:w-5" />
                  </button>
                  <button className="px-3 py-3 rounded-full cursor-pointer md:hover:bg-black active:bg-black">
                    <Trash className="w-4 h-4 md:h-5 md:w-5" />
                  </button>
                </div>
              ))}
          </motion.div>
          <div>{searchError?.message}</div>
        </>
      )}
    </>
  );
};
