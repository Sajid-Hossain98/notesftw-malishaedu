import { GroupedSearchedNotes } from "@/types";
import { ScrollArea } from "./scroll-area";

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
    <ScrollArea>
      {Object.entries(searchedNotes || {}).map(([type, notes]) => {
        return (
          <div key={type}>
            <h3 className="bg-rose-700">{type}</h3>
            {notes.map((note) => (
              <p key={note.id}>{note.title}</p>
            ))}
          </div>
        );
      })}

      {isLoading && <p>Loading...</p>}

      <div>{searchError?.message}</div>
    </ScrollArea>
  );
};
