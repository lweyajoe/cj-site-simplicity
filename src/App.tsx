import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WhatsAppWidget from "./components/WhatsAppWidget";
import NotFound from "./pages/NotFound";
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
import CommentsManagement from "./pages/CommentsManagement";
import EditComment from "./pages/EditComment";
import EditReply from "./pages/EditReply";
import AddNewProductBusinessPlan from "./pages/AddNewProductBusinessPlan";
import AddNewProductDashboard from "./pages/AddNewProductDashboard";
import AddNewProductExcelTemplate from "./pages/AddNewProductExcelTemplate";
import AddNewProductFinancialModel from "./pages/AddNewProductFinancialModel";
import AddNewProductPitchdeck from "./pages/AddNewProductPitchdeck";
import AddNewProductSoftware from "./pages/AddNewProductSoftware";
import EditExistingProductBusinessPlan from "./pages/EditExistingProductBusinessPlan";
import EditExistingProductDashboard from "./pages/EditExistingProductDashboard";
import EditExistingProductExcelTemplate from "./pages/EditExistingProductExcelTemplate";
import EditExistingProductFinancialModel from "./pages/EditExistingProductFinancialModel";
import EditExistingProductPitchdeck from "./pages/EditExistingProductPitchdeck";
import EditExistingProductSoftware from "./pages/EditExistingProductSoftware";

const queryClient = new QueryClient();
const helmetContext = {};

const App = () => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Helmet>
            <title>CPAJoe Financial Advisory</title>
            <meta name="description" content="Expert financial advisory services in Kenya" />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="CPAJoe - Financial Advisory" />
            <meta name="twitter:site" content="@CPAJoeKenya" />
          </Helmet>
          <Toaster />
          <Sonner />
          <WhatsAppWidget />
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
              
              {/* Protected Admin Routes */}
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
                path="/admin/comments"
                element={
                  <ProtectedRoute>
                    <CommentsManagement />
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
              <Route
                path="/admin/edit-comment/:id"
                element={
                  <ProtectedRoute>
                    <EditComment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-reply/:id"
                element={
                  <ProtectedRoute>
                    <EditReply />
                  </ProtectedRoute>
                }
              />

              {/* Product Management Routes */}
              <Route
                path="/admin/products/new/business-plan"
                element={
                  <ProtectedRoute>
                    <AddNewProductBusinessPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new/dashboard"
                element={
                  <ProtectedRoute>
                    <AddNewProductDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new/excel-template"
                element={
                  <ProtectedRoute>
                    <AddNewProductExcelTemplate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new/financial-model"
                element={
                  <ProtectedRoute>
                    <AddNewProductFinancialModel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new/pitchdeck"
                element={
                  <ProtectedRoute>
                    <AddNewProductPitchdeck />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new/software"
                element={
                  <ProtectedRoute>
                    <AddNewProductSoftware />
                  </ProtectedRoute>
                }
              />

              {/* Edit Product Routes */}
              <Route
                path="/admin/products/edit/business-plan"
                element={
                  <ProtectedRoute>
                    <EditExistingProductBusinessPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/dashboard"
                element={
                  <ProtectedRoute>
                    <EditExistingProductDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/excel-template"
                element={
                  <ProtectedRoute>
                    <EditExistingProductExcelTemplate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/financial-model"
                element={
                  <ProtectedRoute>
                    <EditExistingProductFinancialModel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/pitchdeck"
                element={
                  <ProtectedRoute>
                    <EditExistingProductPitchdeck />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/software"
                element={
                  <ProtectedRoute>
                    <EditExistingProductSoftware />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;