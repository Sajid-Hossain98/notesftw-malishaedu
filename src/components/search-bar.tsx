"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { BadgeInfo, Search, SearchX } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import useSWR from "swr";
import axios from "axios";
import { SearchContent } from "./search-content";
import { GroupedSearchedNotes } from "@/types";

//fetcher for SWR
const fetchSearchResults = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching searched notes");
  }
};

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [searchWords, setSearchWords] = useState<string>(initialQuery);
  // const debouncedSearchWords = useDebounce(searchWords, 10);

  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useSWR<GroupedSearchedNotes>(
    searchWords.length > 0 ? `/api/notes/search?search=${searchWords}` : null,
    fetchSearchResults
  );

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { search: searchWords },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [searchWords, router, pathname]);

  const handleClearSearch = () => {
    setSearchWords("");
  };

  return (
    <div className="relative">
      <div className="relative md:h-16">
        <Image
          src="/malishaedu-logo.svg"
          height={54}
          width={54}
          alt="MalishaEdu's Logo"
          className="absolute hidden transform -translate-y-1/2 bg-zinc-200/80 rounded-full top-1/2 left-1.5 aspect-square md:flex select-none"
        />
        <span
          className="absolute hidden transform -translate-y-1/2 bg-zinc-200/80 rounded-full top-1/2 right-1.5 aspect-square md:flex h-[54px] w-[54px] cursor-pointer"
          onClick={handleClearSearch}
        >
          {searchWords ? (
            <SearchX className="w-10 h-10 m-auto text-black stroke-2" />
          ) : (
            <Search className="w-10 h-10 m-auto text-black stroke-2" />
          )}
        </span>
        {searchWords && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            className="md:hidden absolute right-3 h-5 w-5 top-[50%] -translate-y-1/2 text-[#1A1A1A] dark:text-[#FAFAFA] m-auto stroke-2 cursor-pointer z-10"
            onClick={handleClearSearch}
          >
            <path
              transform="rotate(45 512 512)"
              d="M555.08992 513.35168a36.864 36.864 0 0 1-36.74112-36.864V155.648a36.864 36.864 0 0 1 73.728 0v284.09856l285.24544 1.024a36.864 36.864 0 1 1-0.24576 73.728l-321.9456-1.14688zM501.06368 567.37792a36.864 36.864 0 0 0-36.864-36.74112H143.36a36.864 36.864 0 1 0 0 73.728h284.09856l1.024 285.24544a36.864 36.864 0 0 0 73.728-0.24576l-1.14688-321.98656z"
            ></path>
          </svg>
        )}
        {/* bg-[#242424] */}
        <Input
          className="dark:bg-[#303030] bg-[#FAFAFA] h-full px-5 text-center rounded-full border-none dark:placeholder:caret-[#edf2f4] placeholder-gray-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-none"
          type="text"
          placeholder="e.g., NJTech / Nanjing Tech / Business Administration"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          autoFocus
        />
      </div>
      <span className="justify-center hidden gap-1 mt-1 text-xs md:flex dark:text-zinc-400 text-zinc-600">
        Having difficulties searching?
        <button
          className="cursor-help"
          title="You can search using a university's short name, full name, note title, or even major names (e.g., 'Mechanical Engineering'). It's not case-sensitive, so you can type in uppercase or lowercase. A list of short names will be available soon."
        >
          <BadgeInfo className="w-4 h-4" />
        </button>
      </span>
      {searchWords && (
        <div className="absolute z-40 w-full top-full">
          <SearchContent
            searchedNotes={data}
            searchError={error}
            isLoading={isLoading}
            debouncedSearchWords={searchWords}
          />
        </div>
      )}
    </div>
  );
};
