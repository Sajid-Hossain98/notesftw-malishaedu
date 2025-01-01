"use client";

import { useEffect, useState } from "react";
// import { NotesModal } from "../modals/notes-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{/* <NotesModal /> */}</>;
};
