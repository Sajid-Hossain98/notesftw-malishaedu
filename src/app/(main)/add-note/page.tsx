// import { initialUser } from "@/lib/initialUser";
import Link from "next/link";

const AddNotePage = async () => {
  // const user = await initialUser();

  return (
    <div className="flex items-center justify-center flex-col h-full text-5xl gap-4">
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
