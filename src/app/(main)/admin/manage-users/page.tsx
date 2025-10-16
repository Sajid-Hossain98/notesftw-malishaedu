import { db } from "@/lib/db";
import { UserList } from "./_components/user-list";

export function generateMetadata() {
  return {
    title: "ADMIN-Users",
  };
}

const ManageUsersPage = async () => {
  const userList = await db.user.findMany();

  return (
    <div>
      <UserList userData={userList} />
    </div>
  );
};

export default ManageUsersPage;
