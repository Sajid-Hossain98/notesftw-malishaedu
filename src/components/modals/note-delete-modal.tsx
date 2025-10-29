import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export const NoteDeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteNote";

  const { note } = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const noteToDelete = note?.id;

      await axios.delete("api/admin/notes", {
        data: { noteId: noteToDelete },
      });

      toast.success(`Deleted "${note?.title}" successfully`);
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-xl md:min-w-[30%] w-11/12 p-3 md:p-6">
        <DialogHeader className="pt-4">
          <DialogTitle className="text-lg dark:text-zinc-300 sm:text-3xl">
            Delete Note
          </DialogTitle>
          <Separator className="h-[0.5px] w-full bg-zinc-500" />
          <DialogDescription className="">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold dark:text-cyan-300 text-cyan-600">
              {note?.title} of {note?.university.universityShortName}
            </span>{" "}
            will be deleted permanently!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-0">
          <div className="flex items-center justify-start gap-2">
            <Button
              disabled={isLoading}
              onClick={onClose}
              className="px-2 py-0 dark:text-cyan-300 text-cyan-600 md:hover:bg-cyan-300/70 hover:text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              className="px-2 py-0 dark:text-rose-400 text-rose-600 hover:bg-rose-400/70 hover:text-black"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
