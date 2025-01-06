import { NotesList } from "@/components/notes-list";
import { SearchBar } from "@/components/search";

export default async function Home() {
  return (
    <main className="space-y-3 md:space-y-8">
      <SearchBar />

      <div className="md:max-h-[70dvh] max-h-[65vh] bg-[#242424] rounded-xl p-3 md:p-5 overflow-y-auto md:!mb-12 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#242424] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500">
        <NotesList
          getAll={false}
          sliceCount={21}
          classNames={{
            notesContainer: "grid grid-cols-1 sm:grid-cols-2 sm:gap-3 gap-2",
            noteTitle:
              "text-base md:text-xl font-semibold truncate select-none",
            noteDescription: "truncate select-none text-sm md:text-base",
          }}
        />
      </div>
    </main>
  );
}
