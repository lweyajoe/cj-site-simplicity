import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Services from "./pages/Services";
import BusinessRegistration from "./pages/BusinessRegistration";
import AccountingServices from "./pages/AccountingServices";
import AccountingSoftware from "./pages/AccountingSoftware";
import WealthManagement from "./pages/WealthManagement";
import FinancialModeling from "./pages/FinancialModeling";
import TaxServices from "./pages/TaxServices";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EditBlogPost from "./pages/EditBlogPost";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/business-registration" element={<BusinessRegistration />} />
          <Route path="/services/accounting-services" element={<AccountingServices />} />
          <Route path="/services/accounting-software" element={<AccountingSoftware />} />
          <Route path="/services/wealth-management" element={<WealthManagement />} />
          <Route path="/services/financial-modeling" element={<FinancialModeling />} />
          <Route path="/services/tax-services" element={<TaxServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:type" element={<ProductCategory />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlogPost />
              </ProtectedRoute>
            }
          />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
