"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { EmailListItems } from "./email-list-items";
import { useSearchParams } from "next/navigation";

export const EmailListPage = () => {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchWords, setSearchWords] = useState(initialSearch);

  const handleClearSearch = () => setSearchWords("");

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="">
        {searchWords && (
          <X
            className="absolute right-3 h-5 w-5 top-[50%] -translate-y-1/2 text-gray-500 cursor-pointer z-10"
            onClick={handleClearSearch}
          />
        )}
        <Input
          className="dark:bg-[#303030] bg-[#FAFAFA] rounded-[3px] border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 dark:placeholder:caret-[#edf2f4] placeholder-gray-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-none w-[30%] md:text-base absolute right-0 top-2"
          type="text"
          placeholder="Email / University"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
        />
      </div>

      <EmailListItems searchWords={searchWords} />
    </div>
  );
};
