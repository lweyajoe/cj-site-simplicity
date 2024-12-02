import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const CategoriesManagement = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newSector, setNewSector] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: sectors = [], isLoading: sectorsLoading } = useQuery({
    queryKey: ["sectors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sectors")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const { error } = await supabase
      .from("product_types")
      .insert([{ name: newCategory.trim() }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      setNewCategory("");
      queryClient.invalidateQueries({ queryKey: ["product-types"] });
    }
  };

  const handleAddSector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSector.trim()) return;

    const { error } = await supabase
      .from("sectors")
      .insert([{ name: newSector.trim() }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add sector",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Sector added successfully",
      });
      setNewSector("");
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const { error } = await supabase
      .from("product_types")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["product-types"] });
    }
  };

  const handleDeleteSector = async (id: number) => {
    const { error } = await supabase
      .from("sectors")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete sector",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Sector deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    }
  };

  if (categoriesLoading || sectorsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Product Categories</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit">Add Category</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Sectors</h2>
          <form onSubmit={handleAddSector} className="flex gap-4 mb-6">
            <Input
              placeholder="New sector name"
              value={newSector}
              onChange={(e) => setNewSector(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit">Add Sector</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectors.map((sector) => (
                <TableRow key={sector.id}>
                  <TableCell>{sector.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteSector(sector.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesManagement;