import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { image_url: string }[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.image_url,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="h-full hover:shadow-lg transition-shadow duration-300">
          <Link to={`/shop/product/${product.id}`}>
            <CardContent className="p-0">
              <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    product.images?.[0]?.image_url ||
                    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151"
                  }
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </CardContent>
          </Link>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <p className="text-lg font-bold text-primary">
              ${product.price.toLocaleString()}
            </p>
            <Button
              onClick={() => handleAddToCart(product)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;