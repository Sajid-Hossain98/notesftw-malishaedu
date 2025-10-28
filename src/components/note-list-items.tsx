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

  const htmlToPlainText = (html: string | undefined) => {
    if (!html) return "";

    let text = html;

    // Replace &nbsp; and other entities
    text = text.replace(/&nbsp;/gi, " ");
    text = text.replace(/&amp;/gi, "&");
    text = text.replace(/&lt;/gi, "<");
    text = text.replace(/&gt;/gi, ">");
    text = text.replace(/&quot;/gi, '"');
    text = text.replace(/&#39;/gi, "'");

    // Handle line breaks and paragraphs
    text = text.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/p>/gi, "\n");
    text = text.replace(/<p[^>]*>/gi, "");

    // Handle lists
    // Ordered lists
    // let olCounter = 0;
    // text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, inner) => {
    //   olCounter = 0;
    //   return inner.replace(/<li[^>]*>(.*?)<\/li>/gi, (_m, liContent) => {
    //     olCounter++;
    //     return `${olCounter}. ${liContent}\n`;
    //   });
    // });

    // Unordered lists
    // text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, inner) => {
    //   return inner.replace(/<li[^>]*>(.*?)<\/li>/gi, (_m, liContent) => {
    //     return `- ${liContent}\n`;
    //   });
    // });

    // Remove all remaining HTML tags
    text = text.replace(/<[^>]+>/g, "");

    // Collapse multiple spaces & trim
    text = text.replace(/\s+/g, " ").trim();

    // Optionally, replace multiple newlines with single newline
    text = text.replace(/\n\s*\n/g, "\n");

    return text;
  };

  return (
    <>
      <div className={cn(classNames?.notesContainer)}>
        {notes?.map((note) => {
          const plainText = htmlToPlainText(note?.description);

          //preparing the url of the supabase images
          const imageUrl = `${process.env
            .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
            note?.university?.logoImage
          }`;

          return (
            <div
              key={note?.id}
              onClick={() => onOpen("viewNote", { note: note })}
              className={`${note?.type?.bgColor} p-1 md:p-2 space-y-1 min-w-0 cursor-pointer dark:bg-opacity-5 bg-opacity-10 relative overflow-hidden dark:md:hover:bg-opacity-10 md:hover:bg-opacity-15 active:bg-opacity-10`}
              style={{
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-2 capitalize md:gap-4">
                <Image
                  src={imageUrl}
                  alt={note?.university?.universityShortName}
                  className="dark:rounded-full h-12 md:h-16 w-12 md:w-16 object-cover select-none dark:bg-zinc-100 p-[1.5px]"
                  width={80}
                  height={80}
                />
                <div className="flex-1 min-w-0 select-none">
                  <h2 className={cn(classNames?.noteTitle)}>{note?.title}</h2>
                  <p className={cn(classNames?.noteDescription)}>{plainText}</p>

                  <Badge
                    className={`${note?.type?.bgColor} absolute right-0 bottom-0 rounded-bl-none rounded-br-none rounded-tr-none bg-opacity-60`}
                    style={{ color: note?.type?.color }}
                  >
                    {note?.type?.name}
                  </Badge>

                  <p className="flex items-start gap-1 text-xs font-semibold dark:text-zinc-300 sm:text-sm">
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
