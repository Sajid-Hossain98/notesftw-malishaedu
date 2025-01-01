import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NotesListProps {
  classNames?: {
    notesContainer?: string;
    noteTitle?: string;
    noteDescription?: string;
  };
  sliceCount?: number;
  getAll?: boolean;
}

export const NotesList = async ({
  sliceCount = 10,
  getAll = false,
  classNames,
}: NotesListProps) => {
  let notes;

  if (getAll) {
    notes = await db.note.findMany({
      include: {
        university: true,
        type: true,
      },
    });
  } else {
    //total notes count
    const totalNotes = await db.note.count();

    //getting a random offset to skip notes so that random notes can be rendered on each visit
    const randomOffset = Math.max(
      0,
      Math.floor(Math.random() * (totalNotes - sliceCount))
    );

    notes = await db.note.findMany({
      include: {
        university: {
          select: {
            universityShortName: true,
            logoImage: true,
          },
        },
        type: true,
      },
      skip: randomOffset,
      take: sliceCount,
    });
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className={cn(classNames?.notesContainer)}>
      {notes.map((note) => {
        const plainText = stripHtml(note.description);

        //preparing the url of the supabase images
        const imageUrl = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/uni_logo_images/${
          note?.university?.logoImage
        }`;

        return (
          <div
            key={note.id}
            className="bg-[#333333] p-2 space-y-1 min-w-0 cursor-pointer"
            style={{
              borderRadius: "4px",
            }}
          >
            <div className="flex items-center gap-2">
              <Image
                src={imageUrl}
                alt={note.university.universityShortName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h2 className={cn(classNames?.noteTitle)}>{note.title}</h2>
                <p className={cn(classNames?.noteDescription)}>{plainText}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
