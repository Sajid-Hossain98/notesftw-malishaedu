import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { useEmails } from "@/hooks/useEmails";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, Copy, HeartCrack, Smile } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import { toast } from "sonner";
import { motion } from "motion/react";
import Link from "next/link";
import { IndividualMailCheckingHistory } from "./individual-mail-checking-history";

interface EmailListItemsProps {
  searchWords: string;
}

export const EmailListItems = ({ searchWords }: EmailListItemsProps) => {
  const searchParams = useSearchParams();

  const initialUniversity = searchParams.get("university") || null;

  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    initialUniversity
  );

  const [fadingEmails, setFadingEmails] = useState<Set<string>>(new Set());

  const queryClient = useQueryClient();
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

  const handleEmailCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success(`Copied ${email}`, {
      style: {
        color: "#1A1A1A",
        background: "#4ade80",
      },
      position: "bottom-left",
    });
  };

  const handleEmailCheck = async (email: string, emailId: string) => {
    try {
      setFadingEmails((prev) => new Set(prev).add(emailId));

      // Wait for fade animation
      await new Promise((res) => setTimeout(res, 100));
      // Optimistically remove the email from the cache
      queryClient.setQueryData<
        { pages: { emails: typeof allEmails }[] } | undefined
      >(["emails"], (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page) => ({
          ...page,
          emails: page.emails.filter((email) => email.id !== emailId),
        }));

        return { ...oldData, pages: newPages };
      });

      // Call API
      await axios.post("/api/emails/email-check-history", { emailId });

      toast.success(`Checked "${email}"`);

      // Optionally, refetch to ensure latest server state
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    } catch (error) {
      // If error, roll back optimistic update
      queryClient.invalidateQueries({ queryKey: ["emails"] });

      if (error instanceof Error) {
        toast.error(
          <div>
            <span>Something went wrong!</span>
          </div>
        );
      }
    }
  };

  if (status === "pending") {
    return (
      <div className="flex justify-center mt-12 md:mt-20">
        <Spinner size={"icon"} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center gap-1 p-4 text-lg md:text-2xl">
        <HeartCrack className="text-red-500" />
        Failed to load emails
      </div>
    );
  }

  if (status === "success" && allEmails.length === 0) {
    return (
      <>
        <div className="flex items-center gap-1 mt-2 md:gap-3 md:mt-4">
          <span className="text-lg font-semibold">Filtered by:</span>
          {selectedUniversity && (
            <>
              <div className="flex items-baseline gap-2 md:gap-3 w-fit">
                <span className="text-xs font-bold underline">
                  #{selectedUniversity}
                </span>
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="px-2 py-0 bg-green-300 md:hover:bg-green-300/70 dark:bg-green-400 dark:md:hover:bg-green-400/90 transition-colors rounded-[2px] font-medium text-[#1A1A1A]"
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
        <Separator className="h-[1px] bg-zinc-400 mt-1 mb-2" />

        <div className="flex items-center justify-center gap-1 py-4 text-lg md:text-2xl">
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

    let formattedDate = null;

    const lastCheckedAtDate = email?.lastCheckedAt
      ? new Date(email.lastCheckedAt)
      : null;

    if (lastCheckedAtDate) {
      formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "numeric",
      }).format(lastCheckedAtDate);
    }

    function timeAgo(date: Date) {
      const now = new Date();

      // Normalize both dates to midnight (not comparing time)
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const target = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const diff = today.getTime() - target.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) return "Today";
      if (days === 1) return "Yesterday";
      return `${days} days ago`;
    }

    return (
      <motion.div
        key={email.id}
        className="flex items-center justify-between px-1 border-b md:py-1 border-b-zinc-400/80 dark:border-b-zinc-700"
        style={style}
        animate={{ opacity: fadingEmails.has(email.id) ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1 md:gap-3">
              <button
                type="button"
                title="Mark as checked"
                className="md:border-2 border border-[#1A1A1A] dark:border-[#FAFAFA] md:hover:bg-zinc-300 dark:md:hover:bg-zinc-800 transition-colors md:p-1.5 p-1 md:hover:bg rounded-full"
                onClick={() => handleEmailCheck(email.email, email.id)}
              >
                <Check className="w-3 h-3 md:h-5 md:w-5" />
              </button>
              <button
                type="button"
                title="Copy"
                className="md:border-2 border border-[#1A1A1A] dark:border-[#FAFAFA] md:hover:bg-zinc-300 dark:md:hover:bg-zinc-800 transition-colors md:p-1.5 p-1 md:hover:bg rounded-full"
                onClick={() => handleEmailCopy(email.email)}
              >
                <Copy className="w-3 h-3 md:h-5 md:w-5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium md:text-xl">{email.email}</p>
              <span className="flex items-center gap-1 text-xs font-medium md:gap-2 text-zinc-800 dark:text-zinc-400">
                <span className="hidden font-semibold md:block">
                  Last checked:{" "}
                </span>
                {email.lastCheckedAt ? (
                  <div>
                    {lastCheckedAtDate && timeAgo(lastCheckedAtDate)} ⦅
                    {formattedDate}⦆ ●{" "}
                    <span className="font-semibold">
                      {email.lastCheckedBy?.name ?? "Unknown"}
                    </span>
                  </div>
                ) : (
                  "Never"
                )}
              </span>
            </div>
          </div>

          <div className="md:mt-1">
            {email.universities?.map((u) => (
              <span
                key={u.universityShortName}
                onClick={() => handleUniversityClick(u.universityShortName)}
                className={cn(
                  "rounded-[2px] px-1 md:py-0.5 text-xs cursor-pointer dark:text-[#FAFAFA] text-[#1A1A1A] font-bold select-none",
                  selectedUniversity === u.universityShortName &&
                    "bg-green-300 md:hover:bg-green-300/70 dark:bg-green-400 dark:md:hover:bg-green-400/90 transition-colors dark:text-[#1A1A1A]"
                )}
              >
                #{u.universityShortName}
              </span>
            ))}
          </div>
        </div>

        <IndividualMailCheckingHistory
          currentEmailData={{
            email: email.email,
            addedBy: email.addedBy.name,
            createdAt: email.createdAt,
          }}
          mailCheckHistory={
            email.history?.map((h) => ({
              id: h.id,
              checkedAt: new Date(h.checkedAt),
              checkedBy: h.checkedBy
                ? {
                    name: h.checkedBy.name,
                    imageUrl: h.checkedBy.imageUrl,
                  }
                : null,
            })) ?? []
          }
        />
      </motion.div>
    );
  }

  return (
    <div className="h-[60vh] !mt-2 md:!mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-3">
          <span className="text-lg font-semibold">Filtered by:</span>
          {selectedUniversity && (
            <>
              <div className="flex items-baseline gap-2 md:gap-3 w-fit">
                <span className="text-xs font-bold underline">
                  #{selectedUniversity}
                </span>
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="px-2 py-0 bg-green-300 md:hover:bg-green-300/70 dark:bg-green-400 dark:md:hover:bg-green-400/90 transition-colors rounded-[2px] font-medium text-[#1A1A1A]"
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>

        <Link
          href={"/emails/activities"}
          className="[background:linear-gradient(45deg,#4ade80,theme(colors.green.400)_50%,#4ade80)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.green.600/.48)_80%,_theme(colors.rose.600)_86%,_theme(colors.rose.400)_90%,_theme(colors.rose.600)_94%,_theme(colors.green.600/.48))_border-box] rounded-[3px] md:border-[3px] border border-transparent animate-border font-semibold md:px-2 md:py-1 px-1.5 py-0.5 text-[#1A1A1A]"
        >
          Activities
        </Link>
      </div>
      <Separator className="h-[1px] bg-zinc-400 mt-1 mb-2" />

      <List
        rowComponent={RowComponent}
        rowCount={allEmails.length + (isFetchingNextPage ? 1 : 0)}
        rowHeight={75}
        rowProps={{ emails: allEmails, isFetchingNextPage }}
        onRowsRendered={handleRowsRendered}
        overscanCount={5}
        className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-[5px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-400 [&::-webkit-scrollbar-thumb]:bg-stone-600/80"
      />
    </div>
  );
};
