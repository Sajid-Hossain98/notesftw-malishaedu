import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { useEmails } from "@/hooks/useEmails";
import { cn } from "@/lib/utils";
import { HeartCrack, Smile } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { List, type RowComponentProps } from "react-window";

interface EmailListItemsProps {
  searchWords: string;
}

export const EmailListItems = ({ searchWords }: EmailListItemsProps) => {
  const searchParams = useSearchParams();

  const initialUniversity = searchParams.get("university") || null;

  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    initialUniversity
  );

  const router = useRouter();
  const pathname = usePathname();

  // Update the URL when search changes
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: searchWords || undefined,
          university: selectedUniversity || undefined,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [pathname, router, searchWords, selectedUniversity]);

  // Hook to fetch emails with pagination
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, status } =
    useEmails({ search: searchWords, university: selectedUniversity || "" });

  const allEmails = data?.pages.flatMap((page) => page.emails) ?? [];

  const handleRowsRendered = useCallback(
    (visibleRows: { startIndex: number; stopIndex: number }) => {
      const nearEnd =
        visibleRows.stopIndex >= allEmails.length - 2 && hasNextPage;
      if (nearEnd && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [allEmails.length, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const handleUniversityClick = (universityShortName: string) => {
    setSelectedUniversity((prev) =>
      prev === universityShortName ? null : universityShortName
    );
  };

  if (status === "pending") {
    return (
      <div className="flex justify-center p-8">
        <Spinner size={"icon"} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center md:text-2xl text-lg gap-1 p-4">
        <HeartCrack className="text-red-500" />
        Failed to load emails
      </div>
    );
  }

  if (status === "success" && allEmails.length === 0) {
    return (
      <>
        {selectedUniversity ? (
          <>
            <div className="flex items-center md:gap-3 gap-2 mt-2 md:mt-4">
              <span className="text-lg font-semibold">
                Filtered by:{" "}
                <span className="font-bold text-xs underline">
                  #{selectedUniversity}
                </span>
              </span>

              <button
                onClick={() => setSelectedUniversity(null)}
                className="px-2 py-0 bg-rose-500 dark:bg-rose-400 md:hover:bg-rose-500/85 dark:md:hover:bg-rose-400/95 transition-colors rounded-[2px] font-medium text-white dark:text-[#1A1A1A]"
              >
                Clear
              </button>
            </div>
            <Separator className="h-[1px] bg-zinc-400 mt-1 mb-2" />
          </>
        ) : (
          <div className="h-[33px] mb-2" />
        )}

        <div className="flex items-center justify-center md:text-2xl text-lg gap-1 py-4">
          <Smile className="text-red-500" />
          No emails found
          {searchWords && !selectedUniversity && (
            <span>
              matching{" "}
              <span className="text-red-500">&quot;{searchWords}&quot;</span>
            </span>
          )}
          {searchWords && selectedUniversity && (
            <span>
              matching{" "}
              <span className="text-red-500">&quot;{searchWords}&quot; </span>
              for <span className="text-red-500">#{selectedUniversity}</span>
            </span>
          )}
        </div>
      </>
    );
  }

  // Row renderer
  function RowComponent({
    index,
    style,
    emails,
    isFetchingNextPage, // add this to rowProps
  }: RowComponentProps<{
    emails: typeof allEmails;
    isFetchingNextPage: boolean;
  }>) {
    // Check if this is the loader row
    if (index === emails.length && isFetchingNextPage) {
      return (
        <div
          style={style}
          className="flex items-center justify-center w-full h-full"
        >
          <Spinner size="lg" />
        </div>
      );
    }

    const email = emails[index];

    return (
      <div
        key={email.id}
        className="border-b border-b-zinc-400/80 dark:border-b-zinc-700 px-1"
        style={style}
      >
        <p className="font-medium text-base md:text-xl">{email.email}</p>
        <div className="flex gap-0.5 mt-1">
          {email.universities?.map((u) => (
            <span
              key={u.universityShortName}
              onClick={() => handleUniversityClick(u.universityShortName)}
              className={cn(
                "rounded-[2px] px-1 py-0.5 text-xs cursor-pointer dark:text-[#FAFAFA] text-[#1A1A1A] font-bold",
                selectedUniversity === u.universityShortName &&
                  "bg-green-300 dark:bg-green-400 dark:text-[#1A1A1A]"
              )}
            >
              #{u.universityShortName}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[60vh] !mt-2 md:!mt-4">
      {selectedUniversity ? (
        <>
          <div className="flex items-center md:gap-3 gap-2 w-fit">
            <span className="text-lg font-semibold">
              Filtered by:{" "}
              <span className="font-bold text-xs underline">
                #{selectedUniversity}
              </span>
            </span>

            <button
              onClick={() => setSelectedUniversity(null)}
              className="px-2 py-0 bg-rose-500 dark:bg-rose-400 md:hover:bg-rose-500/85 dark:md:hover:bg-rose-400/95 transition-colors rounded-[2px] font-medium text-white dark:text-[#1A1A1A]"
            >
              Clear
            </button>
          </div>
          <Separator className="h-[1px] bg-zinc-400 mt-1 mb-2" />
        </>
      ) : (
        <div className="h-[33px] mb-2" />
      )}

      <List
        rowComponent={RowComponent}
        rowCount={allEmails.length + (isFetchingNextPage ? 1 : 0)}
        rowHeight={60}
        rowProps={{ emails: allEmails, isFetchingNextPage }}
        onRowsRendered={handleRowsRendered}
        overscanCount={5}
        className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-[5px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-400 [&::-webkit-scrollbar-thumb]:bg-stone-600/80"
      />
    </div>
  );
};
