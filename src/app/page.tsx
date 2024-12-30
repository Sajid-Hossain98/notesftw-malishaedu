import { SearchBar } from "@/components/search";
import { db } from "@/lib/db";

export default async function Home() {
  const notes = await db.note.findMany({
    include: {
      type: true,
    },
  });

  return (
    <main>
      <SearchBar />

      {notes.map((note) => {
        return <div key={note.id}>{note.title}</div>;
      })}
    </main>
  );
}
