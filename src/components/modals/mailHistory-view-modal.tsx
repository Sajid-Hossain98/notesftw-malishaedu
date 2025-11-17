"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import { Frown, MailCheck } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";

export const MailHistoryViewModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "viewMailHistory";

  const { mailHistoryData } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-[10px] md:min-w-[60%] w-11/12 overflow-hidden p-3 md:p-6">
        <DialogHeader className="text-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <DialogTitle className="flex items-center gap-1 text-lg md:items-baseline md:gap-2 dark:text-zinc-300 sm:text-3xl">
              <MailCheck className="w-4 h-4 md:w-6 md:h-6" />
              Mail Check History
            </DialogTitle>

            <DialogDescription className="flex items-center gap-1 font-semibold sm:gap-2 dark:text-zinc-300">
              Records for the past 30 days only
            </DialogDescription>
          </div>

          <Separator className="dark:bg-zinc-600 bg-zinc-400/70" />

          {mailHistoryData?.map((allMailHistory, index) => {
            let formattedCreatedDate = null;

            const createAtdate = allMailHistory?.currentEmailData?.createdAt
              ? new Date(allMailHistory.currentEmailData.createdAt)
              : null;

            if (createAtdate) {
              formattedCreatedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "numeric",
              }).format(createAtdate);
            }

            return (
              <div
                key={index}
                className="flex flex-col items-start gap-1 md:items-end md:flex-row md:gap-2"
              >
                <span className="text-xs font-medium md:text-sm">
                  ⦿ Records for
                </span>
                <div className="flex md:items-end flex-col md:flex-row gap-1 md:gap-2">
                  <h3 className="text-sm font-semibold underline md:text-lg underline-offset-2">
                    {allMailHistory?.currentEmailData?.email}
                  </h3>

                  <p className="text-xs">
                    ⦅{allMailHistory?.currentEmailData?.addedBy} added on{" "}
                    {formattedCreatedDate}⦆
                  </p>
                </div>
              </div>
            );
          })}

          <ScrollArea className="md:max-h-[60vh] max-h-[45vh]">
            {mailHistoryData &&
              mailHistoryData.map((allMailHistory, index) =>
                allMailHistory.mailHistory &&
                allMailHistory.mailHistory.length > 0 ? (
                  allMailHistory.mailHistory.map((history, index) => {
                    let formattedDate = null;

                    const checkedAtDate = history?.checkedAt
                      ? new Date(history?.checkedAt)
                      : null;

                    if (checkedAtDate) {
                      formattedDate = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "numeric",
                      }).format(checkedAtDate);
                    }

                    function timeAgo(date: Date) {
                      const now = new Date();

                      // Normalize both dates to midnight (not comparing time)
                      const today = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate()
                      );
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

                    const isLast =
                      index === allMailHistory.mailHistory.length - 1;

                    return (
                      <div
                        key={history.id}
                        className="relative flex items-start gap-2 my-1 md:my-3"
                      >
                        <div className="relative flex flex-col items-center mt-0.5">
                          <Image
                            src={
                              history.checkedBy?.imageUrl ??
                              "/malishaedu-logo.png"
                            }
                            alt="user"
                            height={50}
                            width={50}
                            quality={80}
                            className="object-cover w-4 h-4 rounded-full select-none md:h-6 md:w-6"
                          />

                          {!isLast && (
                            <div className="absolute md:top-[26px] top-[18px] left-1/2 -translate-x-1/2 w-[0.5px] md:h-[24px] h-[16px] bg-zinc-400 dark:bg-zinc-500/80" />
                          )}
                        </div>

                        <div className="flex flex-col text-xs md:text-sm">
                          <p className="font-medium">
                            {history.checkedBy?.name}
                          </p>
                          <p className="text-zinc-700 dark:text-zinc-400">
                            {formattedDate} •{" "}
                            {checkedAtDate && timeAgo(checkedAtDate)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    key={index}
                    className="flex items-center gap-1 py-2 text-base font-medium md:gap-2 md:text-2xl text-rose-500 dark:text-rose-400 md:py-3 animate-pulse"
                  >
                    Not checked by anyone so far{" "}
                    <Frown className="w-4 h-4 md:w-6 md:h-6 " />
                  </div>
                )
              )}
          </ScrollArea>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            asChild
            className="transition-colors dark:md:hover:bg-black dark:active:bg-black hover:bg-zinc-200/80 active:bg-zinc-200/80"
          >
            <span className="text-center w-full py-0.5 md:py-1 border-2 cursor-pointer dark:border-zinc-700 border-zinc-400/70 font-semibold text-sm md:text-lg !pt-0">
              ok
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
