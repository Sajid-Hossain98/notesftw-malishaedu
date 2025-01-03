import { Note } from "@prisma/client";

export type NotesWithUniTypeUser = (Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { name: string; bgColor: string; color: string };
})[];

export type SingleNotesWithUniTypeUser = Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { name: string; bgColor: string; color: string };
};
