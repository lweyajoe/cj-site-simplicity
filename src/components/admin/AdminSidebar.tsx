import { Link } from "react-router-dom";
import { FileText, MessageSquare, Plus, Package, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-16 p-4">
      <nav className="space-y-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-primary">Admin Dashboard</h2>
          <div className="space-y-2">
            <Link to="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Blog Posts
              </Button>
            </Link>
            <Link to="/admin/comments">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <Link to="/admin/products/new">
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Products Management
            </Button>
          </Link>
          <Link to="/admin/categories">
            <Button variant="ghost" className="w-full justify-start">
              <Grid className="mr-2 h-4 w-4" />
              Categories & Sectors
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;