"use client";

import { usePathname, useRouter } from "next/navigation";
import { AdminSearchInputField } from "../../_components/admin-search-input";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import { X } from "lucide-react";
import { Universities } from "@/types";

interface AdminSearchUniversitiesProps {
  universities: Universities | undefined;
}

export const AdminSearchUniversities = ({
  universities,
}: AdminSearchUniversitiesProps) => {
  const [searchWords, setSearchWords] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

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

  return (
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
  );
};
