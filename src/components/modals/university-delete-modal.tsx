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
import { useRouter } from "next/navigation";

export const UniversityDeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteUniversity";

  const { university } = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      console.log(university?.id, university?.logoImage);

      await axios.delete("/api/admin/universities", {
        data: {
          universityId: university?.id,
          logoImage: university?.logoImage,
        },
      });

      toast.success(`Deleted "${university?.universityFullName}" successfully`);
      router.refresh();
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
      <DialogContent className="bg-[#242424] border-zinc-700 !rounded-xl md:min-w-[30%] w-11/12 p-3 md:p-6">
        <DialogHeader className="pt-4">
          <DialogTitle className="text-lg text-zinc-300 sm:text-3xl">
            Delete university
          </DialogTitle>
          <Separator className="h-[0.5px] w-full bg-zinc-500" />
          <DialogDescription className="">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-cyan-300">
              {university?.universityFullName}
            </span>{" "}
            will be deleted permanently along with{" "}
            <span className="font-semibold text-rose-400">all the notes</span>{" "}
            related to{" "}
            <span className="font-semibold text-cyan-300">
              {university?.universityFullName}.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-0">
          <div className="flex items-center justify-start gap-2">
            <Button
              disabled={isLoading}
              onClick={onClose}
              className="px-2 py-0 text-cyan-300 hover:bg-cyan-300/70 hover:text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              className="px-2 py-0 text-rose-400 hover:bg-rose-400/70 hover:text-black"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
