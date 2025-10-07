import { SingleNotesWithUniTypeUser } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "viewNote"
  | "editNote"
  | "deleteNote"
  | "editUniversity";

interface ModalData {
  note?: SingleNotesWithUniTypeUser;
  universityShortNames?: { universityShortName: string }[];
  noteTypes?: { name: string }[];
  university?: {
    id: string;
    universityShortName: string;
    universityFullName: string;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>
    set({
      isOpen: true,
      type,
      data,
    }),

  onClose: () =>
    set({
      type: null,
      isOpen: false,
    }),
}));
