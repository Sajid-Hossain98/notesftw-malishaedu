import { AddNotice } from "./_components/add-notice";

export function generateMetadata() {
  return {
    title: "ADMIN-Notices",
  };
}

const ManageNoticesPage = async () => {
  return <AddNotice />;
};

export default ManageNoticesPage;
