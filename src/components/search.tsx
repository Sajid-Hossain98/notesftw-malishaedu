"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchContent } from "./ui/search-content";
import { GroupedSearchedNotes } from "@/types";

// : Promise<SingleNotesWithUniTypeUser>
const fetchSearchResults = async (
  searchedUniversity: string
): Promise<GroupedSearchedNotes> => {
  try {
    const { data } = await axios.get(`/api/notes/search`, {
      params: {
        university: searchedUniversity,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching searched notes");
  }
};

export const SearchBar = () => {
  const [searchWords, setSearchWords] = useState<string>("");
  const debouncedSearchWords = useDebounce(searchWords, 500);
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useQuery<GroupedSearchedNotes>({
    queryKey: ["searchResults", debouncedSearchWords],
    queryFn: () => fetchSearchResults(debouncedSearchWords),
    enabled: debouncedSearchWords.length > 0,
  });

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          university: debouncedSearchWords,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedSearchWords, router, pathname]);

  return (
    <div className="relative md:h-16">
      <Image
        src="/malishaedu-logo.svg"
        height={54}
        width={54}
        alt="MalishaEdu's Logo"
        className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 left-1.5 aspect-square md:flex"
      />
      <span className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 right-1.5 aspect-square md:flex h-[54px] w-[54px]">
        <Search className="h-10 w-10 text-black m-auto stroke-2" />
      </span>
      <Input
        className="bg-[#242424] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 caret-[#edf2f4] placeholder-gray-500"
        type="text"
        placeholder="Search: e.g., #WIT, #YZU, #NTU, #NJUT"
        value={searchWords}
        onChange={(e) => setSearchWords(e.target.value)}
      />

      {debouncedSearchWords && (
        <SearchContent
          searchedNotes={data}
          searchError={error}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
