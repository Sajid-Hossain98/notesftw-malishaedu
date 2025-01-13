"use client";

import { fetchPaginatedNotes } from "@/lib/fetch-paginated-notes";
import { NotesWithUniTypeUser } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { AdminSearchInputField } from "./admin-search-input";
import { AdminAllNoteItems } from "./admin-all-note-items";

type NotesResponse = {
  notes: NotesWithUniTypeUser;
  totalPages: number;
  currentPage: number;
};

export const AdminAllNotes = () => {
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
          Excuse me sir, You are not authorized to view these items.
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && (error as any).status === 401) {
      return <div>You need to be logged in to access this page.</div>;
    }
    return <div>Something went wrong: {(error as Error).message}</div>;
  }

  return (
    <div>
      <form
        onSubmit={onSearchSubmitHandler}
        className="flex justify-end w-full"
      >
        <AdminSearchInputField
          value={searchInput}
          placeholder="University-wise search, e.g., NJTech / Nanjing Tech"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>

      <AdminAllNoteItems notes={data?.notes} />

      <div>
        <button
          className="disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, data?.totalPages || 1))
          }
          disabled={page === data?.totalPages}
        >
          Next
        </button>
      </div>

      <div>
        <p>
          Page {data?.currentPage} of {data?.totalPages}
        </p>
      </div>
    </div>
  );
};
