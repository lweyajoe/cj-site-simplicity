import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Services from "@/pages/Services";
import BusinessRegistration from "@/pages/BusinessRegistration";
import AccountingServices from "@/pages/AccountingServices";
import AccountingSoftware from "@/pages/AccountingSoftware";
import WealthManagement from "@/pages/WealthManagement";
import FinancialModeling from "@/pages/FinancialModeling";
import TaxServices from "@/pages/TaxServices";
import Contact from "@/pages/Contact";
import Shop from "@/pages/Shop";
import ProductCategory from "@/pages/ProductCategory";
import ProductDetail from "@/pages/ProductDetail";
import Login from "@/pages/Login";

export const publicRoutes: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <BlogPost /> },
  { path: "/services", element: <Services /> },
  { path: "/services/business-registration", element: <BusinessRegistration /> },
  { path: "/services/accounting-services", element: <AccountingServices /> },
  { path: "/services/accounting-software", element: <AccountingSoftware /> },
  { path: "/services/wealth-management", element: <WealthManagement /> },
  { path: "/services/financial-modeling", element: <FinancialModeling /> },
  { path: "/services/tax-services", element: <TaxServices /> },
  { path: "/contact", element: <Contact /> },
  { path: "/shop", element: <Shop /> },
  { path: "/shop/category/:type", element: <ProductCategory /> },
  { path: "/shop/product/:id", element: <ProductDetail /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
];