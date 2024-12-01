import { Link } from "react-router-dom";
import {
  ChevronDown,
  FileText,
  MessageSquare,
  Plus,
  Edit,
  ShoppingBag,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminSidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isEditProductsOpen, setIsEditProductsOpen] = useState(false);

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
          <Collapsible open={isProductsOpen} onOpenChange={setIsProductsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Products
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2">
              <Link to="/admin/products/new/business-plan">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Business Plan
                </Button>
              </Link>
              <Link to="/admin/products/new/dashboard">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/products/new/excel-template">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Excel Template
                </Button>
              </Link>
              <Link to="/admin/products/new/financial-model">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Financial Model
                </Button>
              </Link>
              <Link to="/admin/products/new/pitchdeck">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Pitchdeck
                </Button>
              </Link>
              <Link to="/admin/products/new/software">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Software
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isEditProductsOpen} onOpenChange={setIsEditProductsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Products
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2">
              <Link to="/admin/products/edit/business-plan">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Business Plan
                </Button>
              </Link>
              <Link to="/admin/products/edit/dashboard">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/products/edit/excel-template">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Excel Template
                </Button>
              </Link>
              <Link to="/admin/products/edit/financial-model">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Financial Model
                </Button>
              </Link>
              <Link to="/admin/products/edit/pitchdeck">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Pitchdeck
                </Button>
              </Link>
              <Link to="/admin/products/edit/software">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Software
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;