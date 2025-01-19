import { Note, Type, University, UserRole } from "@prisma/client";

export type NotesWithUniTypeUser = (Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { name: string; bgColor: string; color: string };
  user: { id: string; name: string; imageUrl: string; role: string };
})[];

export type SingleNotesWithUniTypeUser = Note & {
  university: {
    universityFullName: string;
    universityShortName: string;
    logoImage: string;
  };
  type: { name: string; bgColor: string; color: string };
  user: { id: string; name: string; imageUrl: string; role: string };
};

export type GroupedSearchedNotes = {
  [key: string]: (Note & {
    university: University;
    type: Type;
  })[]; // Array of notes for each note type (Assessment, Submit, Offer, etc.)
};

export interface UserData {
  name: string;
  id: string;
  role: UserRole;
  clerkUserId: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
