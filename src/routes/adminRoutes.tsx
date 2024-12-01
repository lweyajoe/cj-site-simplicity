import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import CommentsManagement from "@/pages/CommentsManagement";
import EditBlogPost from "@/pages/EditBlogPost";
import EditComment from "@/pages/EditComment";
import EditReply from "@/pages/EditReply";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/comments",
    element: (
      <ProtectedRoute>
        <CommentsManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit/:id",
    element: (
      <ProtectedRoute>
        <EditBlogPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit-comment/:id",
    element: (
      <ProtectedRoute>
        <EditComment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit-reply/:id",
    element: (
      <ProtectedRoute>
        <EditReply />
      </ProtectedRoute>
    ),
  },
];