import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag } from "lucide-react";

const Shop = () => {
  const { data: productTypes, isLoading: loadingTypes } = useQuery({
    queryKey: ["productTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
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
      return data;
    },
  });

  if (loadingTypes || loadingProducts) {
    return <div>Loading...</div>;
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
                    to={`/shop/category/${type.name.toLowerCase().replace(/\s+/g, '-')}`}
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
          <div className="bg-[#1e293b] text-white p-8 rounded-xl mb-8">
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
          {productTypes?.map((type) => {
            const typeProducts = products
              ?.filter((product) => product.product_type_id === type.id)
              .slice(-3);

            return (
              <section 
                key={type.id} 
                id={type.name.toLowerCase().replace(/\s+/g, '-')} 
                className="mb-16"
              >
                <h2 className="text-2xl font-semibold mb-6 text-primary">{type.name}</h2>
                <ProductGrid products={typeProducts || []} />
                <div className="mt-6 text-center">
                  <Link to={`/shop/category/${type.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button 
                      variant="outline"
                      className="hover:bg-primary hover:text-white transition-colors"
                    >
                      See More {type.name}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </section>
            );
          })}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;