import { Note, NoticeStatus, Type, University, UserRole } from "@prisma/client";

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
    user: { id: string; name: string; imageUrl: string; role: string };
  })[]; // Array of notes for each note type (Assessment, Submit, Offer, etc.)
};

export type Universities = {
  id: string;
  universityFullName: string;
  universityShortName: string;
  logoImage: string;
}[];

export interface UserData {
  name: string;
  id: string;
  role: UserRole;
  clerkUserId: string;
  imageUrl: string;
  email: string;
  canViewProtected: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeOfConduct {
  id: string;
  rule: string;
  isProtected: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notices {
  id: string;
  title: string;
  description: string | null;
  expiresOn: Date | null;
  status: NoticeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MailHistory {
  id: string;
  checkedAt: Date;
  checkedBy: {
    name: string;
    imageUrl: string;
  } | null;
}
