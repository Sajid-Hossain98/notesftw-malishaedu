"use client";

import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { NotesWithUniTypeUser } from "@/types";
import { Edit3, HeartCrack, School, Trash } from "lucide-react";

interface AdminAllNoteItemsProps {
  notes: NotesWithUniTypeUser | undefined;
  universityShortNames?: { universityShortName: string }[];
  noteTypes?: { name: string }[];
}

export const AdminAllNoteItems = ({
  notes,
  universityShortNames,
  noteTypes,
}: AdminAllNoteItemsProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col gap-1 md:gap-2 md:max-h-[65vh] max-h-[45vh] overflow-y-auto overflow-x-hidden mt-2 md:mt-3 dark:bg-[#303030] bg-[#FAFAFA] px-2 md:px-3 py-1 md:py-2 rounded-xl [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-track]:bg-[#303030] [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:bg-stone-500 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500">
      {notes && notes?.length > 0 ? (
        notes?.map((note) => {
          let formattedDate = null;
          const updatedDate = note?.updatedAt ? new Date(note.updatedAt) : null;

          if (updatedDate) {
            formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(updatedDate);
          }
          return (
            <div
              key={note.id}
              className="flex items-center justify-between gap-1 pl-1 transition-colors md:gap-2 rounded-xl"
            >
              <div
                className="min-w-0 cursor-pointer dark:md:hover:bg-[#3a3939] md:hover:bg-zinc-200/80 dark:active:bg-[#3a3939] active:bg-zinc-200/80 w-full px-1 md:px-2 py-1 hover:rounded-[4px]"
                onClick={() => onOpen("viewNote", { note })}
              >
                <h2 className="text-base font-semibold truncate md:text-lg">
                  {note?.title}
                </h2>

                <div className="flex items-center my-0.5 md:my-1">
                  <span className="flex items-baseline gap-0.5 text-xs">
                    <School className="w-2 h-2 md:h-3 md:w-3" />
                    {note?.university?.universityShortName}
                  </span>

                  <Separator
                    orientation="vertical"
                    className="h-4 w-[0.5px] bg-zinc-500 mx-2"
                  />

                  <span
                    className={`${note?.type?.bgColor} text-xs rounded-full px-1 md:px-2 md:py-1 bg-opacity-90`}
                    style={{ color: note?.type?.color }}
                  >
                    {note?.type?.name}
                  </span>
                </div>

                <p className="text-xs">Last updated: {formattedDate}</p>
                <p className="text-xs">Created by: {note?.user?.name}</p>
                {note?.approvedById}
              </div>
              <button
                className="px-3 py-3 rounded-full cursor-pointer dark:md:hover:bg-black md:hover:bg-zinc-200/80 dark:active:bg-black active:bg-zinc-200/80"
                onClick={() =>
                  onOpen("editNote", { note, universityShortNames, noteTypes })
                }
                title={`Edit - "${note?.title}"`}
              >
                <Edit3 className="w-4 h-4 md:h-5 md:w-5" />
              </button>
              <button
                className="px-3 py-3 rounded-full cursor-pointer dark:md:hover:bg-black md:hover:bg-zinc-200/80 dark:active:bg-black active:bg-zinc-200/80"
                onClick={() => onOpen("deleteNote", { note })}
                title="Delete"
              >
                <Trash className="w-4 h-4 md:h-5 md:w-5" />
              </button>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center gap-2 min-h-20 md:gap-3">
          <p className="text-xl font-semibold text-center text-gray-400">
            No results found
          </p>

          <HeartCrack className="w-5 h-5 text-rose-500" />
        </div>
      )}
    </div>
  );
};
