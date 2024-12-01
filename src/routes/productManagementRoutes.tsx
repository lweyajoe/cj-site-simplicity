import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import ProductsManagement from "@/pages/ProductsManagement";

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
    path: "/admin/products/edit/:id",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute>
        <ProductsManagement />
      </ProtectedRoute>
    ),
  },
];