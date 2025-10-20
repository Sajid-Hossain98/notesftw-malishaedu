import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

export const AddRule = () => {
  const { onOpen } = useModal();

  return (
    <button
      className="border-2 border-zinc-600 text-zinc-600"
      onClick={() => onOpen("addRule")}
    >
      <Plus className="w-32 h-20" />
    </button>
  );
};
