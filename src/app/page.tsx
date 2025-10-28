import { NotesList } from "@/components/notes-list";
import { SearchBar } from "@/components/search-bar";

interface GenerateMetadataParams {
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataParams) {
  const searchedKey = searchParams.search;

  return {
    title: searchedKey ? `${searchedKey} | NotesFTW` : "NotesFTW",
  };
}

export default async function Home() {
  return (
    <main className="space-y-3 md:space-y-5">
      <SearchBar />

      <div className="md:max-h-[70dvh] max-h-[65vh] dark:bg-[#303030] bg-[#FAFAFA] rounded-xl p-3 md:p-5 overflow-y-auto md:!mb-12 [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-track]:bg-[#303030] [&::-webkit-scrollbar-track]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:bg-stone-500 shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">
        <NotesList
          getAll={false}
          sliceCount={22}
          classNames={{
            notesContainer: "grid grid-cols-1 sm:grid-cols-2 gap-2",
            noteTitle:
              "text-base md:text-lg font-semibold truncate select-none",
            noteDescription: "truncate text-xs md:text-sm",
          }}
        />
      </div>
    </main>
  );
}
