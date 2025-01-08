import { GroupedSearchedNotes } from "@/types";
import { ScrollArea } from "./scroll-area";
import { Lightbulb } from "lucide-react";

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
  return (
    <ScrollArea className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto">
      {Object.entries(searchedNotes || {}).map(([type, notes]) => {
        return (
          <div key={type} className="mb-2">
            <h3 className="relative font-semibold md:text-lg text-base flex items-center">
              <span className="w-3 h-[1px] bg-zinc-600 mr-2"></span>
              {type}
              <span className="flex-grow h-[1px] bg-zinc-600 ml-2"></span>
            </h3>
            {notes.map((note) => (
              <div
                key={note.id}
                className="cursor-pointer hover:bg-gray-900 px-3 py-1 md:py-2 hover:rounded-xl flex items-center gap-2 truncate min-w-0 text-ellipsis"
              >
                <span>
                  <Lightbulb className="h-4 w-4" />
                </span>
                <h4 className="md:text-base text-sm">{note.title}</h4>
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
