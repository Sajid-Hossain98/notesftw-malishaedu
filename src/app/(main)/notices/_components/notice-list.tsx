"use client";

import { Notices, UserData } from "@/types";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronsLeftRight,
  ChevronsLeftRightEllipsis,
  Edit2,
  Trash,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

interface NoticeListProps {
  notices: Notices[];
  userData: UserData | null;
}

export const NoticeList = ({ notices, userData }: NoticeListProps) => {
  const admin = userData?.role === "ADMIN";

  const { onOpen } = useModal();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="overflow-y-auto max-h-[65%] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-400/80"
    >
      <Button
        className="bg-cyan-300 px-3 py-2 dark:text-black hover:bg-cyan-400 font-semibold rounded-[5px] mb-2"
        asChild
      >
        <Link href="/admin/manage-notices">Add notice</Link>
      </Button>

      {notices.map((notice) => {
        let formattedDate;

        const updatedDate = notice?.updatedAt
          ? new Date(notice.updatedAt)
          : null;

        if (updatedDate) {
          formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(updatedDate);
        }

        return (
          <motion.div
            layout
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 14,
                  mass: 1,
                },
              },
            }}
            key={notice.id}
            className="mb-1.5 md:mb-3 text-justify flex items-start gap-2 md:pl-6 pl-2"
          >
            <span>
              {notice.description ? (
                <ChevronsLeftRightEllipsis />
              ) : (
                <ChevronsLeftRight />
              )}
            </span>
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href={`/notices/${notice.id}`}
                className="text-base font-semibold md:text-xl -tracking-tight"
              >
                {notice.title}{" "}
                <span className="text-xs dark:text-zinc-400/80 text-zinc-500">
                  [Last Updated on {formattedDate}]
                </span>
              </Link>

              {admin && (
                <div className="flex items-start gap-1 mr-1">
                  <button
                    className="px-2 py-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black"
                    onClick={() => onOpen("editNotice", { notice: notice })}
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>

                  <button className="px-2 py-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black">
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
