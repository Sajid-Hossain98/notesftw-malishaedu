"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Preview } from "../preview";
import { ScrollArea } from "../ui/scroll-area";
import { School } from "lucide-react";
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
          <div className="h-14 md:h-20 w-14 md:w-20 relative mx-auto">
            <Image
              src={imageUrl}
              fill
              className="object-cover rounded-full"
              alt="University Logo"
            />
          </div>

          <DialogTitle className="text-zinc-200 text-xl sm:text-3xl md:py-2">
            {toTitleCase(note?.title)}
          </DialogTitle>

          <div className="flex items-center gap-2">
            <DialogDescription className="text-zinc-300 sm:text-xl text-base font-semibold flex items-center gap-2">
              <School className="md:w-5 w-4 md:h-5 h-4" />

              {note?.university.universityShortName}
            </DialogDescription>

            <Separator orientation="vertical" className="bg-[#3f3f3f] w-0.5" />

            <DialogDescription className="text-zinc-300 capitalize sm:text-xl text-base font-semibold">
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
      </DialogContent>
    </Dialog>
  );
};
