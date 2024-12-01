import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/supabaseClient";

interface ProductFormProps {
  type: string;
  mode: 'create' | 'edit';
}

const ProductForm = ({ type, mode }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sector, setSector] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch sectors
  const { data: sectors } = useQuery({
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

  // Fetch product type ID
  const { data: productType } = useQuery({
    queryKey: ["productType", type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("id")
        .eq("name", type.replace(/_/g, ' '))
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert([
          {
            name,
            description,
            price: parseFloat(price),
            product_type_id: productType?.id,
            sector_id: parseInt(sector),
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      // Insert product images
      const validImageUrls = imageUrls.filter(url => url.trim() !== "");
      if (validImageUrls.length > 0) {
        const { error: imagesError } = await supabase
          .from("product_images")
          .insert(
            validImageUrls.map(url => ({
              product_id: product.id,
              image_url: url,
            }))
          );

        if (imagesError) throw imagesError;
      }

      toast({
        title: "Success",
        description: `${type.replace(/_/g, ' ')} product ${mode === 'create' ? 'added' : 'updated'} successfully`,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode} product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price (USD)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sector">Sector</Label>
        <Select value={sector} onValueChange={setSector} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors?.map((sector) => (
              <SelectItem key={sector.id} value={sector.id.toString()}>
                {sector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Product Images (URLs)</Label>
        {imageUrls.map((url, index) => (
          <Input
            key={index}
            placeholder={`Image URL ${index + 1}`}
            value={url}
            onChange={(e) => handleImageUrlChange(index, e.target.value)}
          />
        ))}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? `${mode === 'create' ? 'Adding' : 'Updating'}...` : mode === 'create' ? 'Add Product' : 'Update Product'}
      </Button>
    </form>
  );
};

export default ProductForm;