import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag } from "lucide-react";
import ProductGrid from "@/components/shop/ProductGrid";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const { id } = useParams();

  const { data: productType, isLoading: loadingType } = useQuery({
    queryKey: ["productType", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }
      return data;
    },
  });

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ["products", productType?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          images:product_images(image_url)
        `)
        .eq("product_type_id", productType?.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!productType?.id,
  });

  const { data: productTypes } = useQuery({
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

  if (loadingType || loadingProducts) {
    return <div>Loading...</div>;
  }

  if (!productType) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p>The category you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button className="mt-4">Return to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
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
                    to={`/shop/category/${type.id}`}
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
              <h1 className="text-3xl font-bold">{productType.name}</h1>
            </div>
            <p className="text-lg opacity-90">
              Browse our collection of professional {productType.name.toLowerCase()} solutions 
              designed to help you succeed in your business endeavors.
            </p>
          </div>
          
          {/* Products Grid */}
          <ProductGrid products={products || []} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCategory;