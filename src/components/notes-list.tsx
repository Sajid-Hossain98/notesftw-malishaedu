import { db } from "@/lib/db";
import { NoteListItems } from "./note-list-items";

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
      where: {
        approval: "APPROVED",
      },
      include: {
        university: true,
        type: true,
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: true,
          },
        },
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
      where: {
        approval: "APPROVED",
      },
      include: {
        university: {
          select: {
            universityFullName: true,
            universityShortName: true,
            logoImage: true,
          },
        },
        type: true,
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: true,
          },
        },
      },
      skip: randomOffset,
      take: sliceCount,
    });
  }

  return <NoteListItems notes={notes} classNames={classNames} />;
};
