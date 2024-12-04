import { lazy } from "react";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import ProductDetail from "@/pages/ProductDetail";
import ProductCategory from "@/pages/ProductCategory";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ShopNotFound from "@/pages/ShopNotFound";
import AccountingServices from "@/pages/AccountingServices";
import AccountingSoftware from "@/pages/AccountingSoftware";
import BusinessRegistration from "@/pages/BusinessRegistration";
import WealthManagement from "@/pages/WealthManagement";
import FinancialModeling from "@/pages/FinancialModeling";
import TaxServices from "@/pages/TaxServices";

export const publicRoutes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/services/accounting-services",
    element: <AccountingServices />,
  },
  {
    path: "/services/accounting-software",
    element: <AccountingSoftware />,
  },
  {
    path: "/services/business-registration",
    element: <BusinessRegistration />,
  },
  {
    path: "/services/wealth-management",
    element: <WealthManagement />,
  },
  {
    path: "/services/financial-modeling",
    element: <FinancialModeling />,
  },
  {
    path: "/services/tax-services",
    element: <TaxServices />,
  },
  {
    path: "/shop",
    element: <ShopNotFound />,
  },
  {
    path: "/cart",
    element: <ShopNotFound />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/shop/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/shop/category/:id",
    element: <ProductCategory />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
