import { NotesList } from "@/components/notes-list";
import { SearchBar } from "@/components/search";

export default async function Home() {
  return (
    <main className="space-y-3 md:space-y-8">
      <SearchBar />

      <div className="md:max-h-[80vh] max-h-[60vh] bg-[#242424] rounded-xl p-3 md:p-5 overflow-y-auto">
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
