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
import { Preview } from "../preview";
import { ScrollArea } from "../ui/scroll-area";
import { School } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export const NotesViewModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "viewNote";

  const { note } = data;

  // const toTitleCase = (title: string | undefined) => {
  //   return title?.replace(
  //     /\w\S*/g,
  //     (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  //   );
  // };

  //preparing the url of the supabase images
  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
    note?.university?.logoImage
  }`;

  let formattedDate = null;

  const updatedDate = note?.updatedAt ? new Date(note.updatedAt) : null;

  if (updatedDate) {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(updatedDate);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#303030] border-zinc-700 !rounded-xl md:min-w-[60%] w-11/12 p-3 md:p-6 overflow-hidden">
        <DialogHeader className="text-start">
          <div>
            <div className="flex items-center justify-start gap-2 mt-3 md:gap-4">
              <Image
                src={imageUrl}
                className="rounded-full h-14 md:h-20 w-14 md:w-20 object-cover select-none bg-zinc-100 p-[1.5px]"
                alt="University Logo"
                height={100}
                width={100}
              />

              <div>
                <DialogTitle className="text-lg text-zinc-300 sm:text-3xl md:pb-2">
                  {note?.title}
                </DialogTitle>

                <div className="flex items-center gap-2">
                  <DialogDescription className="flex items-center gap-1 text-sm font-semibold sm:gap-2 text-zinc-300 sm:text-xl">
                    <School className="w-3.5 h-3.5 md:w-5 md:h-5" />

                    {note?.university?.universityShortName}
                  </DialogDescription>
                  -
                  <DialogDescription className="text-sm font-semibold capitalize text-zinc-300 sm:text-xl line-clamp-1">
                    {note?.university?.universityFullName}
                  </DialogDescription>
                </div>

                <p className="text-xs">Last updated: {formattedDate}</p>
              </div>
            </div>
            <Badge
              className={`${note?.type?.bgColor} max-w-fit absolute top-0 left-0 rounded-bl-none rounded-tr-none rounded-tl-none rounded-br-xl`}
              style={{ color: note?.type?.color }}
            >
              {note?.type?.name}
            </Badge>
          </div>

          <Separator className="bg-zinc-600" />

          <ScrollArea className="md:max-h-[60vh] max-h-[45vh] py-2 md:py-3">
            <Preview
              value={note?.description}
              className="text-base md:text-lg"
            />
          </ScrollArea>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            asChild
            className="transition-colors md:hover:bg-black active:bg-black"
          >
            <span className="flex items-center justify-center w-full gap-0.5 py-0.5 md:py-1 border-2 cursor-pointer border-zinc-700 font-semibold text-sm md:text-lg">
              Thanks
              <Image
                src="/static/hand-white.svg"
                alt="hand-heart"
                className="w-5 h-5 sm:h-8 sm:w-8"
                height={300}
                width={300}
              />
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
