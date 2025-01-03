import { AdminNavbar } from "./_components/admin-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
