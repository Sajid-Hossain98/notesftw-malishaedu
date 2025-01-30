"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { BadgeInfo, Search, SearchX, X } from "lucide-react";
import { useState, useEffect } from "react";
// import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import useSWR from "swr";
import axios from "axios";
import { SearchContent } from "./ui/search-content";
import { GroupedSearchedNotes } from "@/types";
import { ActionTooltip } from "./action-tooltip";

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
  const [searchWords, setSearchWords] = useState<string>("");
  // const debouncedSearchWords = useDebounce(searchWords, 10);
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useSWR<GroupedSearchedNotes>(
    searchWords.length > 0
      ? `/api/notes/search?university=${searchWords}`
      : null,
    fetchSearchResults
  );

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { university: searchWords },
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
          className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 left-1.5 aspect-square md:flex"
        />
        <span
          className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 right-1.5 aspect-square md:flex h-[54px] w-[54px] cursor-pointer"
          onClick={handleClearSearch}
        >
          {searchWords ? (
            <SearchX className="h-10 w-10 text-black m-auto stroke-2" />
          ) : (
            <Search className="h-10 w-10 text-black m-auto stroke-2" />
          )}
        </span>

        {searchWords && (
          <X
            className="md:hidden absolute right-3 h-5 w-5 top-[50%] -translate-y-1/2 text-white m-auto stroke-2 cursor-pointer z-10"
            onClick={handleClearSearch}
          />
        )}

        <Input
          className="bg-[#242424] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 caret-[#edf2f4] placeholder-gray-500"
          type="text"
          placeholder="e.g., NJTech / Nanjing Tech"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          autoFocus
        />
      </div>
      <span className="text-xs hidden md:flex gap-1 justify-center mt-1 text-zinc-400">
        Having difficulties searching?
        <ActionTooltip
          side="bottom"
          label="You can search typing either the short name of the university or full name! A list of short names will be provided soon."
        >
          <BadgeInfo className="h-4 w-4" />
        </ActionTooltip>
      </span>
      {searchWords && (
        <div className="absolute top-full w-full z-40">
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
