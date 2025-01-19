"use client";

import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { NotesWithUniTypeUser } from "@/types";
import { Edit3, HeartCrack, School } from "lucide-react";

interface AdminAllNoteItemsProps {
  notes: NotesWithUniTypeUser | undefined;
}

export const AdminAllNoteItems = ({ notes }: AdminAllNoteItemsProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col gap-1 md:gap-2 md:max-h-[65vh] max-h-[45vh] overflow-y-auto overflow-x-hidden mt-2 md:mt-3 bg-[#242424] px-2 md:px-3 py-1 md:py-2 rounded-xl [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#242424] [&::-webkit-scrollbar-thumb]:bg-gray-500">
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
              className="flex items-center justify-between gap-1 md:gap-2 pl-1 rounded-xl transition-colors"
            >
              <div
                className="min-w-0 cursor-pointer md:hover:bg-[#3a3939] active:bg-[#3a3939] w-full px-1 md:px-2 py-1 hover:rounded-[4px]"
                onClick={() => onOpen("viewNote", { note })}
              >
                <h2 className="text-base font-semibold truncate md:text-lg">
                  {note?.title}
                </h2>

                <div className="flex items-center my-0.5 md:my-1">
                  <span className="flex items-center gap-1 text-xs">
                    <School className="w-3 h-3 md:h-4 md:w-4" />
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
                  {note?.user?.name}
                </div>

                <span className="text-xs">Last updated: {formattedDate}</span>
              </div>
              <button className="md:hover:bg-black active:bg-black cursor-pointer px-3 py-3 rounded-full">
                <Edit3 className="w-4 h-4 md:h-5 md:w-5" />
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
