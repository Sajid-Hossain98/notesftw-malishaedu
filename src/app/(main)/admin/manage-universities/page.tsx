import { db } from "@/lib/db";
import { AdminSearchUniversities } from "./_components/admin-search-universities";

export function generateMetadata() {
  return {
    title: "ADMIN-Universities",
  };
}

const ManageUniversitiesPage = async () => {
  const universities = await db.university.findMany({
    select: {
      universityFullName: true,
      universityShortName: true,
    },
  });

  return (
    <div>
      <AdminSearchUniversities universities={universities} />
    </div>
  );
};

export default ManageUniversitiesPage;
