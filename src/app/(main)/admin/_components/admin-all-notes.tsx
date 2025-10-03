"use client";

import { fetchPaginatedNotes } from "@/lib/fetch-paginated-notes";
import { NotesWithUniTypeUser } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { AdminSearchInputField } from "./admin-search-input";
import { AdminAllNoteItems } from "./admin-all-note-items";
import { X } from "lucide-react";

type NotesResponse = {
  notes: NotesWithUniTypeUser;
  totalPages: number;
  currentPage: number;
};

interface AdminAllNotesProps {
  universityShortNames: { universityShortName: string }[];
  noteTypes: { name: string }[];
}

export const AdminAllNotes = ({
  universityShortNames,
  noteTypes,
}: AdminAllNotesProps) => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchNotes, setSearchNotes] = useState("");
  const limit = 5;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryPage = searchParams.get("allNotesPage");
    const querySearch = searchParams.get("searchedNotes");

    if (queryPage) {
      setPage(Number(queryPage));
    }

    if (querySearch) {
      setSearchNotes(querySearch);
      setSearchInput(querySearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          allNotesPage: page,
          searchedNotes: searchNotes,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [page, pathname, router, searchNotes]);

  const { data, isError, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ["adminNotes", page, searchNotes],
    queryFn: () => fetchPaginatedNotes(page, limit, searchNotes),
    placeholderData: keepPreviousData,
  });

  const onSearchSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchNotes(searchInput);
    setPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && (error as any).status === 403) {
      return (
        <div className="mt-8 text-xl font-semibold text-center text-rose-500">
          Excuse me sir, You are not authorized to view these items! &quot;GO
          HOME&quot;
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && (error as any).status === 401) {
      return <div>You need to be logged-in to access this page.</div>;
    }
    return <div>Something went wrong: {(error as Error).message}</div>;
  }

  return (
    <div>
      <form
        onSubmit={onSearchSubmitHandler}
        className="flex items-center justify-end w-full gap-2"
      >
        <div className="relative w-full">
          <AdminSearchInputField
            value={searchInput}
            placeholder="e.g., NJTech / Nanjing Tech"
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {searchInput && (
            <X
              className="absolute w-4 h-4 -translate-y-1/2 cursor-pointer md:right-3 right-1 top-1/2 md:h-5 md:w-5"
              onClick={() => setSearchInput("")}
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#242424] px-2 py-1 md:py-2 text-xs md:text-base font-semibold rounded-[3px]"
        >
          Search
        </button>
      </form>

      <AdminAllNoteItems
        notes={data?.notes}
        universityShortNames={universityShortNames}
        noteTypes={noteTypes}
      />

      <div className="flex items-center justify-between mt-3 md:justify-end md:mt-5 md:gap-3">
        <button
          className="px-4 py-2 text-xs font-bold text-black transition-colors bg-gray-500 rounded-l disabled:cursor-not-allowed disabled:bg-opacity-30 hover:bg-gray-500/95 disabled:hover:bg-gray-500/30 md:text-base disabled:text-stone-500"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <p className="text-sm font-semibold md:text-base">
          {data?.currentPage} / {data?.totalPages}
        </p>
        <button
          className="px-4 py-2 text-xs font-bold text-black transition-colors bg-gray-500 rounded-r disabled:cursor-not-allowed disabled:bg-opacity-30 hover:bg-gray-500/95 disabled:hover:bg-gray-500/30 md:text-base disabled:text-stone-500"
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, data?.totalPages || 1))
          }
          disabled={page === data?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
