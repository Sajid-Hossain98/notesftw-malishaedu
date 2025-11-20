import { useModal } from "@/hooks/use-modal-store";
import { History } from "lucide-react";

interface IndividualMailCheckingHistoryProps {
  mailCheckHistory: {
    id: string;
    checkedAt: Date;
    checkedBy: {
      name: string;
      imageUrl: string;
    } | null;
  }[];
  currentEmailData: {
    email: string;
    addedBy: string;
    createdAt: Date;
  };
}

export const IndividualMailCheckingHistory = ({
  mailCheckHistory,
  currentEmailData,
}: IndividualMailCheckingHistoryProps) => {
  const { onOpen } = useModal();

  return (
    <button
      className="md:border-2 border border-[#1A1A1A] dark:border-[#FAFAFA] md:hover:bg-zinc-300 dark:md:hover:bg-zinc-800 transition-colors md:p-1.5 p-1 md:hover:bg rounded-full"
      onClick={() =>
        onOpen("viewMailHistory", {
          mailHistoryData: [
            { mailHistory: mailCheckHistory, currentEmailData },
          ],
        })
      }
    >
      <History className="w-3 h-3 md:h-5 md:w-5" />
    </button>
  );
};
