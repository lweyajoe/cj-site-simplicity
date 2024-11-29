import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/shop/product/${product.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
            <CardFooter className="p-4 pt-0">
              <p className="text-lg font-bold text-primary">
                ${product.price.toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;