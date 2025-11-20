"use client";

import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

interface AddEmailButtonProps {
  universityShortNames?: { universityShortName: string }[];
}

export const AddEmailButton = ({
  universityShortNames,
}: AddEmailButtonProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center gap-2 md:absolute md:left-0 md:top-2">
      <button
        className="border-2 cursor-pointer border-zinc-600 dark:border-zinc-400 text-zinc-600 dark:text-zinc-400 px-1 py-1 font-semibold rounded-[5px]"
        onClick={() =>
          onOpen("addEmail", { universityShortNames: universityShortNames })
        }
        title="Add an email"
      >
        Add email
      </button>

      <Link
        href="/emails/all"
        className="border-2 cursor-pointer border-zinc-600 dark:border-zinc-400 text-zinc-600 dark:text-zinc-400 px-1 py-1 font-semibold rounded-[5px]"
      >
        All Emails
      </Link>
    </div>
  );
};
