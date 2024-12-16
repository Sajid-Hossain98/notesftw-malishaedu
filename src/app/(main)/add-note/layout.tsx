import { AddNoteNavbar } from "./_components/add-note-navbar";

const AddNoteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AddNoteNavbar />
      <div className="overflow-auto max-h-[80dvh] pb-4">{children}</div>
    </div>
  );
};

export default AddNoteLayout;
