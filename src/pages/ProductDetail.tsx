import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, state } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_type:product_types(name),
          images:product_images(image_url)
        `)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    const existingItem = state.items.find((item) => item.id === product.id.toString());

    if (existingItem) {
      toast({
        title: "Already in Cart",
        description: `${product.name} is already in your cart.`,
        variant: "default",
      });
    } else {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.image_url,
      });
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
      setIsAdded(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {product?.images?.map((image: { image_url: string }, index: number) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                      <img
                        src={image.image_url}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{product?.name}</h1>
              <p className="text-muted-foreground">
                Category: {product?.product_type?.name}
              </p>
            </div>

            <div className="text-2xl font-bold text-primary">
              ${product?.price.toLocaleString()}
            </div>

            <div className="prose max-w-none">
              <p>{product?.description}</p>
            </div>

            <Button
              onClick={handleAddToCart}
              variant={isAdded ? "success" : "secondary"}
              size="lg"
              className="flex items-center gap-2"
              disabled={isAdded}
            >
              {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;