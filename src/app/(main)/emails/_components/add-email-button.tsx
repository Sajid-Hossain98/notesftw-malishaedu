"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

interface AddEmailButtonProps {
  universityShortNames?: { universityShortName: string }[];
}

export const AddEmailButton = ({
  universityShortNames,
}: AddEmailButtonProps) => {
  const { onOpen } = useModal();

  return (
    <button
      className="border-2 cursor-pointer border-zinc-600 dark:border-zinc-400 text-zinc-600 dark:text-zinc-400 md:absolute md:left-0 md:top-2"
      onClick={() =>
        onOpen("addEmail", { universityShortNames: universityShortNames })
      }
      title="Add an email"
    >
      <Plus className="w-14 md:w-24 h-6 md:h-8" />
    </button>
  );
};
