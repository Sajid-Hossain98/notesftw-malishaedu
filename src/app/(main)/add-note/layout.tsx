import { AddNoteNavbar } from "./_components/add-note-navbar";

const AddNoteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AddNoteNavbar />
      {children}
    </div>
  );
};

export default AddNoteLayout;
