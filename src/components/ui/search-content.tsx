import { GroupedSearchedNotes } from "@/types";
import { ScrollArea } from "./scroll-area";
import { HeartCrack, Lightbulb } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface SearchContentProps {
  searchedNotes: GroupedSearchedNotes | undefined;
  searchError: Error | null;
  isLoading: boolean;
}

export const SearchContent = ({
  searchedNotes,
  searchError,
  isLoading,
}: SearchContentProps) => {
  const { onOpen } = useModal();

  const hasNotes =
    searchedNotes &&
    Object.values(searchedNotes).some((notes) => notes.length > 0);

  return (
    <ScrollArea className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto bg-gray-800 mt-2 z-40 px-2 md:px-4 py-2 rounded-xl">
      {!isLoading && !hasNotes && !searchError && (
        <div className="min-h-20 flex items-center justify-center gap-2 md:gap-3">
          <p className="text-center text-xl font-semibold text-gray-400">
            No results found
          </p>

          <HeartCrack className="h-5 w-5 text-rose-500" />
        </div>
      )}

      {Object.entries(searchedNotes || {}).map(([type, notes]) => {
        return (
          <div key={type} className="mb-2">
            <h3 className="relative font-semibold md:text-lg text-base flex items-center">
              <span className="w-3 h-[1px] bg-zinc-600 mr-2"></span>
              {type}
              <span className="flex-grow h-[1px] bg-zinc-600 ml-2"></span>
            </h3>
            {notes?.map((note) => (
              <div
                key={note.id}
                className="cursor-pointer hover:bg-gray-900 py-1 md:py-2 hover:rounded-xl truncate min-w-0 w-full text-ellipsis flex items-center justify-between pr-1 md:pr-2"
                onClick={() => onOpen("viewNote", { note: note })}
              >
                <div className="flex items-center gap-1 md:gap-2 px-1 md:px-2">
                  <span>
                    <Lightbulb className="h-4 w-4" />
                  </span>
                  <h4 className="md:text-base text-sm">{note.title}</h4>
                </div>

                <span className="text-xs bg-gray-400 px-2 py-0.5 rounded-xl text-black">
                  {note.university.universityShortName}
                </span>
              </div>
            ))}
          </div>
        );
      })}

      {isLoading && <p>Loading...</p>}

      <div>{searchError?.message}</div>
    </ScrollArea>
  );
};
