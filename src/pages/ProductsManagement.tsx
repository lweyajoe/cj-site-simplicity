import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/button";

const ProductsManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_types (
            name
          ),
          sectors (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmDelete) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products Management</h1>
          <Button onClick={() => navigate("/admin/products/new")}>
            Add New Product
          </Button>
        </div>
        
        <div className="glass-card p-6">
          <ProductTable 
            data={products}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsManagement;