"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { NotesWithUniTypeUser } from "@/types";
import Image from "next/image";

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
              <div className="flex items-center gap-2 md:gap-3 capitalize">
                <Image
                  src={imageUrl}
                  alt={note?.university?.universityShortName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h2 className={cn(classNames?.noteTitle)}>{note?.title}</h2>
                  <p className={cn(classNames?.noteDescription)}>{plainText}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
