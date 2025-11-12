import { useEmails } from "@/hooks/useEmails";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
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
        visibleRows.stopIndex >= allEmails.length - 5 && hasNextPage;
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
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-red-500 text-center p-4">Failed to load emails.</div>
    );
  }

  if (status === "success" && allEmails.length === 0) {
    return <div className="text-gray-500 text-center">No emails found.</div>;
  }

  // Row renderer
  function RowComponent({
    index,
    style,
    emails,
  }: RowComponentProps<{ emails: typeof allEmails }>) {
    const email = emails[index];
    return (
      <div
        key={email.id}
        className="border border-b-zinc-400 px-1 font-sans"
        style={style}
      >
        <p className="font-semibold text-base md:text-xl">{email.email}</p>
        <div className="flex gap-1 mt-1">
          {email.universities?.map((u) => (
            <span
              key={u.universityShortName}
              onClick={() => handleUniversityClick(u.universityShortName)}
              className={cn(
                "rounded-[2px] px-1 pt-0.5 text-xs cursor-pointer dark:text-[#FAFAFA] text-[#1A1A1A] font-semibold",
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
    <div className="h-[65vh]">
      <List
        rowComponent={RowComponent}
        rowCount={allEmails.length}
        rowHeight={60}
        rowProps={{ emails: allEmails }}
        onRowsRendered={handleRowsRendered}
        overscanCount={5}
        className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-400 [&::-webkit-scrollbar-thumb]:bg-stone-600/80"
      />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-gray-400" size={24} />
        </div>
      )}
    </div>
  );
};
