import { OnlyAdmin } from "@/components/only-admin";
// import { initialUser } from "@/lib/initialUser";
import Link from "next/link";
import { AddUniversity } from "./_components/add-university";

const AddNotePage = async () => {
  // const user = await initialUser();

  return (
    <div className="flex items-center justify-center flex-col h-full text-5xl gap-4">
      This is the page where a note will be born!
      <Link
        className="bg-red-300 text-black px-4 py-2 hover:underline text-2xl rounded-full"
        href="/"
      >
        Home
      </Link>
      <AddUniversity />
      <OnlyAdmin>OoO Hello there!</OnlyAdmin>
    </div>
  );
};

export default AddNotePage;
