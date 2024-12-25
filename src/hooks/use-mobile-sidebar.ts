import { create } from "zustand";

type MobileSidebarStore = {
  isMobileSidebarOpen: boolean;
  onMobileSidebarOpen: () => void;
  onMobileSidebarClose: () => void;
};

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isMobileSidebarOpen: false,
  onMobileSidebarOpen: () =>
    set({
      isMobileSidebarOpen: true,
    }),

  onMobileSidebarClose: () =>
    set({
      isMobileSidebarOpen: false,
    }),
}));
