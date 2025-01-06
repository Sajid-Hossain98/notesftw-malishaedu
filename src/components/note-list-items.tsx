"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { NotesWithUniTypeUser } from "@/types";
import { School } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface NoteListItemsProps {
  notes: NotesWithUniTypeUser;
  classNames?: {
    notesContainer?: string;
    noteTitle?: string;
    noteDescription?: string;
  };
}

export const NoteListItems = ({ notes, classNames }: NoteListItemsProps) => {
  const { onOpen } = useModal();

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <>
      <div className={cn(classNames?.notesContainer)}>
        {notes?.map((note) => {
          const plainText = stripHtml(note?.description);

          //preparing the url of the supabase images
          const imageUrl = `${process.env
            .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
            note?.university?.logoImage
          }`;

          return (
            <div
              key={note?.id}
              onClick={() => onOpen("viewNote", { note: note })}
              className="bg-[#333333] p-2 md:p-3 space-y-1 min-w-0 cursor-pointer"
              style={{
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-2 md:gap-4 capitalize">
                <Image
                  src={imageUrl}
                  alt={note?.university?.universityShortName}
                  className="rounded-full filter brightness-200 contrast-100 h-14 md:h-20 w-14 md:w-20 object-cover select-none"
                  width={70}
                  height={70}
                />
                <div className="flex-1 min-w-0 select-none">
                  <h2 className={cn(classNames?.noteTitle)}>{note?.title}</h2>
                  <p className={cn(classNames?.noteDescription)}>{plainText}</p>

                  <Badge
                    className={`${note?.type?.bgColor} max-w-fit mb-1 md:mb-2`}
                    style={{ color: note?.type?.color }}
                  >
                    {note?.type?.name}
                  </Badge>

                  <p className="flex items-start gap-1 text-xs font-semibold text-zinc-300 sm:text-sm">
                    <School className="w-3.5 h-3.5 md:w-4 md:h-4" />

                    {note?.university.universityShortName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
