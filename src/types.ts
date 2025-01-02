import { Note } from "@prisma/client";

export type NotesWithUniTypeUser = (Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { bgColor: string };
})[];

export type SingleNotesWithUniTypeUser = Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { bgColor: string };
};
