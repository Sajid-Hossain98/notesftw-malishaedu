import { db } from "@/lib/db";
import { UserList } from "./_components/user-list";
import { currentUserData } from "@/lib/current-user-data";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "ADMIN-Users",
  };
}

const ManageUsersPage = async () => {
  const userList = await db.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const userData = await currentUserData();

  if (userData?.role !== "ADMIN") {
    return (
      <div className="mt-8 text-2xl text-center text-rose-500">
        Only &quot;ADMIN&quot; has permission to be here,{" "}
        <Link href="/" className="underline underline-offset-2">
          GO BACK
        </Link>{" "}
        please!
      </div>
    );
  }

  return (
    <div>
      <UserList userData={userList} />
    </div>
  );
};

export default ManageUsersPage;
