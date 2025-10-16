import { db } from "@/lib/db";
import { UserList } from "./_components/user-list";
import { currentUserData } from "@/lib/current-user-data";

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
        Only &quot;ADMIN&quot; has permission to be here, GO BACK please!
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
