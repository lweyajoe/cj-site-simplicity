import AdminSidebar from "./AdminSidebar";
import Navbar from "../layout/Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;