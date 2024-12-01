import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";

export const productManagementRoutes: RouteObject[] = [
  {
    path: "/admin/products/new",
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
];