import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import { supabase } from "@/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

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
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Shop</h1>
          
          {productTypes?.map((type) => (
            <section key={type.id} className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">{type.name}</h2>
              <ProductGrid
                products={products?.filter(
                  (product) => product.product_type_id === type.id
                ) || []}
              />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow py-12">
      <div className="container mx-auto px-4">
        <Skeleton className="h-12 w-48 mb-8" />
        <div className="space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-8 w-36 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Shop;