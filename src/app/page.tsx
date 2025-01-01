import { NotesList } from "@/components/notes-list";
import { SearchBar } from "@/components/search";

export default async function Home() {
  return (
    <main className="space-y-3 md:space-y-8">
      <SearchBar />

      <div className="min-h-[70vh] bg-[#242424] rounded-xl p-3 md:p-5">
        <NotesList
          getAll={false}
          classNames={{
            notesContainer:
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2",
            noteTitle: "text-xl font-semibold truncate",
            noteDescription: "truncate",
          }}
        />
      </div>
    </main>
  );
}
