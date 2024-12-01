import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddNewProductBusinessPlan from "@/pages/AddNewProductBusinessPlan";
import AddNewProductDashboard from "@/pages/AddNewProductDashboard";
import AddNewProductExcelTemplate from "@/pages/AddNewProductExcelTemplate";
import AddNewProductFinancialModel from "@/pages/AddNewProductFinancialModel";
import AddNewProductPitchdeck from "@/pages/AddNewProductPitchdeck";
import AddNewProductSoftware from "@/pages/AddNewProductSoftware";
import EditExistingProductBusinessPlan from "@/pages/EditExistingProductBusinessPlan";
import EditExistingProductDashboard from "@/pages/EditExistingProductDashboard";
import EditExistingProductExcelTemplate from "@/pages/EditExistingProductExcelTemplate";
import EditExistingProductFinancialModel from "@/pages/EditExistingProductFinancialModel";
import EditExistingProductPitchdeck from "@/pages/EditExistingProductPitchdeck";
import EditExistingProductSoftware from "@/pages/EditExistingProductSoftware";

export const productManagementRoutes: RouteObject[] = [
  {
    path: "/admin/products/new/business-plan",
    element: (
      <ProtectedRoute>
        <AddNewProductBusinessPlan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/new/dashboard",
    element: (
      <ProtectedRoute>
        <AddNewProductDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/new/excel-template",
    element: (
      <ProtectedRoute>
        <AddNewProductExcelTemplate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/new/financial-model",
    element: (
      <ProtectedRoute>
        <AddNewProductFinancialModel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/new/pitchdeck",
    element: (
      <ProtectedRoute>
        <AddNewProductPitchdeck />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/new/software",
    element: (
      <ProtectedRoute>
        <AddNewProductSoftware />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/business-plan",
    element: (
      <ProtectedRoute>
        <EditExistingProductBusinessPlan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/dashboard",
    element: (
      <ProtectedRoute>
        <EditExistingProductDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/excel-template",
    element: (
      <ProtectedRoute>
        <EditExistingProductExcelTemplate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/financial-model",
    element: (
      <ProtectedRoute>
        <EditExistingProductFinancialModel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/pitchdeck",
    element: (
      <ProtectedRoute>
        <EditExistingProductPitchdeck />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/edit/software",
    element: (
      <ProtectedRoute>
        <EditExistingProductSoftware />
      </ProtectedRoute>
    ),
  },
];