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
import { HandHeart, School } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";

export const NotesViewModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "viewNote";

  const { note } = data;

  const toTitleCase = (title: string | undefined) => {
    return title?.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  };

  //preparing the url of the supabase images
  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
    note?.university?.logoImage
  }`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#242424] border-zinc-700 !rounded-xl md:min-w-[60%] w-11/12 p-3 md:p-6">
        <DialogHeader className="text-start">
          <div className="relative mx-auto h-14 md:h-20 w-14 md:w-20">
            <Image
              src={imageUrl}
              fill
              className="object-cover rounded-full"
              alt="University Logo"
            />
          </div>

          <DialogTitle className="text-xl text-zinc-200 sm:text-3xl md:py-2">
            {toTitleCase(note?.title)}
          </DialogTitle>

          <div className="flex items-center gap-2">
            <DialogDescription className="flex items-center gap-2 text-base font-semibold text-zinc-300 sm:text-xl">
              <School className="w-4 h-4 md:w-5 md:h-5" />

              {note?.university.universityShortName}
            </DialogDescription>

            <Separator orientation="vertical" className="bg-[#3f3f3f] w-0.5" />

            <DialogDescription className="text-base font-semibold capitalize text-zinc-300 sm:text-xl">
              {note?.university.universityFullName}
            </DialogDescription>
          </div>

          <Separator className="bg-[#3f3f3f]" />

          <ScrollArea className="md:max-h-[70vh] max-h-[55vh] py-2">
            <Preview
              value={note?.description}
              className="text-base md:text-lg"
            />
          </ScrollArea>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <span className="flex items-center justify-center w-full gap-2 px-3 py-2 border-2 cursor-pointer border-zinc-700 font-semibold text-base md:text-lg">
              Thanks
              <HandHeart />
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
