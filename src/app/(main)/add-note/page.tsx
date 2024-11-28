import { initialUser } from "@/lib/initialUser";
import Link from "next/link";

const AddNotePage = async () => {
  await initialUser();

  return (
    <div>
      This is the page where a note will be born!
      <Link href="/">Home</Link>
    </div>
  );
};

export default AddNotePage;
