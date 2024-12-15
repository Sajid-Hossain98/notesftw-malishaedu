// import { initialUser } from "@/lib/initialUser";
import Link from "next/link";
import { AddANote } from "./_components/add-a-note";
import { db } from "@/lib/db";

const AddNotePage = async () => {
  // const user = await initialUser();
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
    <div className="">
      <AddANote
        universityShortNameData={universityShortNameData}
        noteTypes={noteTypes}
      />
      <Link
        className="bg-red-300 text-black px-4 py-2 hover:underline text-2xl rounded-full"
        href="/"
      >
        Home
      </Link>
    </div>
  );
};

export default AddNotePage;
