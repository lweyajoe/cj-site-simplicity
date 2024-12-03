import { lazy } from "react";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import ProductDetail from "@/pages/ProductDetail";
import ProductCategory from "@/pages/ProductCategory";
import Login from "@/pages/Login";

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
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/shop/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/shop/category/:category",
    element: <ProductCategory />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];