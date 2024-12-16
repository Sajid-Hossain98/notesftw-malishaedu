import { AddNoteNavbar } from "./_components/add-note-navbar";

const AddNoteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AddNoteNavbar />
      <div className="md:max-h-fit overflow-auto max-h-[80dvh] pb-4">
        {children}
      </div>
    </div>
  );
};

export default AddNoteLayout;
