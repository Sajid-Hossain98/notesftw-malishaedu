"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EmailListItems } from "./email-list-items";
import { useSearchParams } from "next/navigation";

export const EmailListPage = () => {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchWords, setSearchWords] = useState(initialSearch);

  const handleClearSearch = () => setSearchWords("");

  return (
    <div>
      <div className="relative md:w-[40%] w-full md:ml-auto">
        {searchWords && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            onClick={handleClearSearch}
            className="absolute z-10 w-5 h-5 text-[#1A1A1A] dark:text-[#FAFAFA] -translate-y-1/2 cursor-pointer right-3 top-1/2"
          >
            <path
              transform="rotate(45 512 512)"
              d="M555.08992 513.35168a36.864 36.864 0 0 1-36.74112-36.864V155.648a36.864 36.864 0 0 1 73.728 0v284.09856l285.24544 1.024a36.864 36.864 0 1 1-0.24576 73.728l-321.9456-1.14688zM501.06368 567.37792a36.864 36.864 0 0 0-36.864-36.74112H143.36a36.864 36.864 0 1 0 0 73.728h284.09856l1.024 285.24544a36.864 36.864 0 0 0 73.728-0.24576l-1.14688-321.98656z"
            ></path>
          </svg>
        )}

        <Input
          className="dark:bg-[#303030] bg-[#FAFAFA] rounded-[3px] border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 dark:placeholder:caret-[#edf2f4] placeholder-gray-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[2px_2px_4px_rgba(255,255,255,0.3)] h-8 md:text-lg text-base placeholder:text-base md:placeholder:text-lg"
          type="text"
          placeholder="Email / University(e.g., NJTech / BNU)"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
        />
      </div>

      <EmailListItems searchWords={searchWords} />
    </div>
  );
};
