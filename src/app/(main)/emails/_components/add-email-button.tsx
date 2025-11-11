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
      className="border-2 cursor-pointer border-zinc-600 text-zinc-600"
      onClick={() =>
        onOpen("addEmail", { universityShortNames: universityShortNames })
      }
      title="Add an email"
    >
      <Plus className="w-32 h-20" />
    </button>
  );
};
