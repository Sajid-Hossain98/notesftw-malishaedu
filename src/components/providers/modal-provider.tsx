"use client";

import { useEffect, useState } from "react";
import { NotesViewModal } from "../modals/notes-view-modal";
import { NoteEditModal } from "../modals/note-edit-modal";
import { NoteDeleteModal } from "../modals/note-delete-modal";
import { UniversityEditModal } from "../modals/university-edit-modal";
import { UniversityDeleteModal } from "../modals/university-delete-modal";
import { AddRuleModal } from "../modals/rule-add-modal";
import { RuleDeleteModal } from "../modals/rule-delete-modal";
import { NoticeEditModal } from "../modals/notice-edit-modal";
import { NoticeDeleteModal } from "../modals/notice-delete-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NotesViewModal />
      <NoteEditModal />
      <NoteDeleteModal />
      <UniversityEditModal />
      <UniversityDeleteModal />
      <AddRuleModal />
      <RuleDeleteModal />
      <NoticeEditModal />
      <NoticeDeleteModal />
    </>
  );
};
