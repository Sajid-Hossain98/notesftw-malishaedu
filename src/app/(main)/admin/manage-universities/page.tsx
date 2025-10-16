import Link from "next/link";
import { AdminSearchUniversities } from "./_components/admin-search-universities";
import { currentUserData } from "@/lib/current-user-data";

export function generateMetadata() {
  return {
    title: "ADMIN-Universities",
  };
}

const ManageUniversitiesPage = async () => {
  const userData = await currentUserData();

  if (userData?.role !== "ADMIN" && userData?.role !== "MODERATOR") {
    return (
      <div className="mt-8 text-2xl text-center text-rose-500">
        You are not supposed to be here,{" "}
        <Link href="/" className="underline underline-offset-2">
          GO BACK
        </Link>{" "}
        please.
      </div>
    );
  }

  return (
    <div>
      <AdminSearchUniversities />
    </div>
  );
};

export default ManageUniversitiesPage;
