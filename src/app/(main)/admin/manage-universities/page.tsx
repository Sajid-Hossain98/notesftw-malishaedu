import { AdminSearchUniversities } from "./_components/admin-search-universities";

export function generateMetadata() {
  return {
    title: "ADMIN-Universities",
  };
}

const ManageUniversitiesPage = async () => {
  return (
    <div>
      <AdminSearchUniversities />
    </div>
  );
};

export default ManageUniversitiesPage;
