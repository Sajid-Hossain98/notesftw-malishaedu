import { NotesList } from "@/components/notes-list";
import { SearchBar } from "@/components/search";

export default async function Home() {
  return (
    <main className="space-y-3 md:space-y-8">
      <SearchBar />

      <div className="min-h-[70vh] bg-[#242424] rounded-xl p-3 md:p-5">
        <NotesList
          getAll={false}
          sliceCount={21}
          classNames={{
            notesContainer:
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3",
            noteTitle: "text-xl font-semibold truncate select-none",
            noteDescription: "truncate select-none",
          }}
        />
      </div>
    </main>
  );
}
