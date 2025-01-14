import { GroupedSearchedNotes } from "@/types";
import { HeartCrack, Lightbulb } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Skeleton } from "./skeleton";

interface SearchContentProps {
  searchedNotes: GroupedSearchedNotes | undefined;
  searchError: Error | null;
  isLoading: boolean;
  debouncedSearchWords: string;
}

export const SearchContent = ({
  searchedNotes,
  searchError,
  isLoading,
  debouncedSearchWords,
}: SearchContentProps) => {
  const { onOpen } = useModal();

  const hasNotes =
    searchedNotes &&
    Object.values(searchedNotes).some((notes) => notes.length > 0);

  return (
    <div className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto bg-gray-800 mt-2 px-2 md:px-4 py-2 rounded-xl">
      {!isLoading && !hasNotes && !searchError && (
        <div className="flex items-center justify-center gap-2 min-h-20 md:gap-3">
          <p className="text-xl font-semibold text-center text-gray-400">
            No results found for{" "}
            <span className="bg-slate-700 px-1 rounded-[3px] py-0.5 md:px-2">
              &apos;{debouncedSearchWords}&apos;
            </span>
          </p>

          <HeartCrack className="w-5 h-5 text-rose-500" />
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="mb-2">
              {/* Header Skeleton */}
              <div className="relative font-semibold md:text-lg text-base flex items-center md:mb-1 mb-0.5">
                <span className="w-3 h-[1px] bg-zinc-600 mr-2"></span>
                <Skeleton className="w-24 h-6 rounded-full bg-zinc-500" />
                <span className="flex-grow h-[1px] bg-zinc-600 ml-2"></span>
              </div>

              {/* Notes Skeleton */}
              {Array.from({ length: 2 }).map((_, noteIdx) => (
                <div
                  key={noteIdx}
                  className="flex items-center justify-between w-full min-w-0 py-1 pr-1 truncate hover:rounded-xl md:py-2"
                >
                  <div className="flex items-center gap-1 px-1 md:gap-2 md:px-2">
                    <Skeleton className="w-5 h-5 rounded-full bg-zinc-500 flex-shrink" />
                    <Skeleton
                      style={{ borderRadius: "4px" }}
                      className="w-36 sm:w-72 md:w-[500px] lg:w-[900px] h-5 bg-zinc-500"
                    />
                  </div>

                  <Skeleton className="w-16 h-5 rounded-xl bg-zinc-500" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {Object.entries(searchedNotes || {}).map(([type, notes]) => {
        const typeBgColor = notes?.[0]?.type?.bgColor || "bg-gray-600";
        const typeTextColor = notes?.[0]?.type?.color || "text-black";

        return (
          <div key={type} className="mb-2 group">
            <div className="relative font-semibold md:text-lg text-base flex items-center md:mb-1 mb-0.5">
              <span className="w-3 h-[1px] bg-zinc-600 mr-2"></span>
              <h3
                className={`${typeBgColor} px-2 py-0.5 rounded-full bg-opacity-60 md:group-hover:bg-opacity-100 transition-colors group-active:bg-opacity-100`}
                style={{ color: typeTextColor }}
              >
                {type}
              </h3>
              <span className="flex-grow h-[1px] bg-zinc-600 ml-2"></span>
            </div>
            {notes?.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between w-full min-w-0 py-1 pr-1 truncate cursor-pointer md:hover:bg-gray-900 active:bg-gray-900 md:py-2 hover:rounded-xl text-ellipsis md:pr-2"
                onClick={() => onOpen("viewNote", { note: note })}
              >
                <div className="flex items-center gap-1 px-1 md:gap-2 md:px-2">
                  <span>
                    <Lightbulb className="w-4 h-4 text-cyan-600" />
                  </span>
                  <h4 className="text-sm md:text-base font-semibold">
                    {note.title}
                  </h4>
                </div>

                <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-xl font-semibold">
                  {note.university.universityShortName}
                </span>
              </div>
            ))}
          </div>
        );
      })}

      <div>{searchError?.message}</div>
    </div>
  );
};
