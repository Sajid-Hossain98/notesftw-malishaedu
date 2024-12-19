import { initialUser } from "@/lib/initialUser";
import { AddANote } from "./_components/add-a-note";
import { db } from "@/lib/db";

const AddNotePage = async () => {
  await initialUser();

  const universityShortNameData = await db.university.findMany({
    select: {
      universityShortName: true,
    },
  });

  const noteTypes = await db.type.findMany({
    select: {
      name: true,
    },
  });

  return (
    <div>
      <AddANote
        universityShortNameData={universityShortNameData}
        noteTypes={noteTypes}
      />
    </div>
  );
};

export default AddNotePage;
