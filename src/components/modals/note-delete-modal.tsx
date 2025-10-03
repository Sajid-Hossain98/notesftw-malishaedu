import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const NoteDeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteNote";

  const { note } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#242424] border-zinc-700 !rounded-xl md:min-w-[30%] w-11/12 p-3 md:p-6">
        <DialogHeader className="pt-4">
          <DialogTitle className="text-lg text-zinc-300 sm:text-3xl">
            Delete Note
          </DialogTitle>
          <Separator className="h-[0.5px] w-full bg-zinc-500" />
          <DialogDescription className="">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-cyan-300">
              {note?.title}
            </span>{" "}
            will be deleted permanently!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-0">
          <div className="flex items-center justify-start gap-2">
            <Button
              onClick={onClose}
              className="px-2 py-0 text-cyan-300 hover:bg-cyan-300/80 hover:text-black"
            >
              Cancel
            </Button>
            <Button className="px-2 py-0 text-rose-400 hover:bg-rose-400/80 hover:text-black">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
