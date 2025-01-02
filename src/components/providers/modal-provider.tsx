"use client";

import { useEffect, useState } from "react";
import { NotesViewModal } from "../modals/notes-view-modal";

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
    </>
  );
};
