import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  mode: 'create' | 'edit';
}

const ProductForm = ({ mode }: ProductFormProps) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sector, setSector] = useState("");
  const [productType, setProductType] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch product data if in edit mode
  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (mode === 'edit' && id) {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            images:product_images(image_url)
          `)
          .eq("id", id)
          .single();
        if (error) throw error;
        return data;
      }
      return null;
    },
    enabled: mode === 'edit' && !!id,
  });

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

  // Fetch product types
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

  // Set form data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price.toString());
      setSector(productData.sector_id.toString());
      setProductType(productData.product_type_id.toString());
      
      // Set image URLs
      const urls = productData.images?.map((img: { image_url: string }) => img.image_url) || [];
      setImageUrls([...urls, ...Array(4 - urls.length).fill("")]);
    }
  }, [mode, productData]);

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'edit' && id) {
        // Update product
        const { error: productError } = await supabase
          .from("products")
          .update({
            name,
            description,
            price: parseFloat(price),
            product_type_id: parseInt(productType),
            sector_id: parseInt(sector),
          })
          .eq("id", id);

        if (productError) throw productError;

        // Delete existing images
        const { error: deleteError } = await supabase
          .from("product_images")
          .delete()
          .eq("product_id", id);

        if (deleteError) throw deleteError;

        // Insert new images
        const validImageUrls = imageUrls.filter(url => url.trim() !== "");
        if (validImageUrls.length > 0) {
          const { error: imagesError } = await supabase
            .from("product_images")
            .insert(
              validImageUrls.map(url => ({
                product_id: id,
                image_url: url,
              }))
            );

          if (imagesError) throw imagesError;
        }
      } else {
        // Insert new product
        const { data: product, error: productError } = await supabase
          .from("products")
          .insert([
            {
              name,
              description,
              price: parseFloat(price),
              product_type_id: parseInt(productType),
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
      }

      toast({
        title: "Success",
        description: `Product ${mode === 'create' ? 'added' : 'updated'} successfully`,
      });
      navigate("/admin/products");
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
        <Label htmlFor="productType">Product Type</Label>
        <Select value={productType} onValueChange={setProductType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a product type" />
          </SelectTrigger>
          <SelectContent>
            {productTypes?.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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