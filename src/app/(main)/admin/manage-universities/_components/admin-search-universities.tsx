"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import { BadgeInfo, Edit3, HeartCrack, School, Trash, X } from "lucide-react";
import { Universities } from "@/types";
import axios from "axios";
import useSWR from "swr";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useModal } from "@/hooks/use-modal-store";

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

  const { onOpen } = useModal();

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
          className="dark:bg-[#303030] bg-[#FAFAFA] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 dark:caret-[#edf2f4] placeholder-gray-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-none"
          type="text"
          placeholder="e.g., NJTech / Nanjing Tech"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          autoFocus
        />

        {searchWords && (
          <X
            className="absolute right-3 h-5 w-5 top-[50%] -translate-y-1/2 dark:text-white m-auto stroke-2 cursor-pointer z-10 mr-2"
            onClick={handleClearSearch}
          />
        )}
      </div>
      <span className="justify-center hidden gap-1 mt-1 text-xs md:flex dark:text-zinc-400 text-zinc-500">
        Info
        <button
          className="cursor-help"
          title="So basically, 'MODERATOR' & 'ADMIN' can edit the name and short name of all the universities but only the 'ADMIN' will be able to delete a university."
        >
          <BadgeInfo className="w-4 h-4" />
        </button>
      </span>
      {searchWords && (
        <>
          <motion.div
            className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto dark:bg-stone-700 bg-[#FAFAFA] mt-2 px-2 md:px-4 py-2 rounded-xl md:!mb-12 [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-track]:bg-stone-600 dark:[&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:bg-stone-500"
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
                    className="flex items-center justify-between w-full gap-1 pl-1 transition-colors md:gap-2 rounded-xl"
                  >
                    <div className="flex items-center gap-2 min-w-0 w-full px-1 md:px-2 py-1 md:py-2 hover:rounded-[4px]">
                      {/* Logo skeleton */}
                      <Skeleton className="w-10 h-10 rounded-full md:h-14 md:w-14 dark:bg-zinc-600 bg-zinc-400" />

                      <div className="flex flex-col gap-1">
                        {/* University name skeleton */}
                        <Skeleton className="w-32 h-5 rounded sm:w-64 md:w-80 dark:bg-zinc-600 bg-zinc-400" />
                        {/* Short name + icon skeleton */}
                        <Skeleton className="w-20 h-4 rounded dark:bg-zinc-600 bg-zinc-400" />
                      </div>
                    </div>

                    {/* Edit button skeleton */}
                    <Skeleton className="w-10 h-10 rounded-full md:h-12 md:w-12 dark:bg-zinc-600 bg-zinc-400" />
                    {/* Delete button skeleton */}
                    <Skeleton className="w-10 h-10 rounded-full md:h-12 md:w-12 dark:bg-zinc-600 bg-zinc-400" />
                  </div>
                ))}
              </div>
            )}

            {data &&
              data.map((university) => {
                const {
                  id,
                  universityFullName,
                  universityShortName,
                  logoImage,
                } = university;

                return (
                  <div
                    key={universityShortName}
                    className="flex items-center justify-between gap-1 pl-1 transition-colors md:gap-2 rounded-xl"
                  >
                    <div className="flex items-center gap-2 min-w-0 dark:md:hover:bg-[#3a3939] dark:active:bg-[#3a3939] w-full px-1 md:px-2 py-1 md:py-2 hover:rounded-[4px] md:hover:bg-zinc-200/80 active:bg-zinc-200/80">
                      <Image
                        src={`${process.env
                          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${logoImage}`}
                        className="rounded-full h-10 md:h-14 w-10 md:w-14 object-cover select-none bg-zinc-100 p-[1.5px]"
                        alt="University Logo"
                        height={100}
                        width={100}
                      />
                      <div>
                        <h3 className="text-base font-semibold truncate md:text-lg">
                          {universityFullName}
                        </h3>
                        <span className="flex items-baseline gap-1 text-xs">
                          <School className="w-3 h-3 md:h-3 md:w-3" />

                          {universityShortName}
                        </span>
                      </div>
                    </div>

                    <button
                      className="px-3 py-3 rounded-full cursor-pointer dark:md:hover:bg-black dark:active:bg-black md:hover:bg-zinc-200/80 active:bg-zinc-200/80"
                      onClick={() =>
                        onOpen("editUniversity", {
                          university: {
                            id: id,
                            universityShortName: universityShortName,
                            universityFullName: universityFullName,
                          },
                        })
                      }
                      title={`Edit - "${universityFullName}"`}
                    >
                      <Edit3 className="w-4 h-4 md:h-5 md:w-5" />
                    </button>
                    <button
                      className="px-3 py-3 rounded-full cursor-pointer dark:md:hover:bg-black dark:active:bg-black md:hover:bg-zinc-200/80 active:bg-zinc-200/80"
                      onClick={() =>
                        onOpen("deleteUniversity", {
                          university: {
                            id: id,
                            universityShortName: universityShortName,
                            universityFullName: universityFullName,
                            logoImage: logoImage,
                          },
                        })
                      }
                      title={`Delete - "${universityFullName}"`}
                    >
                      <Trash className="w-4 h-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                );
              })}
          </motion.div>
          <div>{searchError?.message}</div>
        </>
      )}
    </>
  );
};
