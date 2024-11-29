import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import { supabase } from "@/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag } from "lucide-react";

interface ProductType {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  product_type_id: number;
  sector_id: number;
  unique_id: string;
  created_at: string;
  images: { image_url: string }[];
}

const Shop = () => {
  const { data: productTypes, isLoading: loadingTypes } = useQuery({
    queryKey: ["productTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as ProductType[];
    },
  });

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          images:product_images(image_url)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  if (loadingTypes || loadingProducts) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <nav className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-primary">Categories</h2>
            <ul className="space-y-2">
              {productTypes?.map((type) => (
                <li key={type.id}>
                  <Link
                    to={`#${type.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Hero Section */}
          <div className="bg-primary text-white p-8 rounded-xl mb-8">
            <div className="flex items-center gap-4 mb-4">
              <ShoppingBag className="w-8 h-8" />
              <h1 className="text-3xl font-bold">CJ's Digital Marketplace</h1>
            </div>
            <p className="text-lg opacity-90">
              Discover our curated collection of professional tools and templates. 
              From financial models to business plans, we provide everything you need 
              to excel in your business journey.
            </p>
          </div>
          
          {/* Product Sections */}
          {productTypes?.map((type) => (
            <section 
              key={type.id} 
              id={type.name.toLowerCase().replace(/\s+/g, '-')} 
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-primary">{type.name}</h2>
              <ProductGrid
                products={
                  (products
                    ?.filter((product) => product.product_type_id === type.id)
                    .slice(-3)) || []
                }
              />
              <div className="mt-6 text-center">
                <Button 
                  variant="outline"
                  className="hover:bg-primary hover:text-white transition-colors"
                >
                  See More {type.name}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow flex">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <Skeleton className="h-8 w-32 mb-4" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-full mb-2" />
          ))}
        </div>
      </aside>
      <main className="flex-grow p-6">
        <Skeleton className="h-40 w-full mb-8 rounded-xl" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-16">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
    <Footer />
  </div>
);

export default Shop;