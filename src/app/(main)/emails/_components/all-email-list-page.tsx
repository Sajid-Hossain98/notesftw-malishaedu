"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AllEmailListItems } from "./all-email-list-items";

export const AllEmailListPage = () => {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchWords, setSearchWords] = useState(initialSearch);

  const handleClearSearch = () => setSearchWords("");

  return (
    <div>
      <div className="relative md:w-[40%] w-full md:ml-auto">
        {searchWords && (
          <X
            className="absolute z-10 w-5 h-5 text-gray-500 -translate-y-1/2 cursor-pointer right-3 top-1/2"
            onClick={handleClearSearch}
          />
        )}

        <Input
          className="dark:bg-[#303030] bg-[#FAFAFA] rounded-[3px] border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 dark:placeholder:caret-[#edf2f4] placeholder-gray-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[2px_2px_4px_rgba(255,255,255,0.3)] h-8 md:text-lg text-base placeholder:text-base md:placeholder:text-lg"
          type="text"
          placeholder="Email / University(e.g., NJTech / BNU)"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
        />
      </div>

      <AllEmailListItems searchWords={searchWords} />
    </div>
  );
};
